document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Form gönderimi
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Gönderiliyor...';
            btn.disabled = true;
            
            // Burada form verilerini işleyebilir veya AJAX gönderimi yapabilirsiniz
            // Örnek amaçlı setTimeout kullanıyoruz
            setTimeout(function() {
                alert('Talep formunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.');
                serviceForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Sayfa kaydırma animasyonları
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
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Sayfa yüklendiğinde görünür elemanları kontrol et
    handleScrollAnimation();

    // Düzgün kaydırma için nav linkleri
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Mobil menüyü kapat
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                }
            }
        });
    });
});