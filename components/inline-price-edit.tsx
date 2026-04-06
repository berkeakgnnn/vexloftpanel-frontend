"use client";

import { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";

interface InlinePriceEditProps {
  price: number | string;
  onSave: (newPrice: number) => Promise<void> | void;
}

export function InlinePriceEdit({ price, onSave }: InlinePriceEditProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(price));
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep local value in sync when external price changes (after refetch)
  useEffect(() => {
    if (!editing) {
      setValue(String(price));
    }
  }, [price, editing]);

  const startEditing = () => {
    setValue(String(price));
    setEditing(true);
  };

  const commit = async () => {
    const parsed = parseFloat(value);
    if (isNaN(parsed) || parsed < 0) {
      // Invalid input — revert
      setEditing(false);
      setValue(String(price));
      return;
    }
    if (parsed === parseFloat(String(price))) {
      // No change
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      await onSave(parsed);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } finally {
      setSaving(false);
      setEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    } else if (e.key === "Escape") {
      setEditing(false);
      setValue(String(price));
    }
  };

  // Auto-focus when editing starts
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const displayPrice =
    typeof price === "number" ? price.toFixed(2) : parseFloat(String(price)).toFixed(2);

  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          ref={inputRef}
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          disabled={saving}
          className="w-24 h-8 px-2 text-sm font-semibold border border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/30 bg-white"
          aria-label="Fiyat düzenle"
        />
        <span className="text-sm text-gray-500">TL</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      className="group flex items-center gap-1.5 text-left"
      title="Fiyatı düzenlemek için tıklayın"
    >
      <span className="text-base font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
        {displayPrice} TL
      </span>
      {saved ? (
        <span className="flex items-center gap-0.5 text-xs text-green-600 font-medium">
          <Check className="h-3 w-3" />
          Kaydedildi
        </span>
      ) : (
        <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Düzenle
        </span>
      )}
    </button>
  );
}
