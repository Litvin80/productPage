// document.querySelector('[data-js-expandable-content-button]')
//   ?.addEventListener('click', () => {
//     const root = document.querySelector('[data-js-expandable-content]')
//     const { offsetHeight, scrollHeight } = root

//     root.classList.add('is-expanded')

//     root.animate([
//       { maxHeight: `${offsetHeight}px` },
//       { maxHeight: `${scrollHeight}px` }
//     ], {
//       duration: 500,
//       easing: 'ease'
//     }).onfinish = () => {
//       root.style.maxHeight = `${scrollHeight}px`
//     }
//   })


document.addEventListener('DOMContentLoaded', () => {
  const selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]',
    promoContainer: '[data-js-header-promo]',
  };

  const stateClasses = {
      isActive: 'is-active',
      isLock: 'is-lock',
  };

  const rootElement = document.querySelector(selectors.root);
  const overlayElement = rootElement.querySelector(selectors.overlay);
  const burgerButtonElement = rootElement.querySelector(selectors.burgerButton);
  const promoContainer = rootElement.querySelector(selectors.promoContainer);

  function onBurgerButtonClick() {
      burgerButtonElement.classList.toggle(stateClasses.isActive);
      overlayElement.classList.toggle(stateClasses.isActive);
      promoContainer.classList.toggle(stateClasses.isActive);
      document.documentElement.classList.toggle(stateClasses.isLock);
  }

  burgerButtonElement.addEventListener('click', onBurgerButtonClick);

  // =============================
  // Swiper Init
  // =============================

  const swiperTumbs = new Swiper('.mySwiperTumbs', {
    spaceBetween: 18,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'vertical',
  })

  const swiper = new Swiper('.mySwiper', {
    spaceBetween: 2,
    thumbs: {
      swiper: swiperTumbs,
    },
    breakpoints: {
    0: {
      direction: 'horizontal',
      navigation: {
        nextEl: '.main-slider__button-next',
        prevEl: '.main-slider__button-prev',
      },
    },
    767.98: {
      direction: 'vertical',
      navigation: {
        nextEl: '.aside-slider__button-next',
        prevEl: '.aside-slider__button-prev',
      },
    },
  },
  });

  // =============================
  // Marquee Init
  // =============================

  function initMarquee() {
    const container = document.querySelector('[data-js-marquee]');
    const track = document.querySelector('.partners__track');
    const inner = track.querySelector('.partners__list');

    const speed = 40;

    if(!inner.dataset.cloned) {
      const originalCards = Array.from(inner.children);
      const totalWidth = inner.scrollWidth;
      const containerWidth = container.offsetWidth;

      while (totalWidth < containerWidth * 2) {
        originalCards.forEach(card => {
          inner.appendChild(card.cloneNode(true));
        })
        totalWidth = inner.scrollWidth;
      }

      inner.dataset.cloned = 'true';
    }

    const updateAnimation = () => {
      const totalWidth = inner.scrollWidth / 2;
      const duration = totalWidth / speed;
      inner.style.animationName = 'marquee';
      inner.style.animationDuration = `${duration}s`;
    }

    updateAnimation();
    window.addEventListener('resize', updateAnimation);
  }
  initMarquee();

  // =============================
  // Accordion (Mobile Only)
  // =============================

  function accordion() {
    if (window.innerWidth >= 767.98) return;
    const titles = document.querySelectorAll('[data-js-accordion-title]');
    const contents = document.querySelectorAll('[data-js-accordion-content]');

    titles.forEach(item => item.addEventListener('click', () => {
      const activeContent = document.querySelector('#' + item.dataset.tab);

      if (activeContent.classList.contains('is-active')) {
        activeContent.classList.remove('is-active');
        item.classList.remove('is-active');
        activeContent.style.maxHeight = 0;
      } else {
        activeContent.classList.remove('is-active');
        activeContent.style.maxHeight = 0;

        item.classList.remove('is-active');

        item.classList.add('is-active');
        activeContent.classList.add('is-active');
        activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
      }
    }));
  }
  accordion();

});


