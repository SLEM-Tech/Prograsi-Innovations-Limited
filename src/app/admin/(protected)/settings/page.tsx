"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ConfirmModal from "../../_components/ConfirmModal";

const SETTING_FIELDS = [
  { key: "shop_name", label: "Shop Name", type: "text" },
  { key: "company_name", label: "Company Name", type: "text" },
  { key: "email", label: "Contact Email", type: "email" },
  { key: "contact", label: "Contact Phone", type: "text" },
  { key: "website", label: "Website URL", type: "url" },
  { key: "address", label: "Address", type: "text" },
  { key: "default_currency", label: "Default Currency", type: "text" },
  { key: "timezone", label: "Timezone", type: "text" },
  { key: "date_format", label: "Date Format", type: "text" },
  { key: "vat_number", label: "VAT Number", type: "text" },
  { key: "post_code", label: "Post Code", type: "text" },
  { key: "percentage", label: "Pay Later Percentage (%)", type: "number" },
  { key: "number_of_image_per_product", label: "Max Images Per Product", type: "number" },
  { key: "receipt_size", label: "Receipt Size", type: "text", hint: "e.g. A4, Letter" },
];

type DangerAction = "products" | "categories" | "all" | "seed" | null;

export default function SettingsPage() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [confirm, setConfirm] = useState<DangerAction>(null);
  const [dangerMsg, setDangerMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => fetch("/api/admin/settings").then((r) => r.json()),
  });

  useEffect(() => {
    if (data?.settings) {
      setForm(data.settings);
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (body: Record<string, string>) =>
      fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json()),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
  });

  const truncateMutation = useMutation({
    mutationFn: (target: "products" | "categories" | "all") =>
      fetch(`/api/admin/truncate?target=${target}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: (data) => {
      setDangerMsg({ ok: true, text: data.message ?? "Done." });
      setTimeout(() => setDangerMsg(null), 3000);
    },
    onError: () => {
      setDangerMsg({ ok: false, text: "Operation failed. Please try again." });
      setTimeout(() => setDangerMsg(null), 3000);
    },
  });

  const seedMutation = useMutation({
    mutationFn: () =>
      fetch("/api/db/seed?secret=seed-db-2024").then((r) => r.json()),
    onSuccess: (data) => {
      setDangerMsg({ ok: true, text: data.message ?? "Seeded successfully." });
      setTimeout(() => setDangerMsg(null), 3000);
    },
    onError: () => {
      setDangerMsg({ ok: false, text: "Seed failed. Please try again." });
      setTimeout(() => setDangerMsg(null), 3000);
    },
  });

  const dangerLoading = truncateMutation.isPending || seedMutation.isPending;

  function handleConfirm() {
    if (!confirm) return;
    if (confirm === "seed") {
      seedMutation.mutate();
    } else {
      truncateMutation.mutate(confirm);
    }
    setConfirm(null);
  }

  const DANGER_ACTIONS: { label: string; action: DangerAction; desc: string }[] = [
    { label: "Delete All Products", action: "products", desc: "Permanently deletes all products, images, attributes, and order items." },
    { label: "Delete All Categories", action: "categories", desc: "Permanently deletes all categories." },
    { label: "Delete Everything", action: "all", desc: "Truncates products and categories entirely." },
    { label: "Run Seed File", action: "seed", desc: "Inserts sample categories and products from the seed file." },
  ];

  const confirmMeta = DANGER_ACTIONS.find((a) => a.action === confirm);

  if (isLoading) {
    return <div className="text-gray-400 text-sm py-10 text-center">Loading settings...</div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <h3 className="font-semibold text-gray-800">Global Settings</h3>

        {SETTING_FIELDS.map(({ key, label, type, hint }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              value={form[key] ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004B93]/30"
              placeholder={hint}
            />
          </div>
        ))}

        {saved && <p className="text-sm text-green-600">Settings saved successfully!</p>}
        {saveMutation.isError && <p className="text-sm text-red-500">Failed to save. Please try again.</p>}

        <button
          onClick={() => saveMutation.mutate(form)}
          disabled={saveMutation.isPending}
          className="w-full py-2.5 bg-[#3DBD7F] hover:bg-[#2ea86f] text-white font-semibold rounded-lg text-sm disabled:opacity-60"
        >
          {saveMutation.isPending ? "Saving..." : "Save Settings"}
        </button>
      </div>
      <div className="bg-white rounded-xl border border-red-200 p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-red-600">Danger Zone</h3>
          <p className="text-xs text-gray-500 mt-0.5">These actions are irreversible. Proceed with caution.</p>
        </div>

        {dangerMsg && (
          <p className={`text-sm font-medium ${dangerMsg.ok ? "text-green-600" : "text-red-500"}`}>
            {dangerMsg.text}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DANGER_ACTIONS.map(({ label, action, desc }) => (
            <button
              key={action}
              onClick={() => setConfirm(action)}
              disabled={dangerLoading}
              className={`text-left p-3 rounded-lg border text-sm disabled:opacity-50 transition-colors ${
                action === "seed"
                  ? "border-green-200 bg-green-50 hover:bg-green-100 text-green-700"
                  : "border-red-100 bg-red-50 hover:bg-red-100 text-red-700"
              }`}
            >
              <span className="font-semibold block">{label}</span>
              <span className="text-xs opacity-75">{desc}</span>
            </button>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!confirm}
        title={confirm === "seed" ? "Run Seed File?" : "Are you sure?"}
        message={confirmMeta?.desc ?? ""}
        confirmLabel={confirm === "seed" ? "Run Seed" : "Yes, Delete"}
        loading={dangerLoading}
        onConfirm={handleConfirm}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
