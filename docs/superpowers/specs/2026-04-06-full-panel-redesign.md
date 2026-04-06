# Vexloft Panel — Full Redesign Spesifikasyonu

## Estetik Yon: Refined Luxury SaaS
- Temiz, sicak, guven veren, modern 2026
- Buyuk tipografi, bol beyaz alan, indigo aksan (#4338ca / #6366f1)
- Subtle gradient'lar, yumusak golgeler
- Font: DM Sans (body), ozel display font basliklar icin
- Her ekran amacina hizmet eder, gereksiz element yok
- +40 yas, sifir teknik bilgi icin optimize

## Navigasyon Yapisi

### Admin (Vexloft)
- SOL SIDEBAR kalir — coklu isletme yonetimi
- Dashboard: "Vexloft QR Menu Yonetim Paneline Hosgeldiniz, Berke"
- Isletme listesi, istatistikler, yeni isletme olustur
- Isletmeye tikladiginda owner view'a duser

### Owner (musteri)
- SIDEBAR YOK
- UST HEADER BAR: Logo + Isletme adi + Tab navigasyonu + profil
- Tabs: Menu (varsayilan) | Tema | Bilgiler | Ayarlar
- Sag ustte: "Menuyu Goruntule" butonu + profil dropdown
- Ilk giriste subtle karsilama banner'i (1 kez)

## Ekranlar

### 1. Login — Split Screen
- Sol yari: indigo-to-purple gradient + Vexloft logo buyuk + tagline + 3 feature bullet (ikon + text)
- Sag yari: beyaz bg, login formu, buyuk inputlar (h-12), gradient buton
- Responsive: mobilde sadece form (gradient bg)

### 2. Admin Dashboard
- Header: "Hosgeldiniz, Berke" (text-3xl) + tarih/saat
- Stat kartlari: 3 kart, renkli ust border, buyuk rakam, ikon
- Isletme kartlari: grid, her biri tiklabilir Card — isletme adi + sablon badge + "Yonet" butonu
- "Yeni Isletme Olustur" — buyuk gradient CTA kart
- Sidebar: Logo + Dashboard + Isletmeler nav + alt kisimda user info + logout

### 3. Owner Panel — Tab Layout
- Header bar (sticky, beyaz bg, subtle shadow):
  - Sol: Vexloft mini logo + isletme adi (bold)
  - Orta: Tab navigasyonu (Menu | Tema | Bilgiler | Ayarlar)
  - Sag: "Menuyu Goruntule" outline buton + Avatar dropdown (profil, cikis)
- Icerik alani: secili tab'a gore degisir
- Ilk giris banner: "Hosgeldiniz! Menunuzu asagidan yonetebilirsiniz." + Kapat (1 kez)

### 4. Menu Yonetimi (Owner — Menu tab'i)
- Kategoriler accordion listesi
- Her kategori basliginda: isim + urun sayisi badge + duzenle/sil ikonlari
- Acik kategoride urunler listesi:
  - Satir: [thumbnail 40px] [isim text-base] [FIYAT — tikla=inline edit] [duzenle ikonu] [sil ikonu]
  - Fiyat inline edit: tikla → input olur → Enter → kaydedildi (inline "Kaydedildi" yesil text)
  - Duzenle ikonu → Sheet aciilir (tum alanlar: isim TR/EN, aciklama TR/EN, fiyat, fotograf upload, badges)
  - Sil → AlertDialog onay → toast "Urun silindi"
- Kategori altinda: "+ Urun Ekle" butonu → Sheet
- "+ Kategori Ekle" butonu ust kisimda → Dialog
- Drag & drop siralama (dnd-kit)

### 5. Tema Editoru (Owner — Tema tab'i)
- Split layout: sol panel (ayarlar) + sag panel (telefon preview)
- Sol: renk picker'lar, font dropdown, layout secimi (gorsel kartlar), logo/hero upload
- Sag: gercek telefon cercevesinde canli preview
- Kaydet → toast "Tema guncellendi"

### 6. Bilgiler (Owner — Bilgiler tab'i)
- 2 sutun form: isletme bilgileri (isim, slogan, lokasyon, saatler, telefon, website, instagram)
- Kaydet → inline "Kaydedildi" + yesil check

### 7. Ayarlar (Owner — Ayarlar tab'i)
- Isletme URL/slug
- Aktif/pasif toggle — "Menunuz su an yayinda/yayinda degil" buyuk gosterge
- "Menuyu Yayinla" buyuk yesil buton (eger pasif ise)
- QR kod onizleme + indirme butonu
- Danger zone: hesabi sil (sadece admin gorunur)

### 8. Onboarding Wizard — Full Screen
- Panel layout'u DISINDA — kendi layout'u var
- Progress bar ustte
- Step 1 (Layout): ikon kartlar (sol) + buyuk telefon preview (sag)
- Step 2 (Tema): renk bar kartlari (sol) + preview (sag) + "Dilediginiz gibi ozellestirebilirsiniz" notu
- Step 3 (Bilgiler): form (sol) + preview (sag)
- Step 4 (Tamamlandi): buyuk preview ortada + CTA
- Ileri/geri butonlar sticky bottom

## Feedback Sistemi
- Buyuk aksiyonlar (silme, yayinlama): toast bildirim (buyuk, belirgin)
- Kucuk degisiklikler (fiyat guncelleme): inline feedback ("Kaydedildi" yesil text)
- Hatalar: toast kirmizi + inline form error

## Dosya Yapisi Degisiklikleri

### Yeni/degisen dosyalar:
- app/(auth)/login/page.tsx — split screen redesign
- app/(panel)/layout.tsx — admin sidebar layout (degismiyor, sadece admin icin)
- app/(panel)/dashboard/page.tsx — admin dashboard redesign
- app/(owner)/layout.tsx — YENi: owner tab layout (sidebar yok, header bar + tabs)
- app/(owner)/[slug]/page.tsx — YENI: owner ana sayfa (varsayilan: menu tab'i)
- app/(owner)/[slug]/menu/page.tsx — menu yonetimi (inline fiyat edit)
- app/(owner)/[slug]/theme/page.tsx — tema editoru
- app/(owner)/[slug]/info/page.tsx — bilgiler formu
- app/(owner)/[slug]/settings/page.tsx — ayarlar
- components/owner/header-bar.tsx — YENI: ust header + tab nav
- components/owner/tab-navigation.tsx — YENI: tab component
- components/owner/inline-price-edit.tsx — YENI: inline fiyat duzenleme
- components/owner/menu-category-accordion.tsx — YENI: kategori accordion
- components/owner/menu-item-row.tsx — YENI: urun satiri (inline edit + ikonlar)

### Korunan dosyalar:
- Onboarding wizard (son duzeltmeler korunur)
- lib/ hooks, api, auth (backend entegrasyonu korunur)
- shadcn/ui components

## Routing Degisikligi

Admin login → /dashboard (sidebar layout)
Owner login → /owner/[slug] (tab layout, sidebar yok)
Admin isletmeye tiklar → /owner/[slug] (tab layout'a gecer)

Dashboard'da owner tespiti: role===OWNER ise → redirect /owner/[slug]
