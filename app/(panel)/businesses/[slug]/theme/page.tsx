"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { HexColorPicker } from "react-colorful";
import { useTheme, useUpdateTheme, type BusinessTheme } from "@/lib/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Save } from "lucide-react";

const COLOR_FIELDS: { key: keyof BusinessTheme; label: string }[] = [
  { key: "primaryColor", label: "Ana Renk" },
  { key: "accentColor", label: "Vurgu Rengi" },
  { key: "bgColor", label: "Arkaplan" },
  { key: "cardBgColor", label: "Kart Arkaplan" },
  { key: "textColor", label: "Yazi Rengi" },
  { key: "mutedTextColor", label: "Soluk Yazi" },
  { key: "borderColor", label: "Kenar Rengi" },
];

const LAYOUT_OPTIONS = ["DEFAULT", "MINIMAL", "DARK", "LUXURY"] as const;

// Inline color picker field
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
          {/* Bigger swatch */}
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

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  const previewUrl = `${API_URL}/public/${slug}`;

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
        {/* Left panel: controls — wider at 380px */}
        <div className="w-full lg:w-[380px] shrink-0 space-y-4">
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

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Fontlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Baslik Fontu</Label>
                <Input
                  value={(form.fontHeading as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, fontHeading: e.target.value }))}
                  placeholder="Playfair Display"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Govde Fontu</Label>
                <Input
                  value={(form.fontBody as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, fontBody: e.target.value }))}
                  placeholder="Inter"
                  className="h-11"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {LAYOUT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, layoutType: opt }))}
                    className={`cursor-pointer px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      form.layoutType === opt
                        ? "bg-primary text-primary-foreground border-transparent"
                        : "border-input hover:bg-muted"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Medya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Logo URL</Label>
                <Input
                  value={(form.logo as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))}
                  placeholder="https://..."
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Hero Gorsel URL</Label>
                <Input
                  value={(form.heroImage as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, heroImage: e.target.value }))}
                  placeholder="https://..."
                  className="h-11"
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={update.isPending} className="w-full h-11 text-base">
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
              {/* Phone frame */}
              <div className="w-[320px] h-[580px] rounded-[2rem] border-[6px] border-gray-800 overflow-hidden shadow-2xl bg-white">
                <div
                  className="h-full overflow-y-auto"
                  style={{ backgroundColor: (form.bgColor as string) || "#faf6f0" }}
                >
                  {/* Mini hero */}
                  <div
                    className="h-[120px] flex flex-col items-center justify-center text-center relative"
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

                  {/* Category label */}
                  <div className="px-4 pt-4 pb-2">
                    <span
                      className="text-[9px] tracking-[2px] font-semibold uppercase"
                      style={{ color: (form.accentColor as string) || "#8d6346" }}
                    >
                      Kategori
                    </span>
                    <div
                      className="w-5 h-0.5 mt-1 rounded"
                      style={{ backgroundColor: (form.accentColor as string) || "#8d6346" }}
                    />
                  </div>

                  {/* Sample cards */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="px-4 pb-2">
                      <div
                        className="rounded-xl overflow-hidden shadow-sm"
                        style={{
                          backgroundColor: (form.cardBgColor as string) || "#ffffff",
                          borderColor: (form.borderColor as string) || "#e8dcc8",
                          borderWidth: "1px",
                        }}
                      >
                        <div
                          className="h-[80px]"
                          style={{
                            backgroundColor: (form.primaryColor as string) || "#3e2723",
                            opacity: 0.15 + i * 0.1,
                          }}
                        />
                        <div className="p-3">
                          <div className="flex justify-between items-center">
                            <span
                              className="text-[13px] font-bold"
                              style={{
                                color: (form.textColor as string) || "#2c1810",
                                fontFamily: (form.fontHeading as string) || "serif",
                              }}
                            >
                              Urun Adi {i}
                            </span>
                            <span
                              className="text-[13px] font-bold"
                              style={{
                                color: (form.accentColor as string) || "#8d6346",
                                fontFamily: (form.fontBody as string) || "sans-serif",
                              }}
                            >
                              ₺{80 + i * 10}
                            </span>
                          </div>
                          <p
                            className="text-[10px] mt-1"
                            style={{
                              color: (form.mutedTextColor as string) || "#8d7b6a",
                              fontFamily: (form.fontBody as string) || "sans-serif",
                            }}
                          >
                            Urun aciklamasi burada yer alir
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Footer */}
                  <div
                    className="mt-2 py-4 text-center"
                    style={{ backgroundColor: (form.primaryColor as string) || "#3e2723", opacity: 0.1 }}
                  >
                    <span className="text-[8px] opacity-50">Vexloft Studio</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
