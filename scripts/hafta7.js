document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Tema Değiştirme İşlemi
    const btnTema = document.getElementById('btnTema');
    const htmlElement = document.documentElement;

    btnTema.addEventListener('click', function() {
        const mevcutTema = htmlElement.getAttribute('data-bs-theme');
        
        if (mevcutTema === 'light') {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            btnTema.textContent = 'Açık Temaya Geç';
            btnTema.classList.remove('btn-outline-dark');
            btnTema.classList.add('btn-outline-light');
        } else {
            htmlElement.setAttribute('data-bs-theme', 'light');
            btnTema.textContent = 'Koyu Temaya Geç';
            btnTema.classList.remove('btn-outline-light');
            btnTema.classList.add('btn-outline-dark');
        }
    });

    // 2. Form İşlemleri ve Gelişmiş Doğrulama
    const form = document.getElementById('kayitFormu');
    const formUyari = document.getElementById('formUyari');
    const sonucAlani = document.getElementById('sonucAlani');
    const btnTemizle = document.getElementById('btnTemizle');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Sayfanın yenilenmesini engeller

        // Form elemanlarını referans al
        const adSoyadEl = document.getElementById('adSoyad');
        const epostaEl = document.getElementById('eposta');
        const bolumEl = document.getElementById('bolum');
        const sinifEl = document.getElementById('sinif');
        const oturumEl = document.getElementById('oturum');
        const katilimEl = document.getElementById('katilim');
        const onayEl = document.getElementById('onay');
        const mesajEl = document.getElementById('mesaj'); // Mesaj alanı zorunlu değil

        // Zorunlu metin/seçim alanlarını bir dizide toplayalım
        const zorunluAlanlar = [adSoyadEl, epostaEl, bolumEl, sinifEl, oturumEl, katilimEl];
        let formGecerli = true;

        // Her bir zorunlu alanı kontrol et
        zorunluAlanlar.forEach(el => {
            if (!el.value.trim()) {
                el.classList.add('is-invalid'); // Boşsa kırmızı yap
                formGecerli = false;
            } else {
                el.classList.remove('is-invalid'); // Doluysa kırmızılığı kaldır
            }
        });

        // Checkbox onayını ayrıca kontrol et
        if (!onayEl.checked) {
            onayEl.classList.add('is-invalid');
            formGecerli = false;
        } else {
            onayEl.classList.remove('is-invalid');
        }

        // Eğer geçerli olmayan (boş) alan varsa işlemi durdur
        if (!formGecerli) {
            formUyari.classList.remove('d-none');
            return;
        }

        // Hata yoksa uyarıyı gizle ve değerleri değişkenlere ata
        formUyari.classList.add('d-none');
        
        const adSoyad = adSoyadEl.value.trim();
        const eposta = epostaEl.value.trim();
        const bolum = bolumEl.value.trim();
        const sinif = sinifEl.value;
        const oturum = oturumEl.value;
        const katilim = katilimEl.value;
        const mesaj = mesajEl.value.trim();

        // Özet HTML'i oluştur
        const ozetHTML = `
            <div class="card border-success shadow-sm text-start">
                <div class="card-header bg-success text-white">
                    <h4 class="mb-0"><i class="bi bi-check-circle"></i> Başvuru Başarıyla Alındı!</h4>
                </div>
                <div class="card-body">
                    <h5 class="card-title text-success">Sayın ${adSoyad},</h5>
                    <p class="card-text"><strong>${oturum}</strong> etkinliği için <strong>${katilim}</strong> katılım talebiniz alınmıştır.</p>
                    <hr>
                    <div class="row">
                        <div class="col-sm-6">
                            <ul class="list-unstyled mb-0">
                                <li><strong>E-posta:</strong> ${eposta}</li>
                                <li><strong>Bölüm:</strong> ${bolum}</li>
                                <li><strong>Sınıf:</strong> ${sinif}</li>
                            </ul>
                        </div>
                        <div class="col-sm-6">
                            <div class="p-2 bg-light rounded h-100 text-dark">
                                <strong>Mesajınız:</strong><br>
                                ${mesaj ? mesaj : '<em>Mesaj bırakılmadı.</em>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Sonuç alanına yazdır
        sonucAlani.innerHTML = ozetHTML;
        sonucAlani.className = "mt-4"; 
        
        // Sonuca yumuşak kaydırma
        document.getElementById('sonuc').scrollIntoView({ behavior: 'smooth' });
    });

    // Formu temizle butonuna basıldığında kırmızı çerçeveleri ve uyarıları da temizle
    btnTemizle.addEventListener('click', function() {
        formUyari.classList.add('d-none');
        
        // Tüm is-invalid sınıflarını formdaki elemanlardan kaldır
        const hataliElemanlar = form.querySelectorAll('.is-invalid');
        hataliElemanlar.forEach(el => el.classList.remove('is-invalid'));

        // Sonuç alanını sıfırla
        sonucAlani.className = "alert alert-info rounded-4 p-4 text-center";
        sonucAlani.innerHTML = "Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.";
    });
});