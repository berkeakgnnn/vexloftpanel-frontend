"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { LayoutDashboard, Store, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/lib/hooks/use-auth";
import { logout } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  adminOnly?: boolean;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Isletmeler", href: "/businesses", icon: Store, adminOnly: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const filteredNav = mainNav.filter((item) => !item.adminOnly || isAdmin);

  return (
    <aside className="hidden md:flex w-[260px] flex-col border-r bg-gray-50/50 h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 hover:opacity-75 transition-opacity"
        >
          <Logo />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {filteredNav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* User section */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email}</p>
          </div>
          <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
            <AlertDialogTrigger
              render={
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <LogOut className="h-4 w-4" />
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cikis Yap</AlertDialogTitle>
                <AlertDialogDescription>
                  Oturumunuzu kapatmak istediginize emin misiniz?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Iptal</AlertDialogCancel>
                <AlertDialogAction onClick={logout}>Cikis Yap</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </aside>
  );
}
