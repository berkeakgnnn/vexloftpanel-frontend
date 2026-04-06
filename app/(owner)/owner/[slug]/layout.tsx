"use client";

import { useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, logout, getUser } from "@/lib/auth";
import { useBusiness } from "@/lib/hooks/use-businesses";
import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, LogOut, User, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  href: string;
  segment: string;
}

function OwnerHeader({ slug }: { slug: string }) {
  const { data: business } = useBusiness(slug);
  const pathname = usePathname();
  const user = getUser();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const tabs: Tab[] = [
    { label: "Menü", href: `/owner/${slug}/menu`, segment: "menu" },
    { label: "Tema", href: `/owner/${slug}/theme`, segment: "theme" },
    { label: "Bilgiler", href: `/owner/${slug}/info`, segment: "info" },
    { label: "Ayarlar", href: `/owner/${slug}/settings`, segment: "settings" },
  ];

  const activeSegment = pathname.split("/").pop() ?? "";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top row */}
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Left: back button (admin only) + logo + business name */}
          <div className="flex items-center gap-2.5 min-w-0">
            {user?.role === "ADMIN" && (
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <LogoIcon className="h-6 w-6 text-indigo-600 shrink-0" />
            <span className="font-bold text-lg text-gray-900 truncate">
              {business?.name ?? "Yükleniyor..."}
            </span>
          </div>

          {/* Center tabs — desktop only */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {tabs.map((tab) => {
              const isActive = pathname.endsWith(tab.segment);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: view button + user dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`${API_URL}/public/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button
                variant="outline"
                size="sm"
                className="h-9 text-sm font-medium border-gray-200 text-gray-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Menüyü Görüntüle
              </Button>
            </a>

            {/* Mobile: just icon */}
            <a
              href={`${API_URL}/public/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden"
            >
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ExternalLink className="h-4 w-4 text-gray-600" />
              </Button>
            </a>

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="flex items-center justify-center h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm hover:bg-indigo-200 transition-colors">
                    {user?.name?.charAt(0)?.toUpperCase() ?? <User className="h-4 w-4" />}
                  </button>
                }
              />
              <DropdownMenuContent align="end" className="w-52">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Çıkış Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bottom row: mobile tabs */}
        <nav className="md:hidden flex items-center gap-1 pb-0 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = pathname.endsWith(tab.segment);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors",
                  isActive
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-500 border-transparent hover:text-gray-700"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <OwnerHeader slug={slug} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
