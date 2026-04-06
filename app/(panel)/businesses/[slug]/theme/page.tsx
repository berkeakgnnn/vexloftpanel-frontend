"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { HexColorPicker } from "react-colorful";
import { useTheme, useUpdateTheme, type BusinessTheme } from "@/lib/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const COLOR_FIELDS: { key: keyof BusinessTheme; label: string }[] = [
  { key: "primaryColor", label: "Ana Renk" },
  { key: "accentColor", label: "Vurgu Rengi" },
  { key: "bgColor", label: "Arkaplan" },
  { key: "cardBgColor", label: "Kart Arkaplan" },
  { key: "textColor", label: "Yazi Rengi" },
  { key: "mutedTextColor", label: "Soluk Yazi" },
  { key: "borderColor", label: "Kenar Rengi" },
];

const LAYOUT_OPTIONS = [
  { value: "FULLCARD", label: "Full Card", desc: "Buyuk fotografli kartlar" },
  { value: "LIST", label: "Liste", desc: "Metin tabanli fiyat listesi" },
  { value: "GRID", label: "Grid", desc: "2 sutunlu kucuk kartlar" },
  { value: "HYBRID", label: "Karma", desc: "Ickilerde liste, yemeklerde grid" },
] as const;

const FONT_OPTIONS = [
  "Inter",
  "DM Sans",
  "Playfair Display",
  "Cormorant Garamond",
  "Georgia",
  "Poppins",
  "Roboto",
  "Lato",
  "Open Sans",
  "Montserrat",
  "Raleway",
  "Merriweather",
  "Lora",
  "Nunito",
  "Source Sans 3",
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// ─── File upload helper ────────────────────────────────────────────────────────

async function uploadFile(file: File, businessSlug: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const res = await fetch(`${API_URL}/upload?businessSlug=${businessSlug}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) throw new Error("Upload basarisiz");
  const data = await res.json();
  return data.path as string;
}

// ─── ColorField component ──────────────────────────────────────────────────────

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-3 h-10 px-3 w-full rounded-lg border border-input bg-background text-sm hover:bg-muted transition-colors"
        >
          <span
            className="inline-block h-6 w-6 rounded border border-border shrink-0"
            style={{ backgroundColor: value || "#ffffff" }}
          />
          <span className="font-mono text-sm">{value || "#ffffff"}</span>
        </button>
        {open && (
          <div className="absolute z-50 mt-1 p-3 bg-popover rounded-lg ring-1 ring-foreground/10 shadow-md">
            <HexColorPicker color={value || "#ffffff"} onChange={onChange} />
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-2 h-9 font-mono text-sm"
              placeholder="#ffffff"
            />
            <Button
              size="default"
              variant="outline"
              className="w-full mt-2"
              onClick={() => setOpen(false)}
            >
              Kapat
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FontSelect component ──────────────────────────────────────────────────────

function FontSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        style={{ fontFamily: value || "inherit" }}
      >
        <option value="">Secin...</option>
        {FONT_OPTIONS.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── MediaUpload component ─────────────────────────────────────────────────────

function MediaUpload({
  label,
  value,
  slug,
  onChange,
}: {
  label: string;
  value: string | null;
  slug: string;
  onChange: (path: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const path = await uploadFile(file, slug);
      onChange(path);
      toast.success("Dosya yuklendi");
    } catch {
      toast.error("Yukleme basarisiz");
    } finally {
      setUploading(false);
      // Reset so same file can be selected again
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>

      {/* Preview */}
      {value && (
        <div className="relative w-full h-28 rounded-lg overflow-hidden border border-border bg-muted">
          <img
            src={`${API_URL}${value}`}
            alt={label}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full h-10"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="h-4 w-4 mr-2" />
        {uploading ? "Yukleniyor..." : value ? "Degistir" : "Yukle"}
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

// ─── Preview components ────────────────────────────────────────────────────────

const SAMPLE_ITEMS = [
  { name: "Espresso", price: 90, desc: "Yogun italyan kahvesi" },
  { name: "Cappuccino", price: 120, desc: "Kremali kopuklu kahve" },
  { name: "Latte", price: 130, desc: "Sutlu yumusak kahve" },
  { name: "Americano", price: 100, desc: "Klasik filtre tadi" },
];

function PreviewHeader({ form }: { form: Partial<BusinessTheme> }) {
  return (
    <div
      className="h-[100px] flex flex-col items-center justify-center text-center shrink-0"
      style={{ backgroundColor: (form.primaryColor as string) || "#3e2723" }}
    >
      <span
        className="text-[9px] tracking-[3px] opacity-70"
        style={{ color: (form.bgColor as string) || "#faf6f0" }}
      >
        MENU
      </span>
      <span
        className="text-[20px] mt-1"
        style={{
          color: (form.bgColor as string) || "#faf6f0",
          fontFamily: (form.fontHeading as string) || "serif",
          fontStyle: "italic",
        }}
      >
        Isletme Adi
      </span>
    </div>
  );
}

function PreviewFullcard({ form }: { form: Partial<BusinessTheme> }) {
  return (
    <>
      <PreviewHeader form={form} />
      <div className="px-3 pt-3 space-y-2">
        <span
          className="text-[9px] tracking-[2px] font-semibold uppercase block"
          style={{ color: (form.accentColor as string) || "#8d6346" }}
        >
          Kategori
        </span>
        {SAMPLE_ITEMS.slice(0, 3).map((item, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-sm"
            style={{
              backgroundColor: (form.cardBgColor as string) || "#ffffff",
              border: `1px solid ${(form.borderColor as string) || "#e8dcc8"}`,
            }}
          >
            <div
              className="h-[72px]"
              style={{
                backgroundColor: (form.primaryColor as string) || "#3e2723",
                opacity: 0.18 + i * 0.08,
              }}
            />
            <div className="p-2.5">
              <div className="flex justify-between items-center">
                <span
                  className="text-[12px] font-bold"
                  style={{
                    color: (form.textColor as string) || "#2c1810",
                    fontFamily: (form.fontHeading as string) || "serif",
                  }}
                >
                  {item.name}
                </span>
                <span
                  className="text-[12px] font-bold"
                  style={{
                    color: (form.accentColor as string) || "#8d6346",
                    fontFamily: (form.fontBody as string) || "sans-serif",
                  }}
                >
                  ₺{item.price}
                </span>
              </div>
              <p
                className="text-[9px] mt-0.5"
                style={{
                  color: (form.mutedTextColor as string) || "#8d7b6a",
                  fontFamily: (form.fontBody as string) || "sans-serif",
                }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function PreviewList({ form }: { form: Partial<BusinessTheme> }) {
  return (
    <>
      <PreviewHeader form={form} />
      <div className="px-4 pt-4">
        <span
          className="text-[9px] tracking-[2px] font-semibold uppercase block mb-3"
          style={{ color: (form.accentColor as string) || "#8d6346" }}
        >
          Kategori
        </span>
        {SAMPLE_ITEMS.map((item, i) => (
          <div
            key={i}
            className="flex items-baseline gap-1 mb-3"
          >
            <span
              className="text-[12px] font-medium shrink-0"
              style={{
                color: (form.textColor as string) || "#2c1810",
                fontFamily: (form.fontHeading as string) || "serif",
              }}
            >
              {item.name}
            </span>
            {/* Dotted line fill */}
            <span
              className="flex-1 border-b border-dashed"
              style={{ borderColor: (form.borderColor as string) || "#e8dcc8" }}
            />
            <span
              className="text-[12px] font-bold shrink-0"
              style={{
                color: (form.accentColor as string) || "#8d6346",
                fontFamily: (form.fontBody as string) || "sans-serif",
              }}
            >
              ₺{item.price}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function PreviewGrid({ form }: { form: Partial<BusinessTheme> }) {
  return (
    <>
      <PreviewHeader form={form} />
      <div className="px-3 pt-3">
        <span
          className="text-[9px] tracking-[2px] font-semibold uppercase block mb-2"
          style={{ color: (form.accentColor as string) || "#8d6346" }}
        >
          Kategori
        </span>
        <div className="grid grid-cols-2 gap-2">
          {SAMPLE_ITEMS.map((item, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden shadow-sm"
              style={{
                backgroundColor: (form.cardBgColor as string) || "#ffffff",
                border: `1px solid ${(form.borderColor as string) || "#e8dcc8"}`,
              }}
            >
              <div
                className="h-[48px]"
                style={{
                  backgroundColor: (form.primaryColor as string) || "#3e2723",
                  opacity: 0.15 + i * 0.07,
                }}
              />
              <div className="p-1.5">
                <p
                  className="text-[10px] font-bold leading-tight"
                  style={{
                    color: (form.textColor as string) || "#2c1810",
                    fontFamily: (form.fontHeading as string) || "serif",
                  }}
                >
                  {item.name}
                </p>
                <p
                  className="text-[10px] font-bold"
                  style={{
                    color: (form.accentColor as string) || "#8d6346",
                    fontFamily: (form.fontBody as string) || "sans-serif",
                  }}
                >
                  ₺{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PreviewHybrid({ form }: { form: Partial<BusinessTheme> }) {
  // First two items as list (chalkboard style), last two as grid
  return (
    <>
      <PreviewHeader form={form} />
      <div className="px-4 pt-3">
        <span
          className="text-[9px] tracking-[2px] font-semibold uppercase block mb-2"
          style={{ color: (form.accentColor as string) || "#8d6346" }}
        >
          Icecekler
        </span>
        {SAMPLE_ITEMS.slice(0, 2).map((item, i) => (
          <div key={i} className="flex items-baseline gap-1 mb-2">
            <span
              className="text-[12px] font-medium shrink-0"
              style={{
                color: (form.textColor as string) || "#2c1810",
                fontFamily: (form.fontHeading as string) || "serif",
              }}
            >
              {item.name}
            </span>
            <span
              className="flex-1 border-b border-dashed"
              style={{ borderColor: (form.borderColor as string) || "#e8dcc8" }}
            />
            <span
              className="text-[12px] font-bold shrink-0"
              style={{
                color: (form.accentColor as string) || "#8d6346",
                fontFamily: (form.fontBody as string) || "sans-serif",
              }}
            >
              ₺{item.price}
            </span>
          </div>
        ))}

        <span
          className="text-[9px] tracking-[2px] font-semibold uppercase block mt-3 mb-2"
          style={{ color: (form.accentColor as string) || "#8d6346" }}
        >
          Yemekler
        </span>
        <div className="grid grid-cols-2 gap-2">
          {SAMPLE_ITEMS.slice(2).map((item, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden shadow-sm"
              style={{
                backgroundColor: (form.cardBgColor as string) || "#ffffff",
                border: `1px solid ${(form.borderColor as string) || "#e8dcc8"}`,
              }}
            >
              <div
                className="h-[42px]"
                style={{
                  backgroundColor: (form.primaryColor as string) || "#3e2723",
                  opacity: 0.2 + i * 0.08,
                }}
              />
              <div className="p-1.5">
                <p
                  className="text-[10px] font-bold leading-tight"
                  style={{
                    color: (form.textColor as string) || "#2c1810",
                    fontFamily: (form.fontHeading as string) || "serif",
                  }}
                >
                  {item.name}
                </p>
                <p
                  className="text-[10px] font-bold"
                  style={{
                    color: (form.accentColor as string) || "#8d6346",
                    fontFamily: (form.fontBody as string) || "sans-serif",
                  }}
                >
                  ₺{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function LayoutPreview({ form }: { form: Partial<BusinessTheme> }) {
  const layout = (form.layoutType as string) || "FULLCARD";

  const inner = (() => {
    switch (layout) {
      case "LIST":
        return <PreviewList form={form} />;
      case "GRID":
        return <PreviewGrid form={form} />;
      case "HYBRID":
        return <PreviewHybrid form={form} />;
      default:
        return <PreviewFullcard form={form} />;
    }
  })();

  return (
    <div className="w-[300px] h-[560px] rounded-[2rem] border-[6px] border-gray-800 overflow-hidden shadow-2xl">
      <div
        className="h-full overflow-y-auto"
        style={{ backgroundColor: (form.bgColor as string) || "#faf6f0" }}
      >
        {inner}
        {/* Footer */}
        <div
          className="py-3 text-center mt-2"
          style={{ backgroundColor: (form.primaryColor as string) || "#3e2723", opacity: 0.1 }}
        >
          <span className="text-[8px] opacity-50">Vexloft Studio</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function ThemePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: theme, isLoading } = useTheme(slug);
  const update = useUpdateTheme(slug);

  const [form, setForm] = useState<Partial<BusinessTheme>>({});

  useEffect(() => {
    if (theme) setForm(theme);
  }, [theme]);

  const setColor = (key: keyof BusinessTheme) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast.success("Tema guncellendi"),
      onError: () => toast.error("Guncelleme basarisiz"),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <div className="flex gap-6">
          <Skeleton className="h-96 w-96" />
          <Skeleton className="flex-1 h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <Link href={`/businesses/${slug}`}>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tema Editoru</h1>
          <p className="text-base text-muted-foreground">/{slug}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left panel: controls */}
        <div className="w-full lg:w-[400px] shrink-0 space-y-4">
          {/* Colors */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Renkler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {COLOR_FIELDS.map(({ key, label }) => (
                <ColorField
                  key={key}
                  label={label}
                  value={(form[key] as string) ?? ""}
                  onChange={setColor(key)}
                />
              ))}
            </CardContent>
          </Card>

          {/* Fonts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Fontlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FontSelect
                label="Baslik Fontu"
                value={(form.fontHeading as string) ?? ""}
                onChange={(v) => setForm((f) => ({ ...f, fontHeading: v }))}
              />
              <FontSelect
                label="Govde Fontu"
                value={(form.fontBody as string) ?? ""}
                onChange={(v) => setForm((f) => ({ ...f, fontBody: v }))}
              />
            </CardContent>
          </Card>

          {/* Layout */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {LAYOUT_OPTIONS.map((opt) => {
                  const isActive = form.layoutType === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, layoutType: opt.value }))}
                      className={`cursor-pointer px-3 py-3 rounded-xl border text-left transition-colors ${
                        isActive
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-input hover:bg-muted"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {opt.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Media */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Medya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MediaUpload
                label="Logo"
                value={(form.logo as string | null) ?? null}
                slug={slug}
                onChange={(path) => setForm((f) => ({ ...f, logo: path }))}
              />
              <MediaUpload
                label="Hero Gorsel"
                value={(form.heroImage as string | null) ?? null}
                slug={slug}
                onChange={(path) => setForm((f) => ({ ...f, heroImage: path }))}
              />
            </CardContent>
          </Card>

          <Button
            onClick={handleSave}
            disabled={update.isPending}
            className="w-full h-11 text-base"
          >
            <Save className="h-4 w-4 mr-2" />
            {update.isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>

        {/* Right panel: live preview */}
        <div className="flex-1 min-h-[500px]">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Canli Onizleme</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-6 h-[calc(100%-52px)]">
              <LayoutPreview form={form} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
