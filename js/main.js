// =============================
// Expandable Content
// =============================
function expandableContent() {
  const expandableButtons = document.querySelectorAll('[data-js-expandable-content-button]');

  expandableButtons.forEach((expandableButton) => {
    expandableButton?.addEventListener('click', () => {
      const root = expandableButton.closest('[data-js-expandable-content]');
      const { offsetHeight, scrollHeight } = root;

      root.classList.add('is-expanded');

      root.animate([
        { maxHeight: `${offsetHeight}px` },
        { maxHeight: `${scrollHeight}px` }
      ], {
        duration: 500,
        easing: 'ease'
      }).onfinish = () => {
        root.style.maxHeight = `${scrollHeight}px`;
      };
    });
  });
}

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

// =============================
// Dropdown
// =============================
function dropdown() {
  const dropdownButtons = document.querySelectorAll('[data-js-dropdown]');
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

  if (!isMobile) {
    // При переході на десктоп — прибрати класи і слухачі
    dropdownButtons.forEach((button) => {
      const dropdownContent = button.nextElementSibling;

      if (dropdownContent?.hasAttribute('data-js-dropdown-cont')) {
        button.classList.remove('is-active');
        dropdownContent.classList.remove('is-active');

        if (button._dropdownHandler) {
          button.removeEventListener('click', button._dropdownHandler);
          delete button._dropdownHandler;
        }
      }
    });
    return;
  }

  // Мобільна логіка: додати слухач, якщо ще не доданий
  dropdownButtons.forEach((button) => {
    const dropdownContent = button.nextElementSibling;

    if (dropdownContent?.hasAttribute('data-js-dropdown-cont') && !button._dropdownHandler) {
      const handler = () => {
        dropdownContent.classList.toggle('is-active');
        button.classList.toggle('is-active');
      };

      button._dropdownHandler = handler;
      button.addEventListener('click', handler);
    }
  });
}

// =============================
// Accordion (Mobile Only)
// =============================
const mediaQuery = window.matchMedia('(max-width: 767.98px)');
function accordion() {
  const titles = document.querySelectorAll('[data-js-accordion-title]');

  if (!mediaQuery.matches) {
    titles.forEach(item => {
      const activeContent = document.querySelector('#' + item.dataset.tab);
      if (item._accordionHandler) {
        item.removeEventListener('click', item._accordionHandler);
        delete item._accordionHandler;
      }
      item.classList.remove('is-active');
      activeContent?.classList.remove('is-active');
      if (activeContent) activeContent.style.maxHeight = '';
    });
    return;
  }

  titles.forEach(item => {
    if (item._accordionHandler) return;

    const handler = () => {
      const activeContent = document.querySelector('#' + item.dataset.tab);
      const isOpen = activeContent.classList.contains('is-active');

      document.querySelectorAll('[data-js-accordion-title]').forEach(i => {
        const content = document.querySelector('#' + i.dataset.tab);
        i.classList.remove('is-active');
        content?.classList.remove('is-active');
        if (content) content.style.maxHeight = 0;
      });

      if (!isOpen) {
        item.classList.add('is-active');
        activeContent.classList.add('is-active');
        activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
      }
    };

    item._accordionHandler = handler;
    item.addEventListener('click', handler);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // =============================
  // Menu Burger
  // =============================
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

  accordion();
  expandableContent();
  if (mediaQuery.matches) {
    dropdown();
  }
  window.matchMedia('(max-width: 767.98px)').addEventListener('change', () => {
    accordion();
    dropdown();
  });
  mediaQuery.addEventListener('change', () => {
    accordion();
    dropdown();
  });
});

window.addEventListener('load', () => {
  initMarquee();
})

