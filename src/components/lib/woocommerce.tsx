"use client";
import { useMutation, useQuery } from "react-query";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "@constants";

function getAuthToken(): string {
	return Cookies.get(AUTH_TOKEN_KEY) ?? "";
}

function authHeaders(): HeadersInit {
	const token = getAuthToken();
	return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ─────────────────────────────────────────────
   Persistent client-side cache (localStorage)
   with a configurable TTL (default: 1 hour)
───────────────────────────────────────────── */
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in ms
const CACHE_PREFIX = "__api_cache_";

export function cacheGet<T>(key: string): T | null {
	try {
		const raw = localStorage.getItem(CACHE_PREFIX + key);
		if (!raw) return null;
		const { data, expires } = JSON.parse(raw) as { data: T; expires: number };
		if (Date.now() > expires) {
			localStorage.removeItem(CACHE_PREFIX + key);
			return null;
		}
		return data;
	} catch {
		return null;
	}
}

export function cacheSet(key: string, data: unknown, ttl = CACHE_TTL) {
	try {
		localStorage.setItem(
			CACHE_PREFIX + key,
			JSON.stringify({ data, expires: Date.now() + ttl }),
		);
	} catch {
		// Ignore (storage quota exceeded, SSR, etc.)
	}
}

/* ─────────────────────────────────────────────
   Internal API client — calls /api/* directly
───────────────────────────────────────────── */
async function apiFetch(
	path: string,
	options: RequestInit = {},
): Promise<any> {
	const res = await fetch(path, { cache: "no-store", ...options });
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		throw Object.assign(new Error(body.message || "API error"), {
			response: { status: res.status, data: body },
		});
	}
	return res.json();
}

// Thin shim kept for components that call WooCommerce.get(...) directly.
// Paths should be internal API paths like "products?category=5".
export const WooCommerce = {
	async get(
		path: string,
		_params?: Record<string, any>,
		withAuth = false,
	): Promise<{ data: any; headers: Record<string, string> }> {
		const url = `/api/${path}`;
		const res = await fetch(url, {
			cache: "no-store",
			headers: withAuth ? authHeaders() : {},
		});
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			throw Object.assign(new Error(body.message || "API error"), {
				response: { status: res.status, data: body },
			});
		}
		const data = await res.json();
		const headers: Record<string, string> = {};
		res.headers.forEach((value, key) => { headers[key] = value; });
		return { data, headers };
	},
};

/* ─────────────────────────────────────────────
   React-Query hooks — all hitting /api/* directly
───────────────────────────────────────────── */

export const useCustomer = (_customerId?: string) => {
	return useQuery(
		["customer"],
		async () => {
			const data = await apiFetch("/api/customer/userinfo", {
				headers: authHeaders(),
			});
			return data ? [data] : [];
		},
		{ staleTime: Infinity, retry: false },
	);
};

export const useProduct = (productId: string | undefined) => {
	return useQuery(
		["product", productId],
		async () => apiFetch(`/api/products/${productId}`),
		{ enabled: !!productId, staleTime: Infinity },
	);
};

export const useCustomerOrders = (_customerId?: number | string) => {
	return useQuery(
		["customer-orders"],
		async () => {
			const token = getAuthToken();
			if (!token) return [];
			const data = await apiFetch("/api/order?per_page=100", {
				headers: authHeaders(),
			});
			if (Array.isArray(data?.orders)) return data.orders;
			if (Array.isArray(data)) return data;
			return [];
		},
		{ staleTime: 5 * 60 * 1000, retry: 1 },
	);
};

export const useOrders = (
	id?: string,
	page: number = 1,
	perPage: number = 10,
) => {
	return useQuery(
		["order", id, page, perPage],
		async () => {
			const url = id
				? `/api/order/${id}`
				: `/api/order?page=${page}&per_page=${perPage}`;
			const data = await apiFetch(url, { headers: authHeaders() });

			let orders: any[];
			if (id) {
				orders = data;
			} else {
				orders = Array.isArray(data?.orders) ? data.orders : [];
			}

			return {
				data: orders,
				totalItems: data?.totalDoc ?? 0,
				totalPages: data?.pages ?? 1,
			};
		},
		{ keepPreviousData: true, refetchOnWindowFocus: true, staleTime: Infinity },
	);
};

export const useMediaUpload = () => {
	return useMutation(async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		const res = await fetch("/api/media/upload", {
			method: "POST",
			body: formData,
		});
		if (!res.ok) throw new Error("Media upload failed");
		return res.json();
	});
};

export const useUpdateOrder = () => {
	return useMutation(async ({ orderId, data }: { orderId: number; data: any }) => {
		return apiFetch(`/api/order/${orderId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", ...authHeaders() },
			body: JSON.stringify(data),
		});
	});
};

export const useProductSearch = (query: string | undefined) => {
	return useQuery(
		["product-search", query],
		async () => apiFetch(`/api/products?search=${query}`),
		{ enabled: !!query, staleTime: Infinity },
	);
};

export const useGeneralSettings = () => {
	return useQuery("general-settings", async () =>
		apiFetch("/api/setting/global/all"),
	);
};

export const useCategories = (categoryId: string | undefined) => {
	const cacheKey = `categories_${categoryId ?? "all"}`;
	return useQuery(
		["categories", categoryId],
		async () => {
			const cached = cacheGet<CategoryType[]>(cacheKey);
			if (cached) return cached;
			const path = categoryId
				? `/api/category/${categoryId}`
				: "/api/category";
			const data = await apiFetch(path);
			const result = Array.isArray(data) ? data : [data];
			cacheSet(cacheKey, result);
			return result;
		},
		{ staleTime: Infinity },
	);
};

export const useCreateOrder = () => {
	return useMutation(async (orderData: any) =>
		apiFetch("/api/order/add", {
			method: "POST",
			headers: { "Content-Type": "application/json", ...authHeaders() },
			body: JSON.stringify(orderData),
		}),
	);
};

export const useProductsByCategory = (categoryId: string) => {
	const cacheKey = `products_cat_${categoryId}`;
	return useQuery(["category-products", categoryId], async () => {
		const cached = cacheGet<ProductType[]>(cacheKey);
		if (cached) return cached;
		const data = await apiFetch(`/api/products?category=${categoryId}`);
		cacheSet(cacheKey, data);
		return data;
	});
};

export const useUpdateCustomer = () => {
	return useMutation(async (updatedCustomerData: any) => {
		const { id, ...rest } = updatedCustomerData;
		return apiFetch("/api/customer", {
			method: "PUT",
			headers: { "Content-Type": "application/json", ...authHeaders() },
			body: JSON.stringify({ id, ...rest }),
		});
	});
};
