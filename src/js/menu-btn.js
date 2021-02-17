(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const menuBtnCl = document.querySelector('[data-menu-close]');
  const mobileMenuRef = document.querySelector('[data-menu]');
  const menuLinks = document.querySelectorAll('.header-link');


  menuBtnRef.addEventListener('click', event => {
    menuBtnRef.classList.toggle('is-open');

    mobileMenuRef.classList.toggle('is-open');
    event.stopPropagation();

  });


  mobileMenuRef.addEventListener('click', event => {
    event.stopPropagation();

  });


  menuBtnCl.addEventListener('click', () => {

    menuBtnCl.classList.toggle('is-open');

    mobileMenuRef.classList.toggle('is-open');

  });

  menuLinks.forEach(function(link) {
    link.addEventListener('click', () => {
      mobileMenuRef.classList.remove('is-open');
    });
  });

  document.addEventListener('click', event => {

    menuBtnRef.classList.remove('is-open');
    mobileMenuRef.classList.remove('is-open');
    menuBtnCl.classList.remove('is-open');

  });

})();