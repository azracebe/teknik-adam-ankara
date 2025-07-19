document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle işlevi
    const initMobileMenu = () => {
        const menuToggle = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.classList.toggle('open');
                document.body.classList.toggle('menu-open');
            });
        }
    };

    // Floating CTA butonları
    const initFloatingCTA = () => {
        const floatingCTA = document.querySelector('.floating-cta');
        
        if (floatingCTA) {
            // Sayfa yüklendiğinde göster (gecikmeli)
            setTimeout(() => {
                floatingCTA.classList.add('visible');
            }, 800);
            
            // Scroll davranışı
            let isScrolling;
            window.addEventListener('scroll', function() {
                window.clearTimeout(isScrolling);
                isScrolling = setTimeout(() => {
                    floatingCTA.classList.toggle('visible', window.scrollY > 300);
                }, 50);
            }, { passive: true });
            
            // Buton etiketleri için aria-label ekle
            const ctaButtons = floatingCTA.querySelectorAll('a');
            ctaButtons.forEach(btn => {
                const icon = btn.querySelector('i');
                if (!icon) return;
                
                if (icon.classList.contains('fa-phone')) {
                    btn.setAttribute('aria-label', 'Hemen Ara');
                } else if (icon.classList.contains('fa-whatsapp')) {
                    btn.setAttribute('aria-label', 'WhatsApp ile Yazışın');
                } else if (icon.classList.contains('fa-telegram')) {
                    btn.setAttribute('aria-label', 'Telegram ile Yazışın');
                }
            });
        }
    };

    // Form gönderim işlemi
    const initForms = () => {
        const serviceForm = document.getElementById('serviceForm');
        if (serviceForm) {
            serviceForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const btn = this.querySelector('button[type="submit"]');
                if (!btn) return;
                
                const originalText = btn.textContent;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
                btn.disabled = true;
                
                try {
                    // Burada gerçek form gönderim işlemi yapılabilir
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Başarılı gönderim sonrası
                    const successMsg = document.createElement('div');
                    successMsg.className = 'form-success';
                    successMsg.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <span>Talep formunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.</span>
                    `;
                    serviceForm.parentNode.insertBefore(successMsg, serviceForm.nextSibling);
                    
                    serviceForm.reset();
                    setTimeout(() => successMsg.remove(), 5000);
                } catch (error) {
                    console.error('Form gönderim hatası:', error);
                } finally {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }
            });
        }
    };

    // Scroll animasyonları
    const initScrollAnimations = () => {
        const scrollElements = document.querySelectorAll('.service-card, .about-grid, .contact-grid, .hero-content');
        
        const checkVisibility = () => {
            scrollElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight * 0.75);
                el.classList.toggle('scrolled', isVisible);
            });
        };
        
        // İlk yüklemede ve scroll sırasında kontrol et
        checkVisibility();
        window.addEventListener('scroll', checkVisibility, { passive: true });
    };

    // Düzgün scroll için nav linkleri
    const initSmoothScroll = () => {
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Mobil menüyü kapat
                    const navMenu = document.getElementById('nav-menu');
                    const menuToggle = document.getElementById('mobile-menu');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('open');
                        document.body.classList.remove('menu-open');
                    }
                    
                    // Yumuşak scroll
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // URL'yi güncelle (sayfa yenilemeden)
                    history.pushState(null, null, targetId);
                }
            });
        });
    };

    // Tüm fonksiyonları başlat
    initMobileMenu();
    initFloatingCTA();
    initForms();
    initScrollAnimations();
    initSmoothScroll();

    // Sayfa boyutu değiştiğinde yeniden hesapla
    window.addEventListener('resize', () => {
        initScrollAnimations();
    }, { passive: true });
});