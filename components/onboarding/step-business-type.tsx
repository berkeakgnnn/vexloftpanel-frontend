"use client";

import { cn } from "@/lib/utils";
import { Check, Coffee, UtensilsCrossed, Beer } from "lucide-react";

export type BusinessType = "CAFE" | "RESTAURANT" | "PUB";

interface StepBusinessTypeProps {
  value: BusinessType | null;
  onChange: (type: BusinessType) => void;
}

const TYPES = [
  {
    id: "CAFE" as BusinessType,
    name: "Kafe",
    description: "Kahve dukkani, pastane, brunch mekani",
    Icon: Coffee,
  },
  {
    id: "RESTAURANT" as BusinessType,
    name: "Restoran",
    description: "Fine dining, casual, fast food",
    Icon: UtensilsCrossed,
  },
  {
    id: "PUB" as BusinessType,
    name: "Pub / Bar",
    description: "Irish pub, bira bar, kokteyl bar",
    Icon: Beer,
  },
];

export function StepBusinessType({ value, onChange }: StepBusinessTypeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Isletmenizin turunu secin
        </h2>
        <p className="text-base text-muted-foreground mt-1">
          Size en uygun sablonu hazirlayalim.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TYPES.map((type) => {
          const isSelected = value === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onChange(type.id)}
              className={cn(
                "relative flex flex-col items-center gap-4 rounded-2xl border-2 p-8 text-center transition-all duration-200 group cursor-pointer",
                isSelected
                  ? "border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50/50 shadow-lg scale-[1.02]"
                  : "border-border hover:shadow-md hover:scale-[1.01] bg-card"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}

              <div
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
                  isSelected ? "bg-indigo-100" : "bg-gray-100 group-hover:bg-indigo-50"
                )}
              >
                <type.Icon
                  className={cn(
                    "w-8 h-8 transition-colors",
                    isSelected
                      ? "text-indigo-600"
                      : "text-gray-500 group-hover:text-indigo-500"
                  )}
                />
              </div>

              <div>
                <p
                  className={cn(
                    "text-lg font-semibold",
                    isSelected ? "text-indigo-700" : "text-foreground"
                  )}
                >
                  {type.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {type.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
