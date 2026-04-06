"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LayoutDashboard, Store, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();

  const items = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ...(isAdmin ? [{ label: "Isletmeler", href: "/businesses", icon: Store }] : []),
  ];

  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-40">
      <Link href="/dashboard" className="flex items-center gap-2">
        <span className="inline-block w-1 h-4 rounded-full bg-foreground shrink-0" />
        <span className="font-bold text-base tracking-tight">Vexloft</span>
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          }
        />
        <SheetContent side="left" className="w-[280px] p-0">
          <div className="px-5 py-5 border-b">
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-1 h-5 rounded-full bg-foreground shrink-0" />
              <span className="font-bold text-lg tracking-tight">Vexloft Panel</span>
            </div>
          </div>
          <nav className="p-3 space-y-1">
            {items.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
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
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email}</p>
              </div>
              <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <AlertDialogTrigger
                  render={
                    <Button variant="ghost" size="icon">
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
