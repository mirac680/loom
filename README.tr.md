# Loom

**Fikirlerin birbirini bulduğu sakin bir not defteri.** Loom, notlar arasındaki ilişkileri canlı ve etkileşimli bir haritada gösteren, önce yerel çalışan bir not uygulamasıdır.

[English README](README.md)

![Loom logosu](icon.svg)

## Neden Loom?

Not biriktirmek kolay, eski fikirlerle yeniden bağ kurmak zor. Loom her nota bir yer açar; `[[başka bir notun başlığı]]` yazarak fikirleri birbirine bağlamanı sağlar. Bağlantılar, geri bağlantılar bölümünde ve etkileşimli fikir haritasında görünür. Defterin bu tarayıcıda saklanır; hesap, uzak veritabanı, analiz aracı veya API anahtarı gerekmez.

## Özellikler

- **Yerel saklama:** notlar ve tercihler bu cihazdaki tarayıcıda kalır.
- **Görsel fikir haritası:** haritayı taşı, yakınlaştır, notları sürükle ve bir düğüme tıklayarak notu aç.
- **Not bağlantıları:** `[[Not başlığı]]` yaz; Loom eşleşen notu açar veya yenisini oluşturur.
- **Geri bağlantılar:** okuduğun nota hangi notların bağlandığını gör.
- **Markdown:** başlıklar, listeler, alıntılar, satır içi kod, bağlantılar, kalın yazı ve daha fazlası. Temiz bir okuma görünümü için Önizleme'ye geç.
- **Hızlı arama:** başlık, metin ve etiketlerde ara; etiketlere veya sabitlenmiş notlara göre filtrele.
- **Verilerin senin:** defterini JSON olarak dışa aktar veya yedeğini içe aktar.
- **Çevrim dışı çalışma:** ilk açılıştan sonra uygulama dosyaları önbelleğe alınır; PWA olarak kurulabilir.
- **Rahat kullanım:** Türkçe ve İngilizce arayüz, koyu mod, duyarlı tasarım ve klavye kısayolları.
- **Bağımlılık yok:** uygulama tarayıcı API'lerini ve küçük bir Node.js sunucusunu kullanır. Derleme adımı gerekmez.

## Yerelde çalıştır

Node.js 18 veya daha yenisi gerekir. Bu klasörde şunu çalıştır:

```sh
npm start
```

Ardından [http://127.0.0.1:4173](http://127.0.0.1:4173) adresini aç. `server.mjs` yalnızca Node'un yerleşik modüllerini kullanır. Portu macOS/Linux'ta `PORT=8080 npm start`, PowerShell'de `$env:PORT=8080; npm start` ile değiştirebilirsin.

Klasörü başka bir yerel statik sunucuyla da sunabilirsin. `index.html` dosyasını doğrudan açmak düzenleme için yeterlidir; ancak service worker ve kurulabilir çevrim dışı destek için `localhost` veya HTTPS gerekir.

## GitHub Pages'te yayımla

Loom statik bir site olduğu için derleme adımı olmadan GitHub Pages'te barındırılabilir: klasörü bir depoya gönder, ardından **Settings → Pages** bölümünden yayımlayacağın dalı ve klasörü seç. `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest` ve `icon.svg` dosyalarını aynı yerde tut. Node.js sunucusu yalnızca yerel geliştirme içindir.

## Başlangıç

1. Sol menüden bir nota tıkla veya **Yeni not** düğmesini kullan.
2. Bir başlık ve isteğe bağlı virgülle ayrılmış etiketler ekle.
3. Markdown ile yaz. Başka bir fikre bağlanmak için `[[Not başlığı]]` kullan.
4. **Fikir haritası**'nı aç. Haritayı taşımak için sürükle, yakınlaştırmak için kaydır ve notu açmak için düğüme tıkla.
5. Defterini taşımak veya yedeklemek için menüden JSON olarak dışa aktar.

Loom, bağlantıları ve haritayı hemen görebilmen için üç örnek notla açılır. Kendi defterini kullanmaya başladığında bu notları silebilirsin.

## Klavye kısayolları

| Kısayol | Eylem |
| --- | --- |
| `Ctrl/⌘ + K` | Not aramasına git |
| `Ctrl/⌘ + N` | Yeni not oluştur |
| `Ctrl/⌘ + Shift + G` | Fikir haritasını aç |
| `Ctrl/⌘ + S` | Defteri hemen kaydet |
| `Ctrl/⌘ + B` | Seçili metni kalınlaştır |
| `Ctrl/⌘ + I` | Seçili metni italik yap |
| `Esc` | Haritayı veya mobil menüyü kapat |

## Veri ve gizlilik

Loom notları açık olan tarayıcı kaynağının `localStorage` alanında saklar. Dahil edilen sunucu yalnızca bu klasördeki dosyaları sunar, `127.0.0.1` adresinde çalışır ve not içeriğini almaz. Tarayıcı verilerini temizlemek, farklı bir tarayıcı veya adres kullanmak uygulamanın yerel kopyasını siler. Taşınabilir bir yedek için **Defteri dışa aktar** seçeneğini kullan. İçe aktarılan JSON, onayından sonra açık defterin yerini alır.

Tarayıcı depolaması şifrelenmez. Notların hassassa dışa aktardığın dosyaları güvenli bir yerde tut.

## Proje yapısı

```text
loom/
├── app.js                 # editör, depolama, Markdown, bağlantılar ve harita
├── styles.css             # duyarlı açık ve koyu temalar
├── index.html             # erişilebilir uygulama iskeleti
├── server.mjs             # bağımlılıksız yerel Node.js sunucusu
├── sw.js                  # çevrim dışı uygulama önbelleği
├── manifest.webmanifest   # kurulabilir PWA bilgileri
└── icon.svg               # uygulama simgesi
```

## Katkı

Hata bildirimleri ve odaklı özellik önerileri hoş karşılanır. [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına göz at. Loom'un derleme veya bağımlılık yükleme adımı yok; tarayıcı API'si işi görüyorsa bunu koruyalım.

## Lisans

MIT. Ayrıntılar için [LICENSE](LICENSE) dosyasına bak.
