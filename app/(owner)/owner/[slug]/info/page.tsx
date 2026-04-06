"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useBusinessInfo,
  useUpdateBusinessInfo,
  type BusinessInfo,
} from "@/lib/hooks/use-business-info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Save } from "lucide-react";

export default function OwnerInfoPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: info, isLoading } = useBusinessInfo(slug);
  const update = useUpdateBusinessInfo(slug);

  const [form, setForm] = useState<Partial<BusinessInfo>>({});

  useEffect(() => {
    if (info) setForm(info);
  }, [info]);

  const field =
    (key: keyof BusinessInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast.success("Bilgiler güncellendi"),
      onError: () => toast.error("Güncelleme başarısız"),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">İşletme Bilgileri</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Lokasyon, çalışma saatleri ve iletişim bilgilerini güncelleyin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Genel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Slogan (TR)</Label>
              <Input
                value={form.tagline ?? ""}
                onChange={field("tagline")}
                placeholder="Kahvenin ustası..."
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Kuruluş Yılı</Label>
              <Input
                value={form.established ?? ""}
                onChange={field("established")}
                placeholder="2010"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Telefon</Label>
              <Input
                value={form.phone ?? ""}
                onChange={field("phone")}
                placeholder="+90 555 000 00 00"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Website</Label>
              <Input
                value={form.website ?? ""}
                onChange={field("website")}
                placeholder="https://ornek.com"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Instagram</Label>
              <Input
                value={form.instagram ?? ""}
                onChange={field("instagram")}
                placeholder="@isletme"
                className="h-11"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Konum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Lokasyon (TR)</Label>
                <Input
                  value={form.locationTr ?? ""}
                  onChange={field("locationTr")}
                  placeholder="Beşiktaş, İstanbul"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Lokasyon (EN)</Label>
                <Input
                  value={form.locationEn ?? ""}
                  onChange={field("locationEn")}
                  placeholder="Besiktas, Istanbul"
                  className="h-11"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Çalışma Saatleri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Saatler (TR)</Label>
                <Input
                  value={form.hoursTr ?? ""}
                  onChange={field("hoursTr")}
                  placeholder="Haftaiçi 08:00 - 22:00"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Saatler (EN)</Label>
                <Input
                  value={form.hoursEn ?? ""}
                  onChange={field("hoursEn")}
                  placeholder="Weekdays 08:00 - 22:00"
                  className="h-11"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={update.isPending}
          className="h-11 px-6 text-base bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white border-0"
        >
          <Save className="h-4 w-4 mr-2" />
          {update.isPending ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>
    </div>
  );
}
