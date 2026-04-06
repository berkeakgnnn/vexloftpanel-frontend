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

// ============ KAFE TEMALARI ============
export const CAFE_THEMES: ThemePreset[] = [
  {
    id: "cafe-cozy",
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
    id: "cafe-modern",
    name: "Modern Kafe",
    description: "Beyaz, temiz, minimalist",
    colors: {
      bgColor: "#ffffff",
      primaryColor: "#1a1a1a",
      accentColor: "#d97706",
      cardBgColor: "#f9fafb",
      textColor: "#111827",
      mutedTextColor: "#6b7280",
      borderColor: "#e5e7eb",
    },
    fontHeading: "DM Sans",
    fontBody: "DM Sans",
  },
  {
    id: "cafe-dark",
    name: "Dark Roast",
    description: "Koyu kahve tonlari, moody",
    colors: {
      bgColor: "#1a1410",
      primaryColor: "#2c2018",
      accentColor: "#b8860b",
      cardBgColor: "#2c2018",
      textColor: "#f5efe6",
      mutedTextColor: "#8a7a6a",
      borderColor: "#3a2e24",
    },
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  {
    id: "cafe-pastel",
    name: "Pastel Kafe",
    description: "Yumusak renkler, ferah",
    colors: {
      bgColor: "#fef7f0",
      primaryColor: "#92400e",
      accentColor: "#f59e0b",
      cardBgColor: "#ffffff",
      textColor: "#451a03",
      mutedTextColor: "#a16207",
      borderColor: "#fde68a",
    },
    fontHeading: "Nunito",
    fontBody: "Inter",
  },
  {
    id: "cafe-green",
    name: "Botanik",
    description: "Dogal yesil, organik hissi",
    colors: {
      bgColor: "#f0fdf4",
      primaryColor: "#14532d",
      accentColor: "#16a34a",
      cardBgColor: "#ffffff",
      textColor: "#14532d",
      mutedTextColor: "#4ade80",
      borderColor: "#bbf7d0",
    },
    fontHeading: "Lora",
    fontBody: "Inter",
  },
];

// ============ RESTORAN TEMALARI ============
export const RESTAURANT_THEMES: ThemePreset[] = [
  {
    id: "rest-fine-dining",
    name: "Fine Dining",
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
    id: "rest-elegant-white",
    name: "Zarif Beyaz",
    description: "Beyaz, koyu yesil aksan",
    colors: {
      bgColor: "#fafaf9",
      primaryColor: "#1c1917",
      accentColor: "#166534",
      cardBgColor: "#ffffff",
      textColor: "#1c1917",
      mutedTextColor: "#78716c",
      borderColor: "#d6d3d1",
    },
    fontHeading: "Cormorant Garamond",
    fontBody: "Inter",
  },
  {
    id: "rest-warm-bistro",
    name: "Sicak Bistro",
    description: "Koyu bordo, Fransiz bistro hissi",
    colors: {
      bgColor: "#1a0a0a",
      primaryColor: "#2d0a0a",
      accentColor: "#dc2626",
      cardBgColor: "#2d1515",
      textColor: "#fef2f2",
      mutedTextColor: "#a87272",
      borderColor: "#3d1a1a",
    },
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  {
    id: "rest-contemporary",
    name: "Modern Restoran",
    description: "Gri tonlar, minimalist",
    colors: {
      bgColor: "#f3f4f6",
      primaryColor: "#111827",
      accentColor: "#4f46e5",
      cardBgColor: "#ffffff",
      textColor: "#111827",
      mutedTextColor: "#6b7280",
      borderColor: "#e5e7eb",
    },
    fontHeading: "DM Sans",
    fontBody: "DM Sans",
  },
  {
    id: "rest-navy",
    name: "Deniz Esintisi",
    description: "Koyu lacivert, deniz urunleri",
    colors: {
      bgColor: "#0c1222",
      primaryColor: "#1e293b",
      accentColor: "#38bdf8",
      cardBgColor: "#1e293b",
      textColor: "#e2e8f0",
      mutedTextColor: "#64748b",
      borderColor: "#334155",
    },
    fontHeading: "Merriweather",
    fontBody: "Inter",
  },
];

// ============ PUB / BAR TEMALARI ============
export const PUB_THEMES: ThemePreset[] = [
  {
    id: "pub-irish",
    name: "Irish Pub",
    description: "Koyu ahsap, amber, klasik",
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
    id: "pub-meyhane",
    name: "Meyhane",
    description: "Koyu mavi, rakı masası hissi",
    colors: {
      bgColor: "#0f172a",
      primaryColor: "#1e293b",
      accentColor: "#60a5fa",
      cardBgColor: "#1e293b",
      textColor: "#e2e8f0",
      mutedTextColor: "#94a3b8",
      borderColor: "#334155",
    },
    fontHeading: "Georgia",
    fontBody: "Inter",
  },
  {
    id: "pub-craft",
    name: "Craft Beer",
    description: "Lacivert, turuncu aksan",
    colors: {
      bgColor: "#111827",
      primaryColor: "#1f2937",
      accentColor: "#f97316",
      cardBgColor: "#1f2937",
      textColor: "#f9fafb",
      mutedTextColor: "#9ca3af",
      borderColor: "#374151",
    },
    fontHeading: "Poppins",
    fontBody: "Inter",
  },
  {
    id: "pub-sports",
    name: "Sports Bar",
    description: "Koyu gri, kirmizi aksan, enerjik",
    colors: {
      bgColor: "#18181b",
      primaryColor: "#27272a",
      accentColor: "#ef4444",
      cardBgColor: "#27272a",
      textColor: "#fafafa",
      mutedTextColor: "#a1a1aa",
      borderColor: "#3f3f46",
    },
    fontHeading: "Roboto",
    fontBody: "Roboto",
  },
  {
    id: "pub-gastropub",
    name: "Gastropub",
    description: "Koyu yesil, altin, sik pub",
    colors: {
      bgColor: "#0a1a0a",
      primaryColor: "#142814",
      accentColor: "#a3e635",
      cardBgColor: "#142814",
      textColor: "#ecfccb",
      mutedTextColor: "#65a30d",
      borderColor: "#1a3a1a",
    },
    fontHeading: "Lora",
    fontBody: "Inter",
  },
];

// Ture gore tema getir
export function getThemesByType(type: string | null): ThemePreset[] {
  switch (type) {
    case "RESTAURANT": return RESTAURANT_THEMES;
    case "PUB": return PUB_THEMES;
    case "CAFE":
    default: return CAFE_THEMES;
  }
}

// Eski uyumluluk icin
export const THEME_PRESETS = CAFE_THEMES;

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
