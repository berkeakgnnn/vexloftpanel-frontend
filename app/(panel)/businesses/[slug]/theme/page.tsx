"use client";

import { use, useState, useEffect } from "react";
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

// Small inline color picker field
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
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 h-8 px-2.5 w-full rounded-lg border border-input bg-background text-sm hover:bg-muted transition-colors"
        >
          <span
            className="inline-block h-4 w-4 rounded border border-border shrink-0"
            style={{ backgroundColor: value || "#ffffff" }}
          />
          <span className="font-mono text-xs">{value || "#ffffff"}</span>
        </button>
        {open && (
          <div className="absolute z-50 mt-1 p-2 bg-popover rounded-lg ring-1 ring-foreground/10 shadow-md">
            <HexColorPicker color={value || "#ffffff"} onChange={onChange} />
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-2 h-7 font-mono text-xs"
              placeholder="#ffffff"
            />
            <Button
              size="sm"
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

export default function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
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
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-6">
          <Skeleton className="h-96 w-80" />
          <Skeleton className="flex-1 h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/businesses/${slug}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">Tema Editoru</h1>
          <p className="text-sm text-muted-foreground">/{slug}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left panel: controls */}
        <div className="w-full lg:w-80 shrink-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Renkler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
              <CardTitle className="text-sm">Fontlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label>Baslik Fontu</Label>
                <Input
                  value={(form.fontHeading as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, fontHeading: e.target.value }))}
                  placeholder="Playfair Display"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Govde Fontu</Label>
                <Input
                  value={(form.fontBody as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, fontBody: e.target.value }))}
                  placeholder="Inter"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {LAYOUT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, layoutType: opt }))}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
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
              <CardTitle className="text-sm">Medya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label>Logo URL</Label>
                <Input
                  value={(form.logo as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-1.5">
                <Label>Hero Gorsel URL</Label>
                <Input
                  value={(form.heroImage as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, heroImage: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={update.isPending} className="w-full">
            <Save className="h-4 w-4 mr-1.5" />
            {update.isPending ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>

        {/* Right panel: live preview */}
        <div className="flex-1 min-h-[500px]">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Onizleme</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-52px)]">
              {API_URL ? (
                <iframe
                  src={previewUrl}
                  title="Menu Onizleme"
                  className="w-full h-full rounded-b-xl border-0 min-h-[500px]"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground p-6">
                  NEXT_PUBLIC_API_URL ayarlanmamis. Onizleme gorunemez.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
