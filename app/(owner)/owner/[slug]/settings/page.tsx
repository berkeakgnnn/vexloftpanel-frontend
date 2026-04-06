"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useBusiness,
  useUpdateBusiness,
  useDeleteBusiness,
} from "@/lib/hooks/use-businesses";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Save, Trash2 } from "lucide-react";

const TEMPLATES = ["CAFE", "RESTAURANT", "PUB", "CUSTOM"] as const;

export default function OwnerSettingsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const { isAdmin } = useAuth();

  const { data: business, isLoading } = useBusiness(slug);
  const update = useUpdateBusiness(slug);
  const deleteBusiness = useDeleteBusiness(slug);

  const [form, setForm] = useState({ name: "", slug: "", template: "CAFE", isActive: true });
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (business) {
      setForm({
        name: business.name,
        slug: business.slug,
        template: business.template,
        isActive: business.isActive,
      });
    }
  }, [business]);

  const handleSave = () => {
    update.mutate(form, {
      onSuccess: () => toast.success("Ayarlar güncellendi"),
      onError: () => toast.error("Güncelleme başarısız"),
    });
  };

  const handleDelete = () => {
    deleteBusiness.mutate(undefined, {
      onSuccess: () => {
        toast.success("İşletme silindi");
        router.push("/dashboard");
      },
      onError: () => toast.error("Silme başarısız"),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
        <p className="text-sm text-gray-500 mt-0.5">İşletme genel ayarlarını yönetin.</p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Genel Ayarlar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium">İşletme Adı</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Kafe Adım"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Slug</Label>
            <Input
              value={form.slug}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
                }))
              }
              placeholder="kafe-adim"
              className="h-11"
            />
            <p className="text-sm text-muted-foreground">
              Yalnızca küçük harf, rakam ve tire kullanın.
            </p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Şablon</Label>
            <Select
              value={form.template}
              onValueChange={(v) => {
                if (v) setForm((f) => ({ ...f, template: v }));
              }}
            >
              <SelectTrigger className="w-full h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <Switch
              checked={form.isActive}
              onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: v }))}
            />
            <Label className="text-sm font-medium">Aktif</Label>
          </div>
        </CardContent>
      </Card>

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

      {/* Danger zone — admin only */}
      {isAdmin && (
        <Card className="border-red-100">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-red-600">Tehlikeli Bölge</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-5">
              İşletmeyi silmek geri alınamaz. Tüm kategoriler, ürünler ve tema ayarları da silinir.
            </p>
            <Button variant="destructive" className="h-10" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="h-4 w-4 mr-2" />
              İşletmeyi Sil
            </Button>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>İşletmeyi silmek istediğinize emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>{business?.name}</strong> ve tüm bağlı veriler kalıcı olarak silinecek.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteOpen(false)}>İptal</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteBusiness.isPending}
            >
              {deleteBusiness.isPending ? "Siliniyor..." : "Evet, Sil"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
