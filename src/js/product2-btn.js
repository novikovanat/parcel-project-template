(() => {
  const menuBtnRef2 = document.querySelector('[data-product2-button]');
  const mobileMenuRef2 = document.querySelector('[data-produc2-menu]');

  menuBtnRef2.addEventListener('click', (event) => {

      menuBtnRef2.classList.toggle('btn-open');

    mobileMenuRef2.classList.toggle('product-open');
    event.stopPropagation();
  });

  mobileMenuRef2.addEventListener('click', event => {
    event.stopPropagation();

  });
  document.addEventListener('click', () => {

    menuBtnRef2.classList.remove('btn-open');
    mobileMenuRef2.classList.remove('product-open');
  });

})();