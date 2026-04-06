"use client";

import { cn } from "@/lib/utils";
import { LAYOUT_OPTIONS, type LayoutChoice } from "./theme-presets";
import { MiniLayoutPreview } from "./layout-preview";

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

      <div className="grid grid-cols-2 gap-4">
        {LAYOUT_OPTIONS.map((option) => {
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "flex flex-col items-center gap-3 rounded-xl border-2 p-4 text-left transition-all",
                isSelected
                  ? "border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50/50"
                  : "border-border hover:border-indigo-300 bg-card"
              )}
            >
              <MiniLayoutPreview layoutChoice={option.id} />
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{option.name}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
