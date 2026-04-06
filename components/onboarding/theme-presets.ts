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
// Arastirma: Warm earthy tones, dusty pinks, soft greens, warm neutrals, wood+white
export const CAFE_THEMES: ThemePreset[] = [
  {
    id: "cafe-cozy",
    name: "Sicak Klasik",
    description: "Krem, kahverengi, vintage kafe",
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
    id: "cafe-nordic",
    name: "Nordic Minimal",
    description: "Beyaz, acik ahsap, Iskandinav",
    colors: {
      bgColor: "#fafaf9",
      primaryColor: "#292524",
      accentColor: "#a8a29e",
      cardBgColor: "#ffffff",
      textColor: "#1c1917",
      mutedTextColor: "#78716c",
      borderColor: "#e7e5e4",
    },
    fontHeading: "DM Sans",
    fontBody: "DM Sans",
  },
  {
    id: "cafe-dark-roast",
    name: "Dark Roast",
    description: "Koyu kahve, moody, intimate",
    colors: {
      bgColor: "#1c1412",
      primaryColor: "#2c1f18",
      accentColor: "#c4956a",
      cardBgColor: "#2c1f18",
      textColor: "#f5efe6",
      mutedTextColor: "#a08b7a",
      borderColor: "#3d2e24",
    },
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  {
    id: "cafe-botanical",
    name: "Botanik Bahce",
    description: "Dusty green, dogal, organik",
    colors: {
      bgColor: "#f5f7f4",
      primaryColor: "#2d3b2d",
      accentColor: "#6b8f6b",
      cardBgColor: "#ffffff",
      textColor: "#1a2e1a",
      mutedTextColor: "#5c7a5c",
      borderColor: "#d4e0d4",
    },
    fontHeading: "Lora",
    fontBody: "Inter",
  },
  {
    id: "cafe-blush",
    name: "Pastel Cafe",
    description: "Dusty pink, yumusak, feminen",
    colors: {
      bgColor: "#fdf2f4",
      primaryColor: "#4a2030",
      accentColor: "#c2727e",
      cardBgColor: "#ffffff",
      textColor: "#2d1420",
      mutedTextColor: "#9e6070",
      borderColor: "#f0d0d6",
    },
    fontHeading: "Nunito",
    fontBody: "Inter",
  },
];

// ============ RESTORAN TEMALARI ============
// Arastirma: Neutrals, charcoal, deep blues, metallic/jewel accents, marble, velvet feel
export const RESTAURANT_THEMES: ThemePreset[] = [
  {
    id: "rest-fine-dining",
    name: "Fine Dining",
    description: "Siyah, altin, luks atmosfer",
    colors: {
      bgColor: "#0a0a0a",
      primaryColor: "#111111",
      accentColor: "#c9a96e",
      cardBgColor: "#141414",
      textColor: "#f5f0eb",
      mutedTextColor: "#666666",
      borderColor: "#1f1f1f",
    },
    fontHeading: "Cormorant Garamond",
    fontBody: "Inter",
  },
  {
    id: "rest-warm-bistro",
    name: "Fransiz Bistro",
    description: "Bordo, krem, sicak ve samimi",
    colors: {
      bgColor: "#faf8f5",
      primaryColor: "#5c1a1a",
      accentColor: "#8b2f2f",
      cardBgColor: "#ffffff",
      textColor: "#2d1010",
      mutedTextColor: "#8a6060",
      borderColor: "#e8d8d0",
    },
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  {
    id: "rest-emerald",
    name: "Zarif Yesil",
    description: "Koyu yesil, altin aksan, klasik",
    colors: {
      bgColor: "#0a120a",
      primaryColor: "#142014",
      accentColor: "#a8884a",
      cardBgColor: "#142014",
      textColor: "#e8f0e8",
      mutedTextColor: "#5a7a5a",
      borderColor: "#1e301e",
    },
    fontHeading: "Cormorant Garamond",
    fontBody: "Inter",
  },
  {
    id: "rest-navy",
    name: "Deniz Esintisi",
    description: "Lacivert, deniz urunleri, sahil",
    colors: {
      bgColor: "#0c1525",
      primaryColor: "#152038",
      accentColor: "#4a90b8",
      cardBgColor: "#152038",
      textColor: "#e0e8f0",
      mutedTextColor: "#6888a8",
      borderColor: "#1e3050",
    },
    fontHeading: "Merriweather",
    fontBody: "Inter",
  },
  {
    id: "rest-marble",
    name: "Modern Elegans",
    description: "Beyaz, taupe, mermer hissi",
    colors: {
      bgColor: "#f8f6f4",
      primaryColor: "#1c1917",
      accentColor: "#8a7968",
      cardBgColor: "#ffffff",
      textColor: "#1c1917",
      mutedTextColor: "#78716c",
      borderColor: "#d6d3d1",
    },
    fontHeading: "DM Sans",
    fontBody: "DM Sans",
  },
];

// ============ PUB / BAR TEMALARI ============
// Arastirma: Dark wood (oak/walnut), brass/gold accents, deep greens, burgundy, amber lighting
// Meyhane: Deep jewel tones - sapphire blue, emerald green, golden amber, white linen
// Craft beer: Industrial, orange/amber, cedar, neon, bold
// Sports bar: Charcoal, red accents, energetic, modern
export const PUB_THEMES: ThemePreset[] = [
  {
    id: "pub-irish",
    name: "Irish Pub",
    description: "Koyu ahsap, amber, pirinc",
    colors: {
      bgColor: "#1a1510",
      primaryColor: "#241e18",
      accentColor: "#c8952a",
      cardBgColor: "#241e18",
      textColor: "#f0e4d0",
      mutedTextColor: "#7a6a55",
      borderColor: "#302820",
    },
    fontHeading: "Georgia",
    fontBody: "Inter",
  },
  {
    id: "pub-meyhane",
    name: "Meyhane",
    description: "Safir mavi, altin, raki masasi",
    colors: {
      bgColor: "#0c1428",
      primaryColor: "#141e3a",
      accentColor: "#d4a855",
      cardBgColor: "#141e3a",
      textColor: "#e8e0d0",
      mutedTextColor: "#7888a8",
      borderColor: "#1e2e50",
    },
    fontHeading: "Georgia",
    fontBody: "Inter",
  },
  {
    id: "pub-craft",
    name: "Craft Bira",
    description: "Endustriyel, turuncu, cesur",
    colors: {
      bgColor: "#181818",
      primaryColor: "#222222",
      accentColor: "#e87420",
      cardBgColor: "#222222",
      textColor: "#f5f5f5",
      mutedTextColor: "#888888",
      borderColor: "#333333",
    },
    fontHeading: "Poppins",
    fontBody: "Inter",
  },
  {
    id: "pub-gastropub",
    name: "Gastropub",
    description: "Koyu yesil, pirinc, sik pub",
    colors: {
      bgColor: "#0e1a12",
      primaryColor: "#162418",
      accentColor: "#b8964a",
      cardBgColor: "#162418",
      textColor: "#e4ece6",
      mutedTextColor: "#5a8060",
      borderColor: "#1e3422",
    },
    fontHeading: "Lora",
    fontBody: "Inter",
  },
  {
    id: "pub-sports",
    name: "Sports Bar",
    description: "Koyu gri, kirmizi, enerjik",
    colors: {
      bgColor: "#141414",
      primaryColor: "#1e1e1e",
      accentColor: "#dc3030",
      cardBgColor: "#1e1e1e",
      textColor: "#f0f0f0",
      mutedTextColor: "#808080",
      borderColor: "#2e2e2e",
    },
    fontHeading: "Roboto",
    fontBody: "Roboto",
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

// Eski uyumluluk
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
