export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  colors: {
    bgColor: string;
    primaryColor: string;
    accentColor: string;
    cardBgColor: string;
    textColor: string;
    mutedTextColor: string;
    borderColor: string;
  };
  fontHeading: string;
  fontBody: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "warm-classic",
    name: "Sicak Klasik",
    description: "Krem arka plan, kahverengi tonlar",
    colors: {
      bgColor: "#faf6f0",
      primaryColor: "#3e2723",
      accentColor: "#8d6346",
      cardBgColor: "#ffffff",
      textColor: "#2c1810",
      mutedTextColor: "#8d7b6a",
      borderColor: "#e8dcc8",
    },
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  {
    id: "dark-luxury",
    name: "Koyu Luks",
    description: "Siyah arka plan, altin aksan",
    colors: {
      bgColor: "#0a0a0a",
      primaryColor: "#111111",
      accentColor: "#c9a96e",
      cardBgColor: "#111111",
      textColor: "#f5f0eb",
      mutedTextColor: "#555555",
      borderColor: "#1a1a1a",
    },
    fontHeading: "Cormorant Garamond",
    fontBody: "Inter",
  },
  {
    id: "modern-clean",
    name: "Modern Temiz",
    description: "Beyaz, mavi aksan, sade",
    colors: {
      bgColor: "#ffffff",
      primaryColor: "#18181b",
      accentColor: "#3b82f6",
      cardBgColor: "#f9fafb",
      textColor: "#18181b",
      mutedTextColor: "#71717a",
      borderColor: "#e5e7eb",
    },
    fontHeading: "DM Sans",
    fontBody: "DM Sans",
  },
  {
    id: "natural-warm",
    name: "Dogal Sicak",
    description: "Koyu ahsap tonlari, amber",
    colors: {
      bgColor: "#1c1714",
      primaryColor: "#231e1a",
      accentColor: "#d4a04a",
      cardBgColor: "#231e1a",
      textColor: "#f2e8d5",
      mutedTextColor: "#6a5a4a",
      borderColor: "#2a2320",
    },
    fontHeading: "Georgia",
    fontBody: "Inter",
  },
  {
    id: "fresh-pastel",
    name: "Ferah Pastel",
    description: "Acik yesil, ferah ve modern",
    colors: {
      bgColor: "#f8faf8",
      primaryColor: "#1a3a2a",
      accentColor: "#22c55e",
      cardBgColor: "#ffffff",
      textColor: "#1a1a1a",
      mutedTextColor: "#6b7280",
      borderColor: "#e5e7eb",
    },
    fontHeading: "Nunito",
    fontBody: "Inter",
  },
];

export type LayoutChoice = "FULLCARD" | "LIST" | "GRID" | "HYBRID";

export interface LayoutOption {
  id: LayoutChoice;
  name: string;
  description: string;
}

export const LAYOUT_OPTIONS: LayoutOption[] = [
  { id: "FULLCARD", name: "Fotografli Kartlar", description: "Her urunde buyuk fotograf" },
  { id: "LIST", name: "Liste Gorunumu", description: "Sade fiyat listesi, fotografsiz" },
  { id: "GRID", name: "Kucuk Kartlar", description: "2 sutunda kompakt kartlar" },
  { id: "HYBRID", name: "Karma Gorunum", description: "Icecekler liste, yemekler fotografli" },
];
