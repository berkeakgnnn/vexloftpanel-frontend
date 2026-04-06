# Onboarding Wizard — Tasarım Spesifikasyonu

## Özet

Yeni müşteri için step-by-step menü oluşturma wizard'ı. Her adımda tek karar, görsel kartlarla seçim, teknik terim yok. +40 yaş, sıfır teknik bilgi kitlesi için.

## Akış

Owner ilk login olduğunda veya henüz işletmesi olmadığında wizard'a yönlendirilir.

### Step 1: Kart Yapısı Seçimi
**Başlık:** "Menünüz nasıl görünsün?"
**Alt başlık:** "Ürünlerinizin müşteriye nasıl gösterileceğini seçin"

4 seçenek, her biri telefon mockup'ı olarak gösterilir:

1. **Fotoğraflı Kartlar** → Backend: layoutType=FULLCARD, category layout=DEFAULT
   - Telefon mockup: büyük fotoğraf + isim + fiyat + açıklama
   - Altında: "Fotoğraflı Kartlar" yazısı

2. **Liste** → Backend: layoutType=LIST, category layout=CHALKBOARD
   - Telefon mockup: isim...noktalı çizgi...fiyat satırları
   - Altında: "Liste Görünümü" yazısı

3. **Küçük Kartlar** → Backend: layoutType=GRID, category layout=GRID
   - Telefon mockup: 2 sütun küçük kartlar, fotoğraf + isim + fiyat
   - Altında: "Küçük Kartlar" yazısı

4. **Karma** → Backend: layoutType=HYBRID
   - Telefon mockup: üstte liste (içecekler), altta fotoğraflı kartlar (yemekler)
   - Altında: "Karma Görünüm" yazısı

Seçilen kartın etrafında indigo border + checkmark.

### Step 2: Tema Seçimi
**Başlık:** "Bir tema seçin"
**Alt başlık:** "İşletmenize en uygun renk ve stili seçin"

Seçilen layout'a göre 5 hazır tema paketi gösterilir. Her paket = renk paleti + font kombinasyonu. Her biri telefon mockup'ında Step 1'deki layout ile render edilir:

**Tema paketleri (tüm layout'lar için geçerli):**

1. **Sıcak Klasik**
   - bg: #faf6f0, primary: #3e2723, accent: #8d6346, text: #2c1810, muted: #8d7b6a
   - fontHeading: Playfair Display, fontBody: Inter
   - Krem arka plan, kahverengi tonlar

2. **Koyu Lüks**
   - bg: #0a0a0a, primary: #111111, accent: #c9a96e, text: #f5f0eb, muted: #555555
   - fontHeading: Cormorant Garamond, fontBody: Inter
   - Siyah arka plan, altın aksan

3. **Modern Temiz**
   - bg: #ffffff, primary: #18181b, accent: #3b82f6, text: #18181b, muted: #71717a
   - fontHeading: DM Sans, fontBody: DM Sans
   - Beyaz, mavi aksan, sans-serif

4. **Doğal Sıcak**
   - bg: #1c1714, primary: #231e1a, accent: #d4a04a, text: #f2e8d5, muted: #6a5a4a
   - fontHeading: Georgia, fontBody: Inter
   - Koyu ahşap tonları, amber aksan

5. **Ferah Pastel**
   - bg: #f8faf8, primary: #1a3a2a, accent: #4ade80, text: #1a1a1a, muted: #6b7280
   - fontHeading: Nunito, fontBody: Inter
   - Açık yeşil tonlar, ferah

Seçilen temanın etrafında indigo border + checkmark.

### Step 3: İşletme Bilgileri
**Başlık:** "İşletmenizi tanımlayın"
**Alt başlık:** "Bu bilgiler menünüzde görünecek"

Form alanları:
- İşletme adı (zorunlu)
- Slogan (opsiyonel, ör: "Specialty Coffee & More")
- Lokasyon (zorunlu, ör: "Kadıköy, İstanbul")
- Çalışma saatleri (zorunlu, ör: "09:00 – 22:00")
- Telefon (opsiyonel)

Sağ tarafta veya altta canlı preview: seçilen layout + tema + girilen bilgilerle.

### Step 4: Tamamlandı
**Başlık:** "Menünüz hazır!"
**Alt başlık:** "Şimdi ürünlerinizi ekleyerek menünüzü tamamlayın"

Tam ekran telefon preview'ı — seçilen her şeyin birleşimi.
İki büyük buton:
- "Menüyü Düzenle" → `/businesses/[slug]/menu`
- "Daha Sonra" → `/businesses/[slug]` (overview)

## Canlı Preview

Her adımda sağ tarafta (desktop) veya altta (mobil) telefon çerçevesinde canlı preview gösterilir.

- Step 1'de: seçilen layout ile örnek veriler
- Step 2'de: seçilen layout + seçilen tema renkleri ile
- Step 3'te: layout + tema + girilen işletme bilgileri ile
- Step 4'te: tam preview

Preview her zaman gerçek zamanlı güncellenir — seçim değişince anında yansır.

## UI Tasarım

- Progress bar üstte: 4 adım, mevcut adım indigo
- İleri/Geri butonlar altta
- İleri butonu: indigo gradient, büyük (h-12)
- Geri butonu: outline, büyük
- Seçenek kartları: büyük (min 200px yükseklik), border-2 seçilince, hover efekti
- Tüm text minimum 14px, başlıklar 24px+
- Mobilde kartlar dikey, 2 sütun grid
- Desktop'ta kartlar yatay, 4 sütun

## Backend Entegrasyonu

Wizard tamamlandığında:
1. `POST /businesses` — işletme oluştur (name, slug, template=CUSTOM)
2. `PUT /businesses/:slug/theme` — seçilen tema paketini uygula
3. `PUT /businesses/:slug/info` — girilen bilgileri kaydet
4. Örnek kategoriler oluşturulabilir (opsiyonel — boş menü de olabilir)

layoutType tema içinde saklanır (BusinessTheme.layoutType). Kategori layout'ları sonradan kategori bazında ayarlanır.

## Routing

```
app/(panel)/onboarding/page.tsx    — Wizard sayfası (tek sayfa, adımlar state ile yönetilir)
```

Dashboard'da kontrol: kullanıcı OWNER + işletmesi yoksa → `/onboarding` redirect.

## Dosya Yapısı

```
components/onboarding/
├── wizard.tsx              — Ana wizard container (step state, ileri/geri)
├── step-layout.tsx         — Step 1: layout seçimi kartları
├── step-theme.tsx          — Step 2: tema seçimi kartları
├── step-info.tsx           — Step 3: işletme bilgileri formu
├── step-complete.tsx       — Step 4: tamamlandı ekranı
├── layout-preview.tsx      — Telefon preview (layout + tema + bilgi ile render)
├── progress-bar.tsx        — Üstteki 4 adım progress göstergesi
└── theme-presets.ts        — 5 tema paketi verisi (renkler, fontlar)
```
