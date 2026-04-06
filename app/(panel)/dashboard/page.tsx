"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { useBusinesses } from "@/lib/hooks/use-businesses";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Store, FolderOpen, UtensilsCrossed, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
  slug: string;
  template: string;
  isActive: boolean;
  owner?: { name: string; email: string };
  _count?: { categories: number; menuItems: number };
}

function formatDateTr(date: Date): string {
  return date.toLocaleDateString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function templateBadgeClasses(template: string): string {
  const styles: Record<string, string> = {
    CAFE: "bg-amber-50 text-amber-700 border-amber-100",
    RESTAURANT: "bg-gray-900 text-amber-400 border-gray-800",
    PUB: "bg-amber-900/10 text-amber-800 border-amber-200",
    CUSTOM: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return styles[template] || styles.CUSTOM;
}

export default function DashboardPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const { data: businesses, isLoading } = useBusinesses();

  // Redirect owner to their own panel
  useEffect(() => {
    if (!authLoading && user && !isAdmin && businesses && businesses.length > 0) {
      router.push(`/owner/${businesses[0].slug}`);
    }
  }, [authLoading, user, isAdmin, businesses, router]);

  if (authLoading || isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-9 w-72" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Skeleton className="h-52 rounded-2xl" />
          <Skeleton className="h-52 rounded-2xl" />
          <Skeleton className="h-52 rounded-2xl" />
        </div>
      </div>
    );
  }

  const totalCategories =
    businesses?.reduce((sum, b) => sum + (b._count?.categories || 0), 0) || 0;
  const totalItems =
    businesses?.reduce((sum, b) => sum + (b._count?.menuItems || 0), 0) || 0;

  const stats = [
    {
      label: "Toplam İşletme",
      value: businesses?.length || 0,
      icon: Store,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Toplam Kategori",
      value: totalCategories,
      icon: FolderOpen,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Toplam Ürün",
      value: totalItems,
      icon: UtensilsCrossed,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome section */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            Yönetim Paneli
          </p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Hoş Geldiniz{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-base text-gray-500 mt-1.5 capitalize">
            {formatDateTr(new Date())}
          </p>
        </div>
        {isAdmin && (
          <Link href="/businesses/new">
            <Button className="h-11 px-5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white border-0 shadow-sm shadow-indigo-500/20 shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              Yeni İşletme
            </Button>
          </Link>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-gray-100 shadow-sm overflow-hidden">
            {/* Indigo gradient top border */}
            <div className="h-1 bg-gradient-to-r from-indigo-600 to-purple-500" />
            <CardContent className="p-6 flex items-center gap-5">
              <div className={`p-3 rounded-xl shrink-0 ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium mt-0.5">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Business cards grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">İşletmeler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {businesses?.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}

          {/* Create new business card */}
          {isAdmin && (
            <Link href="/businesses/new" className="group">
              <div className="h-full min-h-[200px] rounded-2xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-300 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 p-6">
                <div className="h-12 w-12 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center transition-colors">
                  <Plus className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-indigo-700">Yeni İşletme Oluştur</p>
                  <p className="text-sm text-indigo-500 mt-0.5">Menü sihirbazını başlat</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function BusinessCard({ business }: { business: Business }) {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      {/* Top color strip */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />
      <CardContent className="p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-gray-900 truncate">{business.name}</h3>
            <p className="text-sm text-gray-400 mt-0.5 truncate">/{business.slug}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                business.isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <span className="text-xs text-gray-500">
              {business.isActive ? "Aktif" : "Pasif"}
            </span>
          </div>
        </div>

        {/* Template badge + counts */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${templateBadgeClasses(
              business.template
            )}`}
          >
            {business.template}
          </span>
          <span className="text-xs text-gray-500">
            {business._count?.categories || 0} kategori
          </span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-xs text-gray-500">
            {business._count?.menuItems || 0} ürün
          </span>
        </div>

        {/* Owner info */}
        {business.owner && (
          <p className="text-sm text-gray-400 truncate">{business.owner.email}</p>
        )}

        {/* Manage button */}
        <Link href={`/owner/${business.slug}`} className="block pt-1">
          <Button
            variant="outline"
            size="default"
            className="w-full h-10 text-sm font-semibold border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 group/btn"
          >
            Yönet
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
