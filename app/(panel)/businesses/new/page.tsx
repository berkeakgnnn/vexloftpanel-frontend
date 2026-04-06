"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useCreateBusiness } from "@/lib/hooks/use-businesses";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";

const TEMPLATES = ["CAFE", "RESTAURANT", "PUB", "CUSTOM"] as const;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name: string; role: string };
}

export default function NewBusinessPage() {
  const router = useRouter();
  const createBusiness = useCreateBusiness();

  const [owner, setOwner] = useState({ email: "", password: "", name: "" });
  const [business, setBusiness] = useState({ name: "", slug: "", template: "CAFE" });
  const [loading, setLoading] = useState(false);

  const ownerField =
    (key: keyof typeof owner) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setOwner((f) => ({ ...f, [key]: e.target.value }));

  const handleBusinessName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setBusiness((f) => ({ ...f, name, slug: slugify(name) }));
  };

  const isValid =
    owner.email && owner.password && owner.name && business.name && business.slug;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      // 1. Register the owner account
      const registerData = await api<RegisterResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: owner.email,
          password: owner.password,
          name: owner.name,
        }),
        auth: false,
      });

      // 2. Create the business linked to that user
      await new Promise<void>((resolve, reject) => {
        createBusiness.mutate(
          {
            name: business.name,
            slug: business.slug,
            template: business.template,
            ownerId: registerData.user.id,
          },
          {
            onSuccess: () => resolve(),
            onError: (err) => reject(err),
          }
        );
      });

      toast.success("Isletme olusturuldu");
      router.push(`/businesses/${business.slug}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Bir hata olustu";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">Yeni Isletme</h1>
          <p className="text-sm text-muted-foreground">Yeni sahip ve isletme olustur</p>
        </div>
      </div>

      {/* Owner section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Sahip Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Ad Soyad</Label>
            <Input
              value={owner.name}
              onChange={ownerField("name")}
              placeholder="Ahmet Yilmaz"
            />
          </div>
          <div className="space-y-1.5">
            <Label>E-posta</Label>
            <Input
              type="email"
              value={owner.email}
              onChange={ownerField("email")}
              placeholder="ahmet@ornek.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Sifre</Label>
            <Input
              type="password"
              value={owner.password}
              onChange={ownerField("password")}
              placeholder="Guclu bir sifre girin"
            />
          </div>
        </CardContent>
      </Card>

      {/* Business section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Isletme Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Isletme Adi</Label>
            <Input
              value={business.name}
              onChange={handleBusinessName}
              placeholder="Kafe Adim"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Slug</Label>
            <Input
              value={business.slug}
              onChange={(e) =>
                setBusiness((f) => ({
                  ...f,
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
                }))
              }
              placeholder="kafe-adim"
            />
            <p className="text-xs text-muted-foreground">
              Menu URL olarak kullanilir: /public/{business.slug || "kafe-adim"}
            </p>
          </div>
          <div className="space-y-1.5">
            <Label>Sablon</Label>
            <Select
              value={business.template}
              onValueChange={(v) => {
                // v can be null when deselected — guard before updating state
                if (v) setBusiness((f) => ({ ...f, template: v }));
              }}
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
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={loading || !isValid}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
              Olusturuluyor...
            </>
          ) : (
            "Isletme Olustur"
          )}
        </Button>
      </div>
    </div>
  );
}
