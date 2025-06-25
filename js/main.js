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
});
