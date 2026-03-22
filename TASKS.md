# EngiBin — Görev Listesi (PRD 1.0.0’den türetildi)

Kaynak: `engibin.md`

---

## Faz 0 — Proje ve altyapı

| ID | Görev | Notlar |
|----|--------|--------|
| P0-1 | ~~Next.js projesi oluştur (App Router), TypeScript~~ | `web/` — Next 15 + TS |
| P0-2 | ~~Tailwind CSS kur ve temel tema (endüstriyel dashboard hissi)~~ | `web/src/app/globals.css` |
| P0-3 | ~~Firebase projesi: Firestore + Auth + Storage yapılandır~~ | `web/src/lib/firebase.ts` + `.env.example` |
| P0-4 | Vercel’e bağla; ortam değişkenleri ve güvenli secret yönetimi | `.env.example` + `engines`; Vercel’de Root `web`, `NEXT_PUBLIC_*` ekle |
| P0-5 | ~~Firestore güvenlik kuralları: `users` / `bins` erişim modeli~~ | `firebase/firestore.rules` (+ Storage) |

---

## Faz 1 — Kimlik ve kullanıcı

| ID | Görev | Notlar |
|----|--------|--------|
| A1 | ~~Firebase Auth ile Google ile giriş (OAuth)~~ | `/login` + `auth-client` |
| A2 | ~~Oturum durumu ve korumalı rotalar (middleware / layout)~~ | `AuthProvider` + `dashboard/layout` istemci koruması |
| A3 | ~~`users` koleksiyonu: `uid` → `name`, `email` senkronizasyonu~~ | `sync-user-profile.ts` |

---

## Faz 2 — Saklama kutusu (Container / Bin)

| ID | Görev | Notlar |
|----|--------|--------|
| B1 | Bin CRUD: oluştur, listele, düzenle, sil | `bins` dokümanı |
| B2 | Bin alanları: `userId`, `label`, `qrContent` (benzersiz içerik / id) | Şema §5 |
| B3 | Dinamik QR kod üretimi (kutu başına); yazdırılabilir görünüm | PRD §3.1 |
| B4 | QR içeriğinin URL veya deep link ile tarama sonrası doğru bin’e yönlendirmesi | |

---

## Faz 3 — Parça envanteri (CRUD + stok)

| ID | Görev | Notlar |
|----|--------|--------|
| C1 | Bin içinde `components` dizisi: ekle, oku, güncelle, sil | Şema §5 |
| C2 | Parça alanları: `name`, `stock`, `type`, `voltage`, `pinoutImage`, `datasheet` | |
| C3 | Stok durumu etiketleri: “Azalıyor”, “Tükendi”, “Arızalı” (ve eşik/mantık) | PRD §3.1 |
| C4 | Dashboard’da bin listesi ve içerik özeti | User journey |

---

## Faz 4 — QR tarama (hızlı erişim)

| ID | Görev | Notlar |
|----|--------|--------|
| S1 | `html5-qrcode` ile tarayıcı tabanlı kamera okuma | PRD §4 |
| S2 | Mobil uyumlu “Scan” akışı: okuma → ilgili bin detay sayfası | User journey adım 4 |
| S3 | Erişilebilirlik: klavye / alternatif giriş (manuel kod girişi opsiyonel) | |

---

## Faz 5 — Mühendislik modülleri (fark yaratan)

| ID | Görev | Notlar |
|----|--------|--------|
| M1 | Interactive Pinout Visualizer: dahili kütüphane (hedef: popüler ~50 parça, örn. ESP32, L7805) | PRD §3.2 |
| M2 | Datasheet Cloud: PDF’leri Storage’da saklama; parçadan tek tıkla açma | PRD §3.2, şema `datasheet` |
| M3 | BOM Sihirbazı: projeye parça ayırma → envanterden stok düşümü / rezervasyon akışı | PRD §3.2 |

---

## Faz 6 — Kalite ve canlıya alma

| ID | Görev | Notlar |
|----|--------|--------|
| Q1 | Temel E2E veya kritik akış testleri (giriş, bin oluştur, parça ekle, QR oku) | |
| Q2 | Performans: Firestore sorgu indeksleri, liste sayfalama | |
| Q3 | Üretim kontrol listesi: Firestore kuralları, Storage CORS, Vercel domain | |

---

## Öncelik özeti (MVP sırası)

1. P0 → A1–A3 → B1–B4 → C1–C4 → S1–S2  
2. Ardından M1 → M2 → M3 (paralel veya sırayla ekip kapasitesine göre)

---

*Son güncelleme: PRD v1.0.0 ile hizalı.*
