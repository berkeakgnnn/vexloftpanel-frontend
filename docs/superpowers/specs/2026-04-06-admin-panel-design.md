# Vexloft Panel — Admin Frontend Tasarım Spesifikasyonu (Faz 2)

## Özet

Multi-tenant QR menü yönetim paneli frontend'i. Next.js 15, shadcn/ui, Tailwind. İki rol: ADMIN (tüm işletmeleri yönetir, yeni işletme + owner oluşturur) ve OWNER (kendi işletmesini yönetir). Canlı preview'lı tema editörü. Coolify deploy.

## Tech Stack

- **Framework:** Next.js 15 App Router
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **State:** React Query (TanStack Query) — server state
- **Auth:** JWT token, httpOnly cookie veya localStorage
- **Drag & Drop:** dnd-kit
- **Color Picker:** react-colorful
- **Deploy:** Coolify (Dockerfile)

## Backend API

Base URL: `http://x8csko0g4skcc4gokkso48g4.95.216.199.224.sslip.io` (env variable olarak)

Tüm endpoint'ler mevcut ve çalışıyor:
- Auth: register, login, refresh, me, change-password
- Business: CRUD + ownership
- Theme: GET/PUT
- Categories: CRUD + reorder
- Menu Items: CRUD + reorder
- Business Info: GET/PUT
- Upload: POST multipart
- Public: GET /public/:slug

## Sayfa Yapısı & Routing

```
app/
├── (auth)/
│   └── login/page.tsx              — Login sayfası
├── (panel)/
│   ├── layout.tsx                  — Sidebar + content layout
│   ├── dashboard/page.tsx          — Admin: tüm işletmeler + stats, Owner: yönlendirme
│   ├── businesses/
│   │   ├── page.tsx                — İşletme listesi (admin only)
│   │   └── new/page.tsx            — Yeni işletme + owner oluştur (admin only)
│   └── businesses/
│       └── [slug]/
│           ├── page.tsx            — İşletme overview
│           ├── menu/page.tsx       — Menü yönetimi (kategoriler + ürünler)
│           ├── theme/page.tsx      — Tema editörü (canlı preview)
│           ├── info/page.tsx       — İşletme bilgileri
│           └── settings/page.tsx   — İşletme ayarları
├── layout.tsx                      — Root layout
└── globals.css
```

## Roller & Erişim

### ADMIN (Vexloft — sen)
- Dashboard: tüm işletmelerin listesi, istatistikler
- İşletmeler sayfası: liste, yeni oluştur, düzenle, sil
- Yeni işletme: owner user oluştur + işletme oluştur + default tema
- Her işletmenin menü/tema/bilgi/ayar sayfalarına erişim

### OWNER (müşteri — işletme sahibi)
- Login sonrası otomatik `/businesses/[kendi-slug]` yönlendirme
- Sadece kendi işletmesinin sayfalarına erişim
- Menü, tema, bilgi yönetimi
- İşletme silme/oluşturma yetkisi yok

## Sayfalar Detay

### Login Sayfası
- Minimal, ortada kart
- Email + şifre input
- "Vexloft Panel" başlık
- Login sonrası: admin → /dashboard, owner → /businesses/[slug]
- JWT token localStorage'da tutulur

### Dashboard (Admin)
- Stat kartları: toplam işletme, aktif menü, toplam ürün, toplam kategori
- İşletme tablosu: isim, slug, şablon badge, durum (aktif/pasif), sahip email
- "Yeni İşletme" butonu → /businesses/new
- Tablo satırı tıklanınca → /businesses/[slug]

### Dashboard (Owner)
- Otomatik redirect → /businesses/[kendi-slug]

### İşletme Listesi (Admin Only)
- DataTable: arama, filtreleme (şablon, durum)
- Columns: isim, slug, şablon, durum, sahip, tarih
- Row actions: düzenle, sil, menüye git

### Yeni İşletme (Admin Only)
- Form 2 bölüm:
  1. Owner bilgileri: email, şifre, isim (yeni user oluşturur)
  2. İşletme bilgileri: isim, slug (otomatik generate), şablon seçimi
- Şablon seçince default tema otomatik uygulanır
- Oluştur → API'ye register + create business

### İşletme Overview (/businesses/[slug])
- İşletme ismi, şablon, durum
- Hızlı linkler: Menü, Tema, Bilgiler, Ayarlar
- Son aktivite / özet bilgiler
- "Menüyü Görüntüle" butonu → public menü URL'sine link

### Menü Yönetimi (/businesses/[slug]/menu)
- **Kategoriler:**
  - Accordion listesi, drag & drop ile sıralama (dnd-kit)
  - Her kategori: isim (TR/EN), layout tipi, banner image, aktif/pasif
  - Ekle: Dialog/Sheet ile form
  - Düzenle: aynı dialog
  - Sil: onay dialog'u
- **Ürünler (kategori içinde):**
  - Liste, drag & drop sıralama
  - Her ürün: thumbnail, isim, fiyat, durum
  - Ekle: Sheet ile form (isim TR/EN, açıklama TR/EN, fiyat, görsel upload, badges)
  - Düzenle: aynı sheet
  - Sil: onay dialog'u
  - Görsel upload: dosya seçici, preview, API'ye upload

### Tema Editörü (/businesses/[slug]/theme)
- **Sol panel (ayarlar, ~300px):**
  - Renkler section: 7 renk picker (bg, primary, accent, card, text, muted, border)
  - Fontlar section: heading + body font dropdown (Google Fonts listesi)
  - Layout section: 4 seçenek kartı (FULLCARD, LIST, GRID, HYBRID) — tıklanabilir
  - Hero image + Logo upload
  - Custom CSS textarea (opsiyonel, collapsible)
  - "Kaydet" butonu
- **Sağ panel (canlı preview):**
  - iframe veya component render ile menünün gerçek görünümü
  - Tema değişikliği anlık yansır (local state, kaydetmeden)
  - Mobil telefon çerçevesi içinde preview
  - Preview URL: public endpoint'ten veri çeker

### İşletme Bilgileri (/businesses/[slug]/info)
- Form: tagline, established, lokasyon (TR/EN), saatler (TR/EN), telefon, website, instagram
- Kaydet butonu

### İşletme Ayarları (/businesses/[slug]/settings)
- İsim, slug düzenleme
- Şablon değiştirme
- Aktif/pasif toggle
- QR kod generate ve indirme
- "Menüyü Görüntüle" link
- Danger zone: işletmeyi sil (admin only)

## Component Yapısı

```
components/
├── layout/
│   ├── sidebar.tsx             — Sol sidebar (logo, nav, user info)
│   ├── mobile-nav.tsx          — Mobil hamburger menu
│   └── page-header.tsx         — Sayfa başlığı + breadcrumb
├── auth/
│   └── login-form.tsx          — Email + şifre form
├── dashboard/
│   ├── stat-card.tsx           — İstatistik kartı (ikon + değer + label)
│   └── business-table.tsx      — İşletme tablosu
├── business/
│   ├── business-form.tsx       — Yeni işletme + owner formu
│   └── business-card.tsx       — İşletme özet kartı
├── menu/
│   ├── category-list.tsx       — Kategori accordion listesi
│   ├── category-form.tsx       — Kategori ekle/düzenle dialog
│   ├── menu-item-list.tsx      — Ürün listesi (kategori içinde)
│   ├── menu-item-form.tsx      — Ürün ekle/düzenle sheet
│   └── image-upload.tsx        — Görsel yükleme component
├── theme/
│   ├── theme-editor.tsx        — Sol panel (tüm ayarlar)
│   ├── color-picker-field.tsx  — Label + color picker
│   ├── font-selector.tsx       — Font dropdown
│   ├── layout-selector.tsx     — Layout tipi kartları
│   └── theme-preview.tsx       — Sağ panel (canlı preview iframe)
└── shared/
    ├── confirm-dialog.tsx      — Silme onay dialog'u
    └── loading-skeleton.tsx    — Skeleton loader
```

## Lib / Utilities

```
lib/
├── api.ts                      — Fetch wrapper (base URL, auth header, error handling)
├── auth.ts                     — Login, logout, getToken, isAuthenticated
├── hooks/
│   ├── use-auth.ts             — Auth state hook
│   ├── use-businesses.ts       — React Query hooks for businesses
│   ├── use-categories.ts       — React Query hooks for categories
│   ├── use-menu-items.ts       — React Query hooks for menu items
│   ├── use-theme.ts            — React Query hooks for theme
│   └── use-business-info.ts    — React Query hooks for business info
└── utils.ts                    — Slug generate, format helpers
```

## Auth Flow

1. User login → API'den accessToken + refreshToken alır
2. Token localStorage'a kaydedilir
3. Her API isteğinde Authorization: Bearer {token} header'ı
4. Token expire olunca refresh endpoint'i ile yenilenir
5. Refresh de expire olunca login'e redirect
6. Middleware ile protected route'lar kontrol edilir

## UI/UX Detayları

- **shadcn/ui:** Button, Card, Dialog, Sheet, Table, Input, Select, Tabs, Badge, Avatar, DropdownMenu, Skeleton, Toast, AlertDialog
- **Lucide icons:** LayoutDashboard, Store, Palette, UtensilsCrossed, Settings, Plus, Pencil, Trash2, GripVertical, Upload, Eye, LogOut, ChevronRight
- **Toast notifications:** Kayıt başarılı (yeşil), hata (kırmızı), uyarı (sarı)
- **Loading:** Skeleton loader her sayfada
- **Responsive:** Mobilde sidebar Sheet olarak açılır, tablolar scroll
- **Drag & drop:** dnd-kit ile smooth sıralama animasyonu
- **Color picker:** react-colorful küçük popup

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://x8csko0g4skcc4gokkso48g4.95.216.199.224.sslip.io
```

## Deploy

- Ayrı GitHub repo: `vexloftpanel-frontend`
- Coolify'da ayrı uygulama, Dockerfile build
- Şimdilik sslip.io URL, sonra `panel.vexloft.com`
