# Devops Pipeline

## 🚀 Otomasyon Süreci

- Proje, GitHub'a yüklenmeden önce gereksiz dosyalardan ve eski git geçmişinden temizlendi.
- Proje için hem geliştirme hem de production ortamı için Dockerfile oluşturuldu.
- `.dockerignore` dosyası eklendi.
- Uygulama, Docker ile port 3000 üzerinden çalışacak şekilde ayarlandı.
- `deployment.yaml` ve `service.yaml` dosyaları ile Kubernetes üzerinde deployment ve servis tanımları yapıldı.
- NodePort ile dışarıdan erişim sağlandı.
- Jenkins ile GitHub entegrasyonu sağlandı.
- Her push sonrası otomatik olarak:
  - Kodun çekilmesi
  - Docker image'ın build edilmesi ve Docker Hub'a push edilmesi
  - Kubernetes deployment'ının güncellenmesi
- Menüde ve içerikte çeşitli metin değişiklikleri yapıldı (ör: "Dashboard" → "Ana Sayfa", "Kullanıcılar" → "Üyeler").
- Tüm değişiklikler commit'lenip GitHub'a pushlandı ve otomatik olarak canlıya alındı.

## 🚀 Temel Özellikler

- Modern ve duyarlı (responsive) tasarım
- Tailwind CSS ile geliştirilmiş kullanıcı arayüzü
- React Router ile sayfa yönetimi
- Framer Motion ile akıcı animasyonlar
- Headless UI bileşenleri
- Radix UI entegrasyonu
- Axios ile API istekleri

## 🛠️ Kullanılan Teknolojiler

- React 18
- Tailwind CSS
- Framer Motion
- Headless UI
- Radix UI
- Axios
- React Router DOM

## 📦 Projeyi Çalıştırma

1. Projeyi bilgisayarınıza indirin:

```bash
git clone [repo-url]
```

2. Gerekli paketleri yükleyin:

```bash
npm install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm start
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Klasör Yapısı

```
src/
├── components/     # Tekrar kullanılabilir arayüz bileşenleri
├── context/        # React context yapılandırmaları
├── lib/           # Yardımcı fonksiyonlar ve araçlar
├── pages/         # Sayfa bileşenleri
├── App.js         # Ana uygulama bileşeni
└── index.js       # Uygulama başlangıç noktası
```

## 🎨 Tasarım Özellikleri

- Tailwind CSS ile modern ve duyarlı tasarım
- Framer Motion ile akıcı animasyonlar
- Headless UI ve Radix UI ile erişilebilir bileşenler
