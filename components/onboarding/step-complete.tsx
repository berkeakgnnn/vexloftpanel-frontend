"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Harika gorunuyor!</h2>
        <p className="text-base text-muted-foreground mt-1">
          Menunuz hazir. Olustur butonuna basarak devam edin.
        </p>
      </div>

      {/* Summary */}
      <div className="rounded-xl border bg-card p-4 space-y-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Isletme:</span>{" "}
            <span className="font-medium">{businessInfo.name || "—"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Gorunum:</span>{" "}
            <span className="font-medium">{layoutChoice ?? "—"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Tema:</span>{" "}
            <span className="font-medium">{themePreset?.name ?? "—"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Adres:</span>{" "}
            <span className="font-medium">{businessInfo.location || "—"}</span>
          </div>
        </div>
      </div>

      {/* Large phone preview */}
      <div className="flex justify-center">
        <div
          style={{
            width: 260,
            height: 520,
            borderRadius: 32,
            border: "8px solid #1a1a1a",
            boxShadow: "0 12px 48px rgba(0,0,0,0.22)",
            overflow: "hidden",
            background: themePreset?.colors.bgColor ?? "#f9fafb",
          }}
        >
          <LayoutPreview
            layoutChoice={layoutChoice}
            themePreset={themePreset}
            businessName={businessInfo.name}
            businessTagline={businessInfo.tagline}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={onConfirm}
          disabled={loading}
          className="h-12 flex-1 text-base font-semibold bg-gradient-to-r from-indigo-700 to-indigo-500 hover:from-indigo-800 hover:to-indigo-600 text-white border-0"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Olusturuluyor...
            </>
          ) : (
            "Menuyu Olustur"
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onLater}
          disabled={loading}
          className="h-12 flex-1 text-base"
        >
          Daha Sonra
        </Button>
      </div>
    </div>
  );
}
