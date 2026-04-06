"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { ProgressBar } from "./progress-bar";
import { LayoutPreview } from "./layout-preview";
import { StepLayout } from "./step-layout";
import { StepTheme } from "./step-theme";
import { StepInfo } from "./step-info";
import { StepComplete } from "./step-complete";
import type { LayoutChoice, ThemePreset } from "./theme-presets";
import type { BusinessInfo, OwnerInfo } from "./step-info";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name: string; role: string };
}

interface BusinessResponse {
  id: string;
  slug: string;
  name: string;
}

const EMPTY_BUSINESS_INFO: BusinessInfo = {
  name: "",
  tagline: "",
  location: "",
  hours: "",
  phone: "",
};

const EMPTY_OWNER_INFO: OwnerInfo = {
  ownerName: "",
  ownerEmail: "",
  ownerPassword: "",
};

export function OnboardingWizard() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [layoutChoice, setLayoutChoice] = useState<LayoutChoice | null>(null);
  const [themePreset, setThemePreset] = useState<ThemePreset | null>(null);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(EMPTY_BUSINESS_INFO);
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo>(EMPTY_OWNER_INFO);
  const [loading, setLoading] = useState(false);

  // Determine whether "Ileri" button is enabled for each step
  const isStepValid = (s: number): boolean => {
    if (s === 0) return layoutChoice !== null;
    if (s === 1) return themePreset !== null;
    if (s === 2) {
      return (
        !!ownerInfo.ownerName &&
        !!ownerInfo.ownerEmail &&
        !!ownerInfo.ownerPassword &&
        !!businessInfo.name &&
        !!businessInfo.location &&
        !!businessInfo.hours
      );
    }
    return true;
  };

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      // 1. Register the owner account
      const registerData = await api<RegisterResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: ownerInfo.ownerEmail,
          password: ownerInfo.ownerPassword,
          name: ownerInfo.ownerName,
        }),
        auth: false,
      });

      const slug = slugify(businessInfo.name);

      // 2. Create the business
      const businessData = await api<BusinessResponse>("/businesses", {
        method: "POST",
        body: JSON.stringify({
          name: businessInfo.name,
          slug,
          template: "CUSTOM",
          ownerId: registerData.user.id,
        }),
      });

      const businessSlug = businessData.slug;

      // 3. Apply selected theme + layout
      if (themePreset) {
        await api(`/businesses/${businessSlug}/theme`, {
          method: "PUT",
          body: JSON.stringify({
            bgColor: themePreset.colors.bgColor,
            primaryColor: themePreset.colors.primaryColor,
            accentColor: themePreset.colors.accentColor,
            cardBgColor: themePreset.colors.cardBgColor,
            textColor: themePreset.colors.textColor,
            mutedTextColor: themePreset.colors.mutedTextColor,
            borderColor: themePreset.colors.borderColor,
            fontHeading: themePreset.fontHeading,
            fontBody: themePreset.fontBody,
            layoutType: layoutChoice ?? "FULLCARD",
          }),
        });
      }

      // 4. Save business info (location, hours, tagline, phone)
      await api(`/businesses/${businessSlug}/info`, {
        method: "PUT",
        body: JSON.stringify({
          tagline: businessInfo.tagline || null,
          locationTr: businessInfo.location,
          locationEn: businessInfo.location,
          hoursTr: businessInfo.hours,
          hoursEn: businessInfo.hours,
          phone: businessInfo.phone || null,
        }),
      });

      toast.success("Isletme olusturuldu");
      router.push(`/businesses/${businessSlug}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Bir hata olustu";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLater = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-[80vh]">
      <ProgressBar currentStep={step} />

      <div className="flex-1 flex flex-col lg:flex-row gap-8 mt-2">
        {/* Left: step content */}
        <div className="flex-1 min-w-0">
          {step === 0 && (
            <StepLayout value={layoutChoice} onChange={setLayoutChoice} />
          )}
          {step === 1 && (
            <StepTheme
              value={themePreset}
              onChange={setThemePreset}
              layoutChoice={layoutChoice}
            />
          )}
          {step === 2 && (
            <StepInfo
              businessInfo={businessInfo}
              onBusinessInfoChange={setBusinessInfo}
              ownerInfo={ownerInfo}
              onOwnerInfoChange={setOwnerInfo}
            />
          )}
          {step === 3 && (
            <StepComplete
              layoutChoice={layoutChoice}
              themePreset={themePreset}
              businessInfo={businessInfo}
              loading={loading}
              onConfirm={handleCreate}
              onLater={handleLater}
            />
          )}
        </div>

        {/* Right: live preview — hidden on mobile, hidden on final step (step 3 has its own preview) */}
        {step < 3 && (
          <div className="hidden lg:flex flex-col items-center justify-start pt-4 w-64 shrink-0">
            <LayoutPreview
              layoutChoice={layoutChoice}
              themePreset={themePreset}
              businessName={businessInfo.name}
              businessTagline={businessInfo.tagline}
            />
          </div>
        )}
      </div>

      {/* Navigation buttons (hidden on final step, which has its own buttons) */}
      {step < 3 && (
        <div className="flex items-center justify-between pt-8 border-t mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 0}
            className="h-11 px-6 text-base"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Geri
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepValid(step)}
            className="h-11 px-8 text-base font-semibold bg-gradient-to-r from-indigo-700 to-indigo-500 hover:from-indigo-800 hover:to-indigo-600 text-white border-0 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Lutfen bekleyin...
              </>
            ) : (
              <>
                Ileri
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
