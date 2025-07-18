document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('open');
        });
    }

    // Floating CTA
    const floatingCTA = document.querySelector('.floating-cta');
    
    if (floatingCTA) {
        // Sayfa yüklendiğinde göster
        setTimeout(() => {
            floatingCTA.classList.add('visible');
        }, 1000);
        
        // Scroll davranışı
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
        });
        
        // Erişilebilirlik için aria-label ekle
        document.querySelectorAll('.floating-cta a').forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-phone')) {
                    btn.setAttribute('aria-label', 'Bizi Arayın');
                } else if (icon.classList.contains('fa-whatsapp')) {
                    btn.setAttribute('aria-label', 'WhatsApp ile Yazın');
                } else if (icon.classList.contains('fa-envelope')) {
                    btn.setAttribute('aria-label', 'E-posta Gönderin');
                }
            }
        });
    }

    // Form gönderimi
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = 'Gönderiliyor...';
                btn.disabled = true;

                setTimeout(function() {
                    alert('Talep formunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.');
                    serviceForm.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 1500);
            }
        });
    }

    // Scroll animasyonları
    const scrollElements = document.querySelectorAll('.service-card, .about-grid, .contact-grid');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    // Sayfa yüklendiğinde ve scroll yapıldığında animasyonları tetikle
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);

    // Yumuşak scroll için nav linkleri
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Mobil menüyü kapat
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('open');
                    }
                }
            }
        });
    });
});