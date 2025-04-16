document.addEventListener('DOMContentLoaded', () => {
  // Animasyon sınıfları
  const animationClasses = {
    fadeIn: 'animate-fadeIn',
    fadeInUp: 'animate-fadeInUp',
    fadeInDown: 'animate-fadeInDown',
    fadeInLeft: 'animate-fadeInLeft',
    fadeInRight: 'animate-fadeInRight',
    zoomIn: 'animate-zoomIn',
    slideInUp: 'animate-slideInUp'
  };

  // Animasyon CSS stillerini ekle
  const style = document.createElement('style');
  style.textContent = `
    .animate-fadeIn {
      opacity: 0;
      transition: opacity 0.8s ease-in-out;
    }
    .animate-fadeIn.visible {
      opacity: 1;
    }
    
    .animate-fadeInUp {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-fadeInUp.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .animate-fadeInDown {
      opacity: 0;
      transform: translateY(-30px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-fadeInDown.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .animate-fadeInLeft {
      opacity: 0;
      transform: translateX(-30px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-fadeInLeft.visible {
      opacity: 1;
      transform: translateX(0);
    }
    
    .animate-fadeInRight {
      opacity: 0;
      transform: translateX(30px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-fadeInRight.visible {
      opacity: 1;
      transform: translateX(0);
    }
    
    .animate-zoomIn {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-zoomIn.visible {
      opacity: 1;
      transform: scale(1);
    }
    
    .animate-slideInUp {
      opacity: 0;
      transform: translateY(50px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-slideInUp.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Animasyon gecikmeleri */
    .delay-100 { transition-delay: 0.1s; }
    .delay-200 { transition-delay: 0.2s; }
    .delay-300 { transition-delay: 0.3s; }
    .delay-400 { transition-delay: 0.4s; }
    .delay-500 { transition-delay: 0.5s; }
    .delay-600 { transition-delay: 0.6s; }
    .delay-700 { transition-delay: 0.7s; }
    .delay-800 { transition-delay: 0.8s; }
  `;
  document.head.appendChild(style);

  // Intersection Observer oluştur
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Bir kere görüldükten sonra gözlemlemeyi durdur
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Elementin %10'u göründüğünde tetikle
    rootMargin: '0px 0px -50px 0px' // Viewport'un alt kısmından 50px önce tetikle
  });

  // Slider animasyonu
  const setupSlider = () => {
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
      const sliderWrapper = sliderContainer.querySelector('.slider-wrapper');
      const slides = sliderContainer.querySelectorAll('.slider-slide');
      const prevBtn = sliderContainer.querySelector('.slider-arrow.prev');
      const nextBtn = sliderContainer.querySelector('.slider-arrow.next');
      const dots = sliderContainer.querySelectorAll('.slider-dot');
      
      let currentIndex = 0;
      const slideCount = slides.length;
      
      // Slide'ları göster
      const goToSlide = (index) => {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        
        currentIndex = index;
        const offset = -currentIndex * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
        
        // Aktif dot'u güncelle
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
          dot.classList.toggle('bg-opacity-100', i === currentIndex);
          dot.classList.toggle('bg-opacity-50', i !== currentIndex);
        });
      };
      
      // Event listeners
      if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
      }
      
      // Dot'lara tıklama
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
      });
      
      // Otomatik slide değiştirme
      let interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
      
      // Kullanıcı etkileşiminde otomatik değiştirmeyi durdur ve yeniden başlat
      sliderContainer.addEventListener('mouseenter', () => clearInterval(interval));
      sliderContainer.addEventListener('mouseleave', () => {
        clearInterval(interval);
        interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
      });
    }
  };

  // Partner slider animasyonu
  const setupPartnerSlider = () => {
    const partnersSlider = document.querySelector('.partners-slider');
    if (partnersSlider) {
      const wrapper = partnersSlider.querySelector('.partners-wrapper');
      const slides = partnersSlider.querySelectorAll('.partner-slide');
      const prevBtn = partnersSlider.querySelector('.partners-arrow.prev');
      const nextBtn = partnersSlider.querySelector('.partners-arrow.next');
      
      if (!wrapper || slides.length === 0) return;
      
      const slideWidth = 200; // min-w-[200px]
      const visibleSlides = Math.floor(wrapper.clientWidth / slideWidth);
      let currentIndex = 0;
      const maxIndex = slides.length - visibleSlides;
      
      const updateSliderPosition = () => {
        const offset = -currentIndex * slideWidth;
        wrapper.style.transform = `translateX(${offset}px)`;
      };
      
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          currentIndex = Math.max(0, currentIndex - 1);
          updateSliderPosition();
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentIndex = Math.min(maxIndex, currentIndex + 1);
          updateSliderPosition();
        });
      }
    }
  };

 

  // Animasyon sınıflarını ekle
  const setupAnimations = () => {
    // Ana sayfa animasyonları
    document.querySelectorAll('.slider-container').forEach(el => {
      el.classList.add(animationClasses.fadeIn);
      observer.observe(el);
    });

    // Hakkımda bölümü
    document.querySelectorAll('h1.text-4xl').forEach(el => {
      el.classList.add(animationClasses.fadeInLeft);
      observer.observe(el);
    });

    document.querySelectorAll('p.text-gray-700').forEach(el => {
      el.classList.add(animationClasses.fadeInRight, 'delay-200');
      observer.observe(el);
    });

    // Hizmetler bölümü
    document.querySelectorAll('section h2.text-3xl').forEach(el => {
      el.classList.add(animationClasses.fadeInUp);
      observer.observe(el);
    });

    document.querySelectorAll('.grid.grid-cols-1 > div').forEach((el, index) => {
      el.classList.add(animationClasses.fadeInUp, `delay-${(index + 1) * 200}`);
      observer.observe(el);
    });

    // Danışmanlık bölümü
    document.querySelectorAll('.flex.flex-col.md\\:flex-row.items-center.bg-white').forEach(el => {
      el.classList.add(animationClasses.zoomIn);
      observer.observe(el);
    });

    // Ücretsiz danışmanlık bölümü
    document.querySelectorAll('.bg-gradient-to-r').forEach(el => {
      el.classList.add(animationClasses.fadeIn);
      observer.observe(el);
    });

    // Süreç bölümü
    document.querySelectorAll('.flex.items-center.mb-16').forEach((el, index) => {
      el.classList.add(animationClasses.fadeInLeft, `delay-${index * 100}`);
      observer.observe(el);
    });

    // Referanslar bölümü
    document.querySelectorAll('.partner-slide').forEach((el, index) => {
      el.classList.add(animationClasses.fadeInUp, `delay-${index * 100}`);
      observer.observe(el);
    });

    // Hakkımda sayfası özel animasyonları
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
      el.classList.add(animationClasses.fadeInLeft, `delay-${index * 100}`);
      observer.observe(el);
    });

    document.querySelectorAll('.skill-bar').forEach((el, index) => {
      el.classList.add(animationClasses.fadeInRight, `delay-${index * 100}`);
      observer.observe(el);
    });
  };

  // Tüm kurulumları başlat
  setupSlider();
  setupPartnerSlider();
  setupMobileMenu();
  setupAnimations();
});