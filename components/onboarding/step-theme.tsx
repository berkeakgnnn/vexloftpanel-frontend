"use client";

import { cn } from "@/lib/utils";
import { THEME_PRESETS, type LayoutChoice, type ThemePreset } from "./theme-presets";
import { MiniLayoutPreview } from "./layout-preview";
import { Check } from "lucide-react";

interface StepThemeProps {
  value: ThemePreset | null;
  onChange: (theme: ThemePreset) => void;
  layoutChoice: LayoutChoice | null;
}

export function StepTheme({ value, onChange, layoutChoice }: StepThemeProps) {
  const layout = layoutChoice ?? "FULLCARD";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Renk temasinizi secin</h2>
        <p className="text-base text-muted-foreground mt-1">
          Isletmenizin atmosferini yansitan bir renk paleti secin.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {THEME_PRESETS.map((preset) => {
          const isSelected = value?.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset)}
              className={cn(
                "relative flex flex-col items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200",
                isSelected
                  ? "border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/60 scale-[1.02] shadow-lg"
                  : "border-border hover:border-indigo-300 hover:shadow-lg hover:scale-[1.01] bg-card"
              )}
              style={{ minHeight: 220 }}
            >
              {/* Selected badge */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center shadow-sm">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Mini phone preview with actual theme applied */}
              <MiniLayoutPreview layoutChoice={layout} themePreset={preset} />

              {/* Color palette dots */}
              <div className="flex gap-1.5 items-center">
                {[
                  { color: preset.colors.bgColor, label: "Arka plan" },
                  { color: preset.colors.primaryColor, label: "Ana renk" },
                  { color: preset.colors.accentColor, label: "Vurgu" },
                  { color: preset.colors.cardBgColor, label: "Kart" },
                  { color: preset.colors.textColor, label: "Yazi" },
                ].map(({ color, label }) => (
                  <div
                    key={label}
                    title={label}
                    style={{ backgroundColor: color }}
                    className="w-4 h-4 rounded-full border border-black/10 shadow-sm flex-shrink-0"
                  />
                ))}
              </div>

              {/* Theme name and description */}
              <div className="text-center w-full">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isSelected ? "text-indigo-700" : "text-foreground"
                  )}
                >
                  {preset.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {preset.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
