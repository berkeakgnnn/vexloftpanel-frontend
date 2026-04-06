"use client";

import { use } from "react";
import Link from "next/link";
import { useBusiness } from "@/lib/hooks/use-businesses";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UtensilsCrossed, Palette, Info, Settings, ExternalLink, ArrowLeft } from "lucide-react";

export default function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: business, isLoading } = useBusiness(slug);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    );
  }

  if (!business) return <div>Isletme bulunamadi</div>;

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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{business.name}</h1>
          <p className="text-sm text-muted-foreground">/{business.slug}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:bg-gray-50/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <link.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <a href={`${API_URL}/public/${slug}`} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" className="mt-2">
          <ExternalLink className="mr-2 h-4 w-4" />
          Public API Endpoint
        </Button>
      </a>
    </div>
  );
}
