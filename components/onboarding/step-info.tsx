"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Isletme bilgilerinizi girin</h2>
        <p className="text-base text-muted-foreground mt-1">
          Musteri menusunde gorunecek bilgileri doldurun.
        </p>
      </div>

      {/* Owner section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Sahip Hesabi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ownerName" className="text-sm font-medium">
              Ad Soyad <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ownerName"
              value={ownerInfo.ownerName}
              onChange={handleOwner("ownerName")}
              placeholder="Ahmet Yilmaz"
              className="h-12"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ownerEmail" className="text-sm font-medium">
              E-posta <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ownerEmail"
              type="email"
              value={ownerInfo.ownerEmail}
              onChange={handleOwner("ownerEmail")}
              placeholder="ahmet@ornek.com"
              className="h-12"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ownerPassword" className="text-sm font-medium">
              Sifre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ownerPassword"
              type="password"
              value={ownerInfo.ownerPassword}
              onChange={handleOwner("ownerPassword")}
              placeholder="En az 8 karakter"
              className="h-12"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Business info section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Isletme Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="businessName" className="text-sm font-medium">
              Isletme Adi <span className="text-red-500">*</span>
            </Label>
            <Input
              id="businessName"
              value={businessInfo.name}
              onChange={handleBusiness("name")}
              placeholder="Kafe Adim"
              className="h-12"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tagline" className="text-sm font-medium">
              Slogan
            </Label>
            <Input
              id="tagline"
              value={businessInfo.tagline}
              onChange={handleBusiness("tagline")}
              placeholder="En iyi kahvenin adresi"
              className="h-12"
            />
            <p className="text-sm text-muted-foreground">
              Menunun ust kisminda kucuk bir tanitim cumlesi gorunur.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="location" className="text-sm font-medium">
              Adres <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              value={businessInfo.location}
              onChange={handleBusiness("location")}
              placeholder="Bagdat Cad. No:45, Kadikoy, Istanbul"
              className="h-12"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hours" className="text-sm font-medium">
              Calisma Saatleri <span className="text-red-500">*</span>
            </Label>
            <Input
              id="hours"
              value={businessInfo.hours}
              onChange={handleBusiness("hours")}
              placeholder="Her gun 08:00 - 22:00"
              className="h-12"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm font-medium">
              Telefon
            </Label>
            <Input
              id="phone"
              type="tel"
              value={businessInfo.phone}
              onChange={handleBusiness("phone")}
              placeholder="0212 555 00 00"
              className="h-12"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
