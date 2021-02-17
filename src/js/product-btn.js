(() => {
  const menuBtnRef1 = document.querySelector('[data-product1-button]');
  const mobileMenuRef1 = document.querySelector('[data-produc1-menu]');

  menuBtnRef1.addEventListener('click', event => {
      menuBtnRef1.classList.toggle('btn-open');

    mobileMenuRef1.classList.toggle('product-open');

    event.stopPropagation();

  });
  mobileMenuRef1.addEventListener('click', event=> {
        event.stopPropagation();

  });
  document.addEventListener('click', () => {

    menuBtnRef1.classList.remove('btn-open');
    mobileMenuRef1.classList.remove('product-open');

  });

})();