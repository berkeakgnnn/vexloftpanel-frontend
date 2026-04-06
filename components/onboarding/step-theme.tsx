"use client";

import { cn } from "@/lib/utils";
import { THEME_PRESETS, type LayoutChoice, type ThemePreset } from "./theme-presets";
import { MiniLayoutPreview } from "./layout-preview";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {THEME_PRESETS.map((preset) => {
          const isSelected = value?.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset)}
              className={cn(
                "flex flex-col items-center gap-3 rounded-xl border-2 p-4 text-left transition-all",
                isSelected
                  ? "border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50/50"
                  : "border-border hover:border-indigo-300 bg-card"
              )}
            >
              <MiniLayoutPreview layoutChoice={layout} themePreset={preset} />

              {/* Color swatches */}
              <div className="flex gap-1.5">
                <div
                  className="w-5 h-5 rounded-full border border-black/10"
                  style={{ backgroundColor: preset.colors.bgColor }}
                  title="Arka plan"
                />
                <div
                  className="w-5 h-5 rounded-full border border-black/10"
                  style={{ backgroundColor: preset.colors.primaryColor }}
                  title="Ana renk"
                />
                <div
                  className="w-5 h-5 rounded-full border border-black/10"
                  style={{ backgroundColor: preset.colors.accentColor }}
                  title="Vurgu rengi"
                />
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{preset.name}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{preset.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
