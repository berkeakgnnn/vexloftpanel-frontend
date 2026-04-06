"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useBusiness } from "@/lib/hooks/use-businesses";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UtensilsCrossed, Palette, Info, Settings, ExternalLink, ArrowLeft } from "lucide-react";

export default function BusinessPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: business, isLoading } = useBusiness(slug);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-2 gap-5">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </div>
    );
  }

  if (!business) return <div className="text-base text-muted-foreground">Isletme bulunamadi</div>;

  const links = [
    {
      label: "Menu Yonetimi",
      href: `/businesses/${slug}/menu`,
      icon: UtensilsCrossed,
      desc: "Kategoriler ve urunler",
    },
    {
      label: "Tema Editoru",
      href: `/businesses/${slug}/theme`,
      icon: Palette,
      desc: "Renkler, fontlar, layout",
    },
    {
      label: "Isletme Bilgileri",
      href: `/businesses/${slug}/info`,
      icon: Info,
      desc: "Lokasyon, saatler, iletisim",
    },
    {
      label: "Ayarlar",
      href: `/businesses/${slug}/settings`,
      icon: Settings,
      desc: "Genel ayarlar",
    },
  ];

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{business.name}</h1>
          <p className="text-base text-muted-foreground mt-0.5">/{business.slug}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:bg-gray-50/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex items-center gap-5">
                <div className="p-3 bg-gray-100 rounded-xl shrink-0">
                  <link.icon className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <p className="text-base font-semibold">{link.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{link.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <a href={`${API_URL}/public/${slug}`} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" className="h-10">
          <ExternalLink className="mr-2 h-4 w-4" />
          Public API Endpoint
        </Button>
      </a>
    </div>
  );
}
