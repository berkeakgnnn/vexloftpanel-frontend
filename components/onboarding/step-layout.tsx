"use client";

import { cn } from "@/lib/utils";
import { LAYOUT_OPTIONS, type LayoutChoice } from "./theme-presets";
import { MiniLayoutPreview } from "./layout-preview";
import { Check } from "lucide-react";

interface StepLayoutProps {
  value: LayoutChoice | null;
  onChange: (choice: LayoutChoice) => void;
}

export function StepLayout({ value, onChange }: StepLayoutProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Menuunuz nasil gorunsun?</h2>
        <p className="text-base text-muted-foreground mt-1">
          Musteri menunuzu telefonunda acacak. Hangi gorunum size yakisir?
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {LAYOUT_OPTIONS.map((option) => {
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "relative flex flex-col items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-200 group",
                isSelected
                  ? "border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/60 scale-[1.02] shadow-lg"
                  : "border-border hover:border-indigo-300 hover:shadow-lg hover:scale-[1.01] bg-card"
              )}
              style={{ minHeight: 200 }}
            >
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}

              {/* Mini phone preview */}
              <MiniLayoutPreview layoutChoice={option.id} />

              {/* Text */}
              <div className="text-center w-full">
                <p
                  className={cn(
                    "text-base font-semibold",
                    isSelected ? "text-indigo-700" : "text-foreground"
                  )}
                >
                  {option.name}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
