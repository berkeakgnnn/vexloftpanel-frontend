"use client";

import type { LayoutChoice, ThemePreset } from "./theme-presets";

const SAMPLE_ITEMS = [
  { name: "Filtre Kahve", price: "65" },
  { name: "Cappuccino", price: "85" },
  { name: "Cheesecake", price: "120" },
  { name: "Tost", price: "95" },
];

const SAMPLE_ITEMS_B = [
  { name: "Limonata", price: "75" },
  { name: "Ice Tea", price: "70" },
  { name: "Smoothie", price: "110" },
];

interface LayoutPreviewProps {
  layoutChoice: LayoutChoice | null;
  themePreset: ThemePreset | null;
  businessName: string;
  businessTagline: string;
}

// Default neutral theme for when no theme is selected
const NEUTRAL_THEME: ThemePreset = {
  id: "neutral",
  name: "Neutral",
  description: "",
  colors: {
    bgColor: "#f9fafb",
    primaryColor: "#18181b",
    accentColor: "#4338ca",
    cardBgColor: "#ffffff",
    textColor: "#18181b",
    mutedTextColor: "#71717a",
    borderColor: "#e5e7eb",
  },
  fontHeading: "Inter",
  fontBody: "Inter",
};

function FullCardItems({
  items,
  colors,
}: {
  items: typeof SAMPLE_ITEMS;
  colors: ThemePreset["colors"];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {items.slice(0, 3).map((item) => (
        <div
          key={item.name}
          style={{
            backgroundColor: colors.cardBgColor,
            borderColor: colors.borderColor,
            border: `1px solid ${colors.borderColor}`,
          }}
          className="rounded overflow-hidden"
        >
          {/* Photo placeholder */}
          <div
            style={{ backgroundColor: colors.accentColor, opacity: 0.35 }}
            className="h-7 w-full"
          />
          <div className="px-2 py-1 flex items-center justify-between">
            <span
              style={{ color: colors.textColor, fontSize: "9px", fontWeight: 600 }}
            >
              {item.name}
            </span>
            <span
              style={{ color: colors.accentColor, fontSize: "9px", fontWeight: 700 }}
            >
              {item.price} TL
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ListItems({
  items,
  colors,
}: {
  items: typeof SAMPLE_ITEMS;
  colors: ThemePreset["colors"];
}) {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-1">
          <span style={{ color: colors.textColor, fontSize: "9px", flex: 1 }}>{item.name}</span>
          <div
            style={{
              flex: 1,
              borderBottom: `1px dotted ${colors.mutedTextColor}`,
              opacity: 0.4,
              marginBottom: 2,
            }}
          />
          <span style={{ color: colors.accentColor, fontSize: "9px", fontWeight: 700 }}>
            {item.price}
          </span>
        </div>
      ))}
    </div>
  );
}

function GridItems({
  items,
  colors,
}: {
  items: typeof SAMPLE_ITEMS;
  colors: ThemePreset["colors"];
}) {
  return (
    <div className="grid grid-cols-2 gap-1">
      {items.slice(0, 4).map((item) => (
        <div
          key={item.name}
          style={{
            backgroundColor: colors.cardBgColor,
            borderColor: colors.borderColor,
            border: `1px solid ${colors.borderColor}`,
          }}
          className="rounded overflow-hidden"
        >
          <div
            style={{ backgroundColor: colors.accentColor, opacity: 0.3 }}
            className="h-4 w-full"
          />
          <div className="px-1 py-0.5">
            <div style={{ color: colors.textColor, fontSize: "8px", fontWeight: 600 }}>
              {item.name}
            </div>
            <div style={{ color: colors.accentColor, fontSize: "8px" }}>{item.price} TL</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PhoneContent({
  layoutChoice,
  colors,
  businessName,
  businessTagline,
}: {
  layoutChoice: LayoutChoice;
  colors: ThemePreset["colors"];
  businessName: string;
  businessTagline: string;
}) {
  const displayName = businessName || "Kafeniz";
  const displayTagline = businessTagline || "Hos geldiniz";

  return (
    <div
      style={{ backgroundColor: colors.bgColor, height: "100%", overflowY: "auto" }}
    >
      {/* Hero header */}
      <div
        style={{ backgroundColor: colors.primaryColor, padding: "12px 10px 10px" }}
      >
        <div
          style={{
            color: colors.accentColor,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          {displayName}
        </div>
        <div style={{ color: colors.textColor, fontSize: "8px", opacity: 0.7, marginTop: 2 }}>
          {displayTagline}
        </div>
      </div>

      {/* Category label */}
      <div style={{ padding: "8px 10px 4px" }}>
        <div
          style={{
            display: "inline-block",
            backgroundColor: colors.accentColor,
            color: "#fff",
            fontSize: "7px",
            fontWeight: 700,
            padding: "2px 6px",
            borderRadius: 4,
            letterSpacing: "0.05em",
          }}
        >
          MENUIMUZ
        </div>
      </div>

      {/* Items section */}
      <div style={{ padding: "4px 10px 10px" }}>
        {layoutChoice === "FULLCARD" && (
          <FullCardItems items={SAMPLE_ITEMS} colors={colors} />
        )}
        {layoutChoice === "LIST" && (
          <ListItems items={SAMPLE_ITEMS} colors={colors} />
        )}
        {layoutChoice === "GRID" && (
          <GridItems items={SAMPLE_ITEMS} colors={colors} />
        )}
        {layoutChoice === "HYBRID" && (
          <>
            {/* First section: list style */}
            <div style={{ marginBottom: 8 }}>
              <div
                style={{ color: colors.mutedTextColor, fontSize: "7px", marginBottom: 4 }}
              >
                ICECEKLER
              </div>
              <ListItems items={SAMPLE_ITEMS_B} colors={colors} />
            </div>
            {/* Second section: grid style */}
            <div>
              <div
                style={{ color: colors.mutedTextColor, fontSize: "7px", marginBottom: 4 }}
              >
                YEMEKLER
              </div>
              <GridItems items={SAMPLE_ITEMS.slice(0, 4)} colors={colors} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function LayoutPreview({
  layoutChoice,
  themePreset,
  businessName,
  businessTagline,
}: LayoutPreviewProps) {
  const theme = themePreset ?? NEUTRAL_THEME;
  const layout = layoutChoice ?? "FULLCARD";

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground font-medium">Canli Onizleme</p>
      {/* Phone frame */}
      <div
        style={{
          width: 200,
          height: 400,
          borderRadius: 24,
          border: "6px solid #1a1a1a",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          overflow: "hidden",
          position: "relative",
          background: theme.colors.bgColor,
        }}
      >
        {/* Phone notch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: 8,
            background: "#1a1a1a",
            borderRadius: "0 0 8px 8px",
            zIndex: 10,
          }}
        />
        <div style={{ marginTop: 8, height: "calc(100% - 8px)", overflow: "hidden" }}>
          <PhoneContent
            layoutChoice={layout}
            colors={theme.colors}
            businessName={businessName}
            businessTagline={businessTagline}
          />
        </div>
      </div>
    </div>
  );
}

// Smaller inline preview used inside selection cards
export function MiniLayoutPreview({
  layoutChoice,
  themePreset,
}: {
  layoutChoice: LayoutChoice;
  themePreset?: ThemePreset;
}) {
  const theme = themePreset ?? NEUTRAL_THEME;

  return (
    <div
      style={{
        width: 100,
        height: 160,
        borderRadius: 12,
        border: "3px solid #1a1a1a",
        overflow: "hidden",
        background: theme.colors.bgColor,
        flexShrink: 0,
      }}
    >
      <div style={{ marginTop: 4, height: "calc(100% - 4px)", overflow: "hidden" }}>
        <PhoneContent
          layoutChoice={layoutChoice}
          colors={theme.colors}
          businessName="Kafe"
          businessTagline="Hos geldiniz"
        />
      </div>
    </div>
  );
}
