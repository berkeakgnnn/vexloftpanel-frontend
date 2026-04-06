"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogoIcon } from "@/components/logo";
import { login } from "@/lib/auth";
import { api } from "@/lib/api";
import { CheckCircle, LogIn } from "lucide-react";

interface Business {
  id: string;
  name: string;
  slug: string;
}

const FEATURES = [
  { label: "Kolay Menü Yönetimi", desc: "Kategoriler ve ürünleri anında düzenleyin" },
  { label: "Anında Güncelleme", desc: "Değişiklikler hemen müşterilere yansır" },
  { label: "QR Kod ile Erişim", desc: "Masalara QR kod koyun, menü hazır" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        // Owner — fetch their business and redirect directly
        try {
          const businesses = await api<Business[]>("/businesses");
          if (businesses && businesses.length > 0) {
            router.push(`/owner/${businesses[0].slug}`);
          } else {
            router.push("/dashboard");
          }
        } catch {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş başarısız");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side — brand panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <LogoIcon className="h-9 w-9 text-white" />
          <span className="text-2xl font-bold text-white tracking-tight">Vexloft</span>
        </div>

        {/* Center content */}
        <div className="relative space-y-10">
          <div>
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-3">
              Hoş Geldiniz
            </p>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Dijital menü
              <br />
              çözümleri
            </h2>
            <p className="text-white/70 text-lg mt-4 leading-relaxed max-w-xs">
              Restoranınız ve kafeniz için modern QR menü yönetimi.
            </p>
          </div>

          <div className="space-y-5">
            {FEATURES.map((feature) => (
              <div key={feature.label} className="flex items-start gap-4">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle className="h-5 w-5 text-indigo-200" />
                </div>
                <div>
                  <p className="text-white font-semibold text-base">{feature.label}</p>
                  <p className="text-white/60 text-sm mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative">
          <p className="text-white/40 text-sm">vexloft.com</p>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile top accent bar */}
        <div className="lg:hidden h-2 bg-gradient-to-r from-indigo-700 to-purple-600" />

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 px-6 pt-8 pb-2">
          <LogoIcon className="h-7 w-7 text-indigo-600" />
          <span className="text-xl font-bold tracking-tight text-gray-900">Vexloft</span>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm space-y-8">
            {/* Heading */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hoş Geldiniz</h1>
              <p className="text-base text-gray-500 mt-1.5">Hesabınıza giriş yapın</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  E-posta
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-lg border-gray-200 text-base focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-lg border-gray-200 text-base focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white border-0 rounded-lg shadow-sm shadow-indigo-500/25"
              >
                {loading ? (
                  "Giriş yapılıyor..."
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Giriş Yap
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-gray-400">
              Vexloft Panel &mdash; Yetkisiz erişim yasaktır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
