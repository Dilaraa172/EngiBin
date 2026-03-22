# 🛠️ PRD: EngiBin (Smart Engineering Inventory & Pinout Guide)

**Hazırlayan:** Dilara  
**Rol:** Lead Full Stack Developer & Engineering Architect  
**Versiyon:** 1.0.0  

---

## 1. Ürün Vizyonu ve Problem Tanımı
### 1.1. Problem
Mühendislik atölyelerinde ve laboratuvarlarda, yüzlerce küçük bileşenin (dirençler, entegre devreler, modüller) yönetimi tam bir kaostur. Fiziksel etiketler kaybolur, bir parçanın teknik dökümanına (datasheet) ulaşmak vakit kaybıdır ve envanter takibi yapılmadığı için projeler "eksik parça" nedeniyle aksar.

### 1.2. Çözüm
**EngiBin**, fiziksel dünya ile dijital envanteri QR kodlar aracılığıyla birbirine bağlayan bir ekosistemdir. Mühendis, çekmecesindeki QR kodu okuttuğu anda o kutunun içinde ne olduğunu, parçaların pin dizilimlerini (pinout) ve çalışma voltajlarını anında görür.

---

## 2. Kullanıcı Deneyimi (User Journey)
1. **Kayıt/Giriş:** Kullanıcı Google hesabıyla saniyeler içinde giriş yapar.
2. **Kutu Oluşturma:** Uygulama üzerinden bir "Saklama Kutusu" (Container) oluşturur ve sistemin ürettiği benzersiz QR kodu yazdırıp kutusuna yapıştırır.
3. **Parça Ekleme:** Kutunun içine "Arduino Nano", "BMP280 Sensör" gibi parçaları, miktarları ve teknik notlarıyla birlikte ekler.
4. **Hızlı Erişim (Scan):** Atölyede çalışırken telefon kamerasını QR koda tutar; kutu içeriği ve parçaların kritik teknik detayları (Pinout şemaları) ekrana düşer.

---

## 3. Teknik Özellikler (MVP & Yenilikçi Fonksiyonlar)

### 3.1. Temel Fonksiyonlar
* **QR Generator & Scanner:** Her kutu için dinamik QR kod üretimi ve tarayıcı tabanlı okuma.
* **Envanter Takibi:** CRUD (Ekle, Oku, Güncelle, Sil) işlemleri ile parça yönetimi.
* **Stok Durumu:** "Azalıyor", "Tükendi", "Arızalı" gibi durum etiketleri.

### 3.2. Fark Yaratan Mühendislik Modülleri (90 Kişilik Liste İçin)
* **Interactive Pinout Visualizer:** En popüler 50 mühendislik parçasının (ESP32, L7805 vb.) ayak bağlantı şemalarını içeren dahili bir kütüphane.
* **Datasheet Cloud:** Parçaya ait PDF dökümanlarını bulutta saklama ve tek tıkla açma.
* **BOM (Bill of Materials) Sihirbazı:** Yeni bir projeye başlarken "Şu, şu ve şu parçaları bu projeye ayır" diyerek envanterden düşme özelliği.

---

## 4. Teknik Mimari (The Stack)

| Katman | Teknoloji | Fonksiyon |
| :--- | :--- | :--- |
| **Frontend** | React.js (Next.js) | Hızlı, SEO dostu ve modern arayüz. |
| **Styling** | Tailwind CSS | Endüstriyel ve temiz Dashboard tasarımı. |
| **Database** | Firebase Firestore | NoSQL yapı ile esnek parça özellikleri ve anlık veri. |
| **Auth** | Firebase Auth | Güvenli kullanıcı yönetimi. |
| **Kamera** | `html5-qrcode` | Web tabanlı QR tarama yeteneği. |
| **Deployment** | Vercel | Canlıya alım (CI/CD hatları ile). |

---

## 5. Veri Yapısı (Schema Design)

```json
{
  "users": {
    "uid": { "name": "Dilara", "email": "..." }
  },
  "bins": {
    "bin_id": {
      "userId": "uid",
      "label": "Sensör Kutusu 1",
      "qrContent": "bin_id_data",
      "components": [
        {
          "name": "DHT11",
          "stock": 12,
          "type": "Sensor",
          "voltage": "3.3V-5V",
          "pinoutImage": "url_to_storage",
          "datasheet": "url_to_pdf"
        }
      ]
    }
  }
}