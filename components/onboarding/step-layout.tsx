"use client";

import { cn } from "@/lib/utils";
import { LAYOUT_OPTIONS, type LayoutChoice } from "./theme-presets";
import { Check, Image, List, LayoutGrid, Columns3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StepLayoutProps {
  value: LayoutChoice | null;
  onChange: (choice: LayoutChoice) => void;
}

const LAYOUT_ICONS: Record<LayoutChoice, LucideIcon> = {
  FULLCARD: Image,
  LIST: List,
  GRID: LayoutGrid,
  HYBRID: Columns3,
};

export function StepLayout({ value, onChange }: StepLayoutProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Menunuz nasil gorunsun?</h2>
        <p className="text-base text-muted-foreground mt-1">
          Musteri menunuzu telefonunda acacak. Hangi gorunum size yakisir?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {LAYOUT_OPTIONS.map((option) => {
          const isSelected = value === option.id;
          const Icon = LAYOUT_ICONS[option.id];
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "relative flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-left transition-all duration-200 group",
                isSelected
                  ? "border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50/50 shadow-lg"
                  : "border-border hover:shadow-md bg-card"
              )}
              style={{ minHeight: 160 }}
            >
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center shadow-sm">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Icon in a circle */}
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>

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
