"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { ArrowLeft, Save, Trash2 } from "lucide-react";

const TEMPLATES = ["CAFE", "RESTAURANT", "PUB", "CUSTOM"] as const;

export default function SettingsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
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
      onSuccess: () => toast.success("Ayarlar guncellendi"),
      onError: () => toast.error("Guncelleme basarisiz"),
    });
  };

  const handleDelete = () => {
    deleteBusiness.mutate(undefined, {
      onSuccess: () => {
        toast.success("Isletme silindi");
        router.push("/dashboard");
      },
      onError: () => toast.error("Silme basarisiz"),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48" />
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
          <h1 className="text-xl font-bold">Ayarlar</h1>
          <p className="text-sm text-muted-foreground">/{slug}</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Genel Ayarlar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Isletme Adi</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Kafe Adim"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Slug</Label>
            <Input
              value={form.slug}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                }))
              }
              placeholder="kafe-adim"
            />
            <p className="text-xs text-muted-foreground">
              Yalnizca kucuk harf, rakam ve tire kullanin.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label>Sablon</Label>
            <Select
              value={form.template}
              onValueChange={(v) => { if (v) setForm((f) => ({ ...f, template: v })); }}
            >
              <SelectTrigger className="w-full">
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
          <div className="flex items-center gap-3">
            <Switch
              checked={form.isActive}
              onCheckedChange={(v) => setForm((f) => ({ ...f, isActive: v }))}
            />
            <Label>Aktif</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={update.isPending}>
          <Save className="h-4 w-4 mr-1.5" />
          {update.isPending ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>

      {/* Danger zone — admin only */}
      {isAdmin && (
        <Card className="border-destructive/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-destructive">Tehlikeli Bolge</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Isletmeyi silmek geri alinamaz. Tum kategoriler, urunler ve tema ayarlari da silinir.
            </p>
            <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="h-4 w-4 mr-1.5" />
              Isletmeyi Sil
            </Button>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Isletmeyi silmek istediginize emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>{business?.name}</strong> ve tum bagli verileri kalici olarak silinecek.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteOpen(false)}>Iptal</AlertDialogCancel>
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
