"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { OnboardingWizard } from "@/components/onboarding/wizard";

export default function NewBusinessPage() {
  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Yeni Isletme</h1>
          <p className="text-base text-muted-foreground">
            Adim adim menunuzu olusturun
          </p>
        </div>
      </div>

      <OnboardingWizard />
    </div>
  );
}
