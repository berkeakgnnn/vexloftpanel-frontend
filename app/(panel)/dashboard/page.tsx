"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Store, UtensilsCrossed, FolderOpen, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
  slug: string;
  template: string;
  isActive: boolean;
  owner: { name: string; email: string };
  _count?: { categories: number; menuItems: number };
}

export default function DashboardPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const { data: businesses, isLoading } = useQuery({
    queryKey: ["businesses"],
    queryFn: () => api<Business[]>("/businesses"),
    enabled: !!user,
  });

  // Redirect owner directly to their business page once loaded
  useEffect(() => {
    if (!authLoading && user && !isAdmin && businesses && businesses.length > 0) {
      router.push(`/businesses/${businesses[0].slug}`);
    }
  }, [authLoading, user, isAdmin, businesses, router]);

  if (authLoading || isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const totalCategories =
    businesses?.reduce((sum, b) => sum + (b._count?.categories || 0), 0) || 0;
  const totalItems =
    businesses?.reduce((sum, b) => sum + (b._count?.menuItems || 0), 0) || 0;

  const templateBadge = (template: string): string => {
    const styles: Record<string, string> = {
      CAFE: "bg-amber-50 text-amber-700",
      RESTAURANT: "bg-gray-900 text-amber-400",
      PUB: "bg-amber-900/10 text-amber-800",
      CUSTOM: "bg-gray-100 text-gray-600",
    };
    return styles[template] || styles.CUSTOM;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-base text-muted-foreground mt-1">
            {businesses?.length || 0} aktif isletme
          </p>
        </div>
        {isAdmin && (
          <Link href="/businesses/new">
            <Button
              size="default"
              className="h-11 px-5 bg-gradient-to-r from-indigo-700 to-indigo-500 hover:from-indigo-800 hover:to-indigo-600 text-white border-0"
            >
              <Plus className="mr-2 h-4 w-4" />
              Yeni Isletme
            </Button>
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-t-2 border-t-indigo-500">
          <CardContent className="p-5 flex items-center gap-5">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Store className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{businesses?.length || 0}</p>
              <p className="text-sm text-muted-foreground font-medium mt-0.5">Toplam Isletme</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-t-2 border-t-indigo-500">
          <CardContent className="p-5 flex items-center gap-5">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <FolderOpen className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{totalCategories}</p>
              <p className="text-sm text-muted-foreground font-medium mt-0.5">Toplam Kategori</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-t-2 border-t-indigo-500">
          <CardContent className="p-5 flex items-center gap-5">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <UtensilsCrossed className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">{totalItems}</p>
              <p className="text-sm text-muted-foreground font-medium mt-0.5">Toplam Urun</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Isletmeler</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/50">
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">
                    Isletme
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">
                    Sablon
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">
                    Durum
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">
                    Sahip
                  </th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {businesses?.map((business) => (
                  <tr
                    key={business.id}
                    className="border-b last:border-0 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="text-base font-semibold">{business.name}</div>
                      <div className="text-sm text-muted-foreground">
                        /{business.slug}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-semibold ${templateBadge(business.template)}`}
                      >
                        {business.template}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-2.5 h-2.5 rounded-full ${
                            business.isActive ? "bg-green-500" : "bg-gray-300"
                          }`}
                        />
                        <span className="text-sm text-muted-foreground">
                          {business.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {business.owner?.email}
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/businesses/${business.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 px-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
                        >
                          Yonet
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
