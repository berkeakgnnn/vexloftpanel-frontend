"use client";

import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Sparkles, Edit3, LayoutDashboard } from "lucide-react";
import { LayoutPreview } from "./layout-preview";
import type { LayoutChoice, ThemePreset } from "./theme-presets";
import type { BusinessInfo } from "./step-info";

interface StepCompleteProps {
  layoutChoice: LayoutChoice | null;
  themePreset: ThemePreset | null;
  businessInfo: BusinessInfo;
  loading: boolean;
  onConfirm: () => void;
  onLater: () => void;
}

export function StepComplete({
  layoutChoice,
  themePreset,
  businessInfo,
  loading,
  onConfirm,
  onLater,
}: StepCompleteProps) {
  const displayName = businessInfo.name || "Isletmeniz";

  return (
    <div className="flex flex-col items-center text-center space-y-8 py-4">
      {/* Success icon with glow */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-indigo-100 blur-xl scale-150 opacity-70" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-200">
          <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
        {/* Sparkles decoration */}
        <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400 drop-shadow-sm" />
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Tebrikler, {displayName}!
        </h2>
        <p className="text-base text-muted-foreground max-w-md mx-auto">
          Menunuz basariyla olusturuldu ve yayina hazir. Asagida son halinize bakabilirsiniz.
        </p>
      </div>

      {/* Large phone preview */}
      <div className="relative">
        {/* Decorative glow behind phone */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-20 scale-75"
          style={{
            backgroundColor: themePreset?.colors.accentColor ?? "#4338ca",
          }}
        />
        <div className="relative">
          <LayoutPreview
            layoutChoice={layoutChoice}
            themePreset={themePreset}
            businessName={businessInfo.name}
            businessTagline={businessInfo.tagline}
            size="large"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button
          onClick={onConfirm}
          disabled={loading}
          className="h-14 flex-1 text-lg font-semibold bg-gradient-to-r from-indigo-700 to-indigo-500 hover:from-indigo-800 hover:to-indigo-600 text-white border-0 shadow-lg shadow-indigo-200/50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Olusturuluyor...
            </>
          ) : (
            <>
              <Edit3 className="h-5 w-5 mr-2" />
              Menuyu Duzenle
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onLater}
          disabled={loading}
          className="h-14 flex-1 text-lg border-2"
        >
          <LayoutDashboard className="h-5 w-5 mr-2" />
          Panele Don
        </Button>
      </div>
    </div>
  );
}
