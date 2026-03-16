"use client";

import { AxiosError, AxiosStatic } from "axios";

export default function setupAxios(axios: AxiosStatic, store: any) {
	axios.defaults.headers.common["Accept"] = "application/json";
	axios.interceptors.request.use(
		(config: any) => {
			const { auth } = store.getState();
			if (auth?.token && config.headers && config.url?.startsWith("/api/")) {
				config.headers.Authorization = `Bearer ${auth.token}`;
			}
			return config;
		},
		(err: any) => { throw err; },
	);

	axios.interceptors.response.use(
		(response) => response,
		async (error: AxiosError) => {
			throw error;
		},
	);
}
