"use client";

import { Check } from "lucide-react";

const STEPS = ["Tur", "Gorunum", "Tema", "Bilgiler", "Tamamlandi"];

export function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-0 py-6">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          {/* Step circle + label */}
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i < currentStep
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : i === currentStep
                  ? "bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-md shadow-indigo-200"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < currentStep ? <Check className="h-5 w-5" /> : i + 1}
            </div>
            <span
              className={`text-xs font-medium whitespace-nowrap ${
                i <= currentStep ? "text-indigo-700" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>

          {/* Connector line between steps */}
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-16 sm:w-24 mx-2 mb-5 transition-all duration-500 ${
                i < currentStep ? "bg-indigo-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
