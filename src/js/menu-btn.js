(() => {
  const menuBtnRef = document.querySelector("[data-menu-button]");
  const menuBtnCl = document.querySelector("[data-menu-close]");
  const mobileMenuRef = document.querySelector("[data-menu]");

  menuBtnRef.addEventListener("click", () => {
    const expanded =
      menuBtnRef.classList.toggle("is-open");

    mobileMenuRef.classList.toggle("is-open");

  })

   menuBtnCl.addEventListener("click", () => {
    const expanded =
      menuBtnCl.classList.toggle("is-open");

    mobileMenuRef.classList.toggle("is-open");

  })

})();