"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useBusinessInfo, useUpdateBusinessInfo, type BusinessInfo } from "@/lib/hooks/use-business-info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Save } from "lucide-react";

export default function BusinessInfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: info, isLoading } = useBusinessInfo(slug);
  const update = useUpdateBusinessInfo(slug);

  const [form, setForm] = useState<Partial<BusinessInfo>>({});

  // Populate form once data loads
  useEffect(() => {
    if (info) setForm(info);
  }, [info]);

  const field = (key: keyof BusinessInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast.success("Bilgiler guncellendi"),
      onError: () => toast.error("Guncelleme basarisiz"),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64" />
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
          <h1 className="text-xl font-bold">Isletme Bilgileri</h1>
          <p className="text-sm text-muted-foreground">/{slug}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Genel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Slogan (TR)</Label>
              <Input
                value={form.tagline ?? ""}
                onChange={field("tagline")}
                placeholder="Kahvenin ustasi..."
              />
            </div>
            <div className="space-y-1.5">
              <Label>Kurulus Yili</Label>
              <Input
                value={form.established ?? ""}
                onChange={field("established")}
                placeholder="2010"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Telefon</Label>
              <Input
                value={form.phone ?? ""}
                onChange={field("phone")}
                placeholder="+90 555 000 00 00"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Website</Label>
              <Input
                value={form.website ?? ""}
                onChange={field("website")}
                placeholder="https://ornek.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Instagram</Label>
              <Input
                value={form.instagram ?? ""}
                onChange={field("instagram")}
                placeholder="@isletme"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Konum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Lokasyon (TR)</Label>
                <Input
                  value={form.locationTr ?? ""}
                  onChange={field("locationTr")}
                  placeholder="Besiktas, Istanbul"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Lokasyon (EN)</Label>
                <Input
                  value={form.locationEn ?? ""}
                  onChange={field("locationEn")}
                  placeholder="Besiktas, Istanbul"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Calisma Saatleri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Saatler (TR)</Label>
                <Input
                  value={form.hoursTr ?? ""}
                  onChange={field("hoursTr")}
                  placeholder="Haftaici 08:00 - 22:00"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Saatler (EN)</Label>
                <Input
                  value={form.hoursEn ?? ""}
                  onChange={field("hoursEn")}
                  placeholder="Weekdays 08:00 - 22:00"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={update.isPending}>
          <Save className="h-4 w-4 mr-1.5" />
          {update.isPending ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>
    </div>
  );
}
