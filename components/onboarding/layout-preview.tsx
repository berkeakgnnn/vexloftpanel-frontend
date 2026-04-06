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

export type PhoneSize = "small" | "medium" | "large";

interface LayoutPreviewProps {
  layoutChoice: LayoutChoice | null;
  themePreset: ThemePreset | null;
  businessName: string;
  businessTagline: string;
  size?: PhoneSize;
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

const SIZE_MAP: Record<PhoneSize, { width: number; height: number; borderRadius: number; border: number }> = {
  small: { width: 200, height: 400, borderRadius: 28, border: 6 },
  medium: { width: 280, height: 560, borderRadius: 36, border: 8 },
  large: { width: 320, height: 620, borderRadius: 40, border: 8 },
};

function FullCardItems({
  items,
  colors,
  scale = 1,
}: {
  items: typeof SAMPLE_ITEMS;
  colors: ThemePreset["colors"];
  scale?: number;
}) {
  const fs = (n: number) => Math.round(n * scale);
  return (
    <div className="flex flex-col" style={{ gap: fs(6) }}>
      {items.slice(0, 3).map((item) => (
        <div
          key={item.name}
          style={{
            backgroundColor: colors.cardBgColor,
            border: `1px solid ${colors.borderColor}`,
            borderRadius: fs(8),
            overflow: "hidden",
          }}
        >
          {/* Photo placeholder with gradient */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.accentColor}55, ${colors.primaryColor}33)`,
              height: fs(36),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: fs(20),
                height: fs(20),
                borderRadius: "50%",
                backgroundColor: colors.accentColor,
                opacity: 0.4,
              }}
            />
          </div>
          <div
            style={{
              padding: `${fs(4)}px ${fs(8)}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: colors.textColor,
                fontSize: fs(9),
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {item.name}
            </span>
            <span
              style={{
                color: colors.accentColor,
                fontSize: fs(9),
                fontWeight: 700,
              }}
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
  scale = 1,
}: {
  items: typeof SAMPLE_ITEMS;
  colors: ThemePreset["colors"];
  scale?: number;
}) {
  const fs = (n: number) => Math.round(n * scale);
  return (
    <div className="flex flex-col" style={{ gap: fs(5) }}>
      {items.map((item) => (
        <div
          key={item.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: fs(4),
            padding: `${fs(4)}px 0`,
            borderBottom: `1px solid ${colors.borderColor}`,
          }}
        >
          <span
            style={{
              color: colors.textColor,
              fontSize: fs(9),
              flex: 1,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {item.name}
          </span>
          <span
            style={{
              color: colors.accentColor,
              fontSize: fs(9),
              fontWeight: 700,
            }}
          >
            {item.price} TL
          </span>
        </div>
      ))}
    </div>
  );
}

function GridItems({
  items,
  colors,
  scale = 1,
}: {
  items: typeof SAMPLE_ITEMS;
  colors: ThemePreset["colors"];
  scale?: number;
}) {
  const fs = (n: number) => Math.round(n * scale);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: fs(5),
      }}
    >
      {items.slice(0, 4).map((item) => (
        <div
          key={item.name}
          style={{
            backgroundColor: colors.cardBgColor,
            border: `1px solid ${colors.borderColor}`,
            borderRadius: fs(6),
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.accentColor}44, ${colors.primaryColor}22)`,
              height: fs(22),
            }}
          />
          <div style={{ padding: `${fs(3)}px ${fs(5)}px` }}>
            <div
              style={{
                color: colors.textColor,
                fontSize: fs(8),
                fontWeight: 600,
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                color: colors.accentColor,
                fontSize: fs(8),
                marginTop: fs(1),
              }}
            >
              {item.price} TL
            </div>
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
  scale = 1,
}: {
  layoutChoice: LayoutChoice;
  colors: ThemePreset["colors"];
  businessName: string;
  businessTagline: string;
  scale?: number;
}) {
  const displayName = businessName || "Kafeniz";
  const displayTagline = businessTagline || "Hos geldiniz";
  const fs = (n: number) => Math.round(n * scale);

  return (
    <div
      style={{
        backgroundColor: colors.bgColor,
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Hero header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.primaryColor}, ${colors.primaryColor}dd)`,
          padding: `${fs(14)}px ${fs(12)}px ${fs(12)}px`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            color: colors.accentColor,
            fontSize: fs(13),
            fontWeight: 800,
            letterSpacing: "0.04em",
          }}
        >
          {displayName}
        </div>
        <div
          style={{
            color: colors.textColor === colors.bgColor ? "#fff" : colors.accentColor,
            fontSize: fs(8),
            opacity: 0.7,
            marginTop: fs(3),
          }}
        >
          {displayTagline}
        </div>
      </div>

      {/* Category label */}
      <div style={{ padding: `${fs(8)}px ${fs(12)}px ${fs(5)}px`, flexShrink: 0 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: colors.accentColor,
            color: "#fff",
            fontSize: fs(7),
            fontWeight: 700,
            padding: `${fs(2)}px ${fs(7)}px`,
            borderRadius: fs(4),
            letterSpacing: "0.05em",
          }}
        >
          MENUMUZ
        </div>
      </div>

      {/* Items */}
      <div style={{ padding: `0 ${fs(12)}px ${fs(12)}px`, flex: 1 }}>
        {layoutChoice === "FULLCARD" && (
          <FullCardItems items={SAMPLE_ITEMS} colors={colors} scale={scale} />
        )}
        {layoutChoice === "LIST" && (
          <ListItems items={SAMPLE_ITEMS} colors={colors} scale={scale} />
        )}
        {layoutChoice === "GRID" && (
          <GridItems items={SAMPLE_ITEMS} colors={colors} scale={scale} />
        )}
        {layoutChoice === "HYBRID" && (
          <>
            <div style={{ marginBottom: fs(10) }}>
              <div
                style={{
                  color: colors.mutedTextColor,
                  fontSize: fs(7),
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  marginBottom: fs(5),
                }}
              >
                ICECEKLER
              </div>
              <ListItems items={SAMPLE_ITEMS_B} colors={colors} scale={scale} />
            </div>
            <div>
              <div
                style={{
                  color: colors.mutedTextColor,
                  fontSize: fs(7),
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  marginBottom: fs(5),
                }}
              >
                YEMEKLER
              </div>
              <GridItems items={SAMPLE_ITEMS.slice(0, 4)} colors={colors} scale={scale} />
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
  size = "medium",
}: LayoutPreviewProps) {
  const theme = themePreset ?? NEUTRAL_THEME;
  const layout = layoutChoice ?? "FULLCARD";
  const dims = SIZE_MAP[size];
  const scale = dims.width / 200; // scale relative to the base 200px small size

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground font-medium">Canli Onizleme</p>
      {/* Phone outer frame */}
      <div
        style={{
          width: dims.width + dims.border * 2,
          height: dims.height + dims.border * 2,
          borderRadius: dims.borderRadius + dims.border,
          backgroundColor: "#111111",
          padding: dims.border,
          boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Side button left */}
        <div
          style={{
            position: "absolute",
            left: -dims.border - 3,
            top: Math.round(dims.height * 0.22),
            width: 3,
            height: Math.round(dims.height * 0.07),
            backgroundColor: "#333",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -dims.border - 3,
            top: Math.round(dims.height * 0.32),
            width: 3,
            height: Math.round(dims.height * 0.1),
            backgroundColor: "#333",
            borderRadius: "2px 0 0 2px",
          }}
        />
        {/* Side button right */}
        <div
          style={{
            position: "absolute",
            right: -dims.border - 3,
            top: Math.round(dims.height * 0.28),
            width: 3,
            height: Math.round(dims.height * 0.13),
            backgroundColor: "#333",
            borderRadius: "0 2px 2px 0",
          }}
        />

        {/* Screen */}
        <div
          style={{
            width: dims.width,
            height: dims.height,
            borderRadius: dims.borderRadius - 2,
            overflow: "hidden",
            position: "relative",
            backgroundColor: theme.colors.bgColor,
          }}
        >
          {/* Status bar */}
          <div
            style={{
              height: Math.round(24 * scale),
              backgroundColor: theme.colors.primaryColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: `0 ${Math.round(12 * scale)}px`,
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#ffffff", fontSize: Math.round(7 * scale), opacity: 0.8 }}>
              9:41
            </span>
            <div style={{ display: "flex", gap: Math.round(3 * scale), alignItems: "center" }}>
              <div style={{ width: Math.round(10 * scale), height: Math.round(5 * scale), border: "1px solid rgba(255,255,255,0.6)", borderRadius: 1, position: "relative" }}>
                <div style={{ position: "absolute", left: 1, top: 1, bottom: 1, width: "70%", backgroundColor: "rgba(255,255,255,0.7)", borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* Notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: Math.round(60 * scale),
              height: Math.round(20 * scale),
              backgroundColor: "#111111",
              borderRadius: `0 0 ${Math.round(12 * scale)}px ${Math.round(12 * scale)}px`,
              zIndex: 10,
            }}
          />

          <div style={{ height: `calc(100% - ${Math.round(24 * scale)}px)`, overflow: "hidden" }}>
            <PhoneContent
              layoutChoice={layout}
              colors={theme.colors}
              businessName={businessName}
              businessTagline={businessTagline}
              scale={scale}
            />
          </div>
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
  const scale = 0.75; // scale relative to base size

  return (
    <div
      style={{
        width: 120,
        height: 190,
        borderRadius: 16,
        border: "3px solid #1a1a1a",
        overflow: "hidden",
        background: theme.colors.bgColor,
        flexShrink: 0,
        position: "relative",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: 14,
          backgroundColor: theme.colors.primaryColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px",
        }}
      >
        <span style={{ color: "#fff", fontSize: 5, opacity: 0.8 }}>9:41</span>
        <div style={{ width: 8, height: 4, border: "1px solid rgba(255,255,255,0.5)", borderRadius: 1 }}>
          <div style={{ width: "60%", height: "100%", backgroundColor: "rgba(255,255,255,0.6)", borderRadius: 1 }} />
        </div>
      </div>
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 32,
          height: 10,
          backgroundColor: "#1a1a1a",
          borderRadius: "0 0 6px 6px",
          zIndex: 10,
        }}
      />
      <div style={{ height: "calc(100% - 14px)", overflow: "hidden" }}>
        <PhoneContent
          layoutChoice={layoutChoice}
          colors={theme.colors}
          businessName="Kafe"
          businessTagline="Hos geldiniz"
          scale={scale}
        />
      </div>
    </div>
  );
}
