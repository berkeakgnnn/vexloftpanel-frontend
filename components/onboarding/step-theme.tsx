"use client";

import { cn } from "@/lib/utils";
import { getThemesByType, type LayoutChoice, type ThemePreset } from "./theme-presets";
import { Check } from "lucide-react";

interface StepThemeProps {
  value: ThemePreset | null;
  onChange: (theme: ThemePreset) => void;
  layoutChoice: LayoutChoice | null;
  businessType: string | null;
}

export function StepTheme({ value, onChange, layoutChoice: _layoutChoice, businessType }: StepThemeProps) {
  const themes = getThemesByType(businessType);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Renk temasinizi secin</h2>
        <p className="text-base text-muted-foreground mt-1">
          Isletmenizin atmosferini yansitan bir renk paleti secin.
        </p>
        <p className="text-sm text-indigo-600 font-medium mt-1">
          Sectiginiz temayi daha sonra dilediginiz gibi ozellestirebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {themes.map((preset) => {
          const isSelected = value?.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset)}
              className={cn(
                "relative flex flex-col rounded-2xl border-2 overflow-hidden text-left transition-all duration-200",
                isSelected
                  ? "border-indigo-500 ring-2 ring-indigo-500 shadow-lg"
                  : "border-border hover:shadow-md bg-card"
              )}
              style={{ minHeight: 180 }}
            >
              {/* Selected badge */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center shadow-sm z-10">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Color bar — gradient from primary to accent */}
              <div
                className="w-full flex-shrink-0"
                style={{
                  height: 48,
                  background: `linear-gradient(to right, ${preset.colors.primaryColor}, ${preset.colors.accentColor})`,
                }}
              />

              {/* Card body */}
              <div className="flex flex-col gap-2 p-3 flex-1" style={{ backgroundColor: preset.colors.bgColor }}>
                {/* Color dots: bg, primary, accent, card, text */}
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
                <div>
                  <p
                    className={cn(
                      "text-base font-semibold leading-tight",
                      isSelected ? "text-indigo-700" : "text-foreground"
                    )}
                    style={isSelected ? undefined : { color: preset.colors.textColor }}
                  >
                    {preset.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                    {preset.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
