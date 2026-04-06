"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building2, MapPin, Clock, Phone, Mail, Lock } from "lucide-react";

export interface BusinessInfo {
  name: string;
  tagline: string;
  location: string;
  hours: string;
  phone: string;
}

export interface OwnerInfo {
  ownerName: string;
  ownerEmail: string;
  ownerPassword: string;
}

interface StepInfoProps {
  businessInfo: BusinessInfo;
  onBusinessInfoChange: (info: BusinessInfo) => void;
  ownerInfo: OwnerInfo;
  onOwnerInfoChange: (info: OwnerInfo) => void;
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}

function FormField({ id, label, required, icon, hint, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function StepInfo({
  businessInfo,
  onBusinessInfoChange,
  ownerInfo,
  onOwnerInfoChange,
}: StepInfoProps) {
  const handleBusiness =
    (key: keyof BusinessInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onBusinessInfoChange({ ...businessInfo, [key]: e.target.value });
    };

  const handleOwner =
    (key: keyof OwnerInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onOwnerInfoChange({ ...ownerInfo, [key]: e.target.value });
    };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Isletme bilgilerinizi girin</h2>
        <p className="text-base text-muted-foreground mt-1">
          Musteri menusunde gorunecek bilgileri doldurun.
        </p>
      </div>

      {/* Owner account card */}
      <Card className="shadow-sm border-border/60">
        <CardHeader className="pb-4 pt-5">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            Isletme Sahibi
          </CardTitle>
          <p className="text-xs text-muted-foreground">Panele giris yaparken kullanacaginiz bilgiler</p>
        </CardHeader>
        <CardContent className="space-y-5 pb-5">
          <FormField
            id="ownerName"
            label="Ad Soyad"
            required
            icon={<User className="w-3.5 h-3.5" />}
          >
            <Input
              id="ownerName"
              value={ownerInfo.ownerName}
              onChange={handleOwner("ownerName")}
              placeholder="Ahmet Yilmaz"
              className="h-12 text-base"
              required
            />
          </FormField>
          <FormField
            id="ownerEmail"
            label="E-posta"
            required
            icon={<Mail className="w-3.5 h-3.5" />}
          >
            <Input
              id="ownerEmail"
              type="email"
              value={ownerInfo.ownerEmail}
              onChange={handleOwner("ownerEmail")}
              placeholder="ahmet@ornek.com"
              className="h-12 text-base"
              required
            />
          </FormField>
          <FormField
            id="ownerPassword"
            label="Sifre"
            required
            icon={<Lock className="w-3.5 h-3.5" />}
            hint="En az 8 karakter kullanin"
          >
            <Input
              id="ownerPassword"
              type="password"
              value={ownerInfo.ownerPassword}
              onChange={handleOwner("ownerPassword")}
              placeholder="••••••••"
              className="h-12 text-base"
              required
            />
          </FormField>
        </CardContent>
      </Card>

      {/* Business info card */}
      <Card className="shadow-sm border-border/60">
        <CardHeader className="pb-4 pt-5">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            Isletme Bilgileri
          </CardTitle>
          <p className="text-xs text-muted-foreground">Musteri menusunde gorunecek bilgiler</p>
        </CardHeader>
        <CardContent className="space-y-5 pb-5">
          <FormField
            id="businessName"
            label="Isletme Adi"
            required
            icon={<Building2 className="w-3.5 h-3.5" />}
          >
            <Input
              id="businessName"
              value={businessInfo.name}
              onChange={handleBusiness("name")}
              placeholder="Kafe Adim"
              className="h-12 text-base"
              required
            />
          </FormField>
          <FormField
            id="tagline"
            label="Slogan"
            icon={<span className="text-xs font-bold italic">&ldquo;</span>}
            hint="Menunun ust kisminda kucuk bir tanitim cumlesi gorunur."
          >
            <Input
              id="tagline"
              value={businessInfo.tagline}
              onChange={handleBusiness("tagline")}
              placeholder="En iyi kahvenin adresi"
              className="h-12 text-base"
            />
          </FormField>
          <FormField
            id="location"
            label="Adres"
            required
            icon={<MapPin className="w-3.5 h-3.5" />}
          >
            <Input
              id="location"
              value={businessInfo.location}
              onChange={handleBusiness("location")}
              placeholder="Bagdat Cad. No:45, Kadikoy, Istanbul"
              className="h-12 text-base"
              required
            />
          </FormField>
          <FormField
            id="hours"
            label="Calisma Saatleri"
            required
            icon={<Clock className="w-3.5 h-3.5" />}
          >
            <Input
              id="hours"
              value={businessInfo.hours}
              onChange={handleBusiness("hours")}
              placeholder="Her gun 08:00 - 22:00"
              className="h-12 text-base"
              required
            />
          </FormField>
          <FormField
            id="phone"
            label="Telefon"
            icon={<Phone className="w-3.5 h-3.5" />}
          >
            <Input
              id="phone"
              type="tel"
              value={businessInfo.phone}
              onChange={handleBusiness("phone")}
              placeholder="0212 555 00 00"
              className="h-12 text-base"
            />
          </FormField>
        </CardContent>
      </Card>
    </div>
  );
}
