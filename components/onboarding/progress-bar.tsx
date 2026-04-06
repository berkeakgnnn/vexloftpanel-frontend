"use client";

import { Check } from "lucide-react";

const STEPS = ["Gorunum", "Tema", "Bilgiler", "Tamamlandi"];

export function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                i < currentStep
                  ? "bg-indigo-600 text-white"
                  : i === currentStep
                  ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`text-sm hidden sm:inline ${
                i <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-8 sm:w-12 h-0.5 ${
                i < currentStep ? "bg-indigo-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
