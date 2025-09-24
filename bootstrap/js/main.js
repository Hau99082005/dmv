document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }

                // Đóng menu mobile sau khi click
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Hiệu ứng xuất hiện khi cuộn (fade-in, slide-in)
    const reveals = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealObserver.observe(el));

    const underlines = document.querySelectorAll('.underline-animate');
    const underlineObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    underlines.forEach(el => underlineObserver.observe(el));

    // Đóng menu mobile khi nhấn nút X
    const closeBtns = document.querySelectorAll('.btn-close');
    const navbarCollapse = document.getElementById('navbarNav');

    closeBtns.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            console.log('close btn clicked');
            if (!navbarCollapse) {
                console.error('Không tìm thấy #navbarNav');
                return;
            }
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
            bsCollapse.hide();
        });
    });

    const playBtn = document.querySelector('.play-button');
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.video-modal-close');
    const backdrop = document.querySelector('.video-modal-backdrop');
    const iframe = document.getElementById('videoModalIframe');
    let lastSrc = iframe ? iframe.src : '';

    function openModal() {
      if (modal) {
        modal.classList.add('active');
        if (iframe) {
          iframe.src = lastSrc; 
        }
        document.body.style.overflow = 'hidden';
      }
    }
    function closeModal() {
      if (modal) {
        modal.classList.remove('active');
        if (iframe) {
          iframe.src = '';
        }
        document.body.style.overflow = '';
      }
    }
    if (playBtn) playBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });

    document.addEventListener('DOMContentLoaded', function() {
      if (window.Swiper && document.querySelector('.mySwiper')) {
        new Swiper('.mySwiper', {
          slidesPerView: 'auto',
          spaceBetween: 16,
          loop: false,
          centeredSlides: false,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            0: { slidesPerView: 1, centeredSlides: true },
            576: { slidesPerView: 2, centeredSlides: false },
            768: { slidesPerView: 3, centeredSlides: false },
            1200: { slidesPerView: 5, centeredSlides: false }
          }
        });
      }
    });
});