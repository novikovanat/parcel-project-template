(() => {
  const menuBtnRef = document.querySelector('[data-product-button]');
  const mobileMenuRef = document.querySelector('[data-produc-menu]');

  menuBtnRef.addEventListener('click', event => {
    menuBtnRef.classList.toggle('btn-open');

    mobileMenuRef.classList.toggle('product-open');

    event.stopPropagation();
  });

  mobileMenuRef.addEventListener('click', event=> {
    event.stopPropagation();

  });

  document.addEventListener('click', ()=> {

    menuBtnRef.classList.remove('btn-open');
    mobileMenuRef.classList.remove('product-open');
  });

})();