(() => {
  const menuBtnRef = document.querySelector("[data-product-button]");
  const mobileMenuRef = document.querySelector("[data-produc-menu]");

  menuBtnRef.addEventListener("click", () => {
    const expanded =
      menuBtnRef.classList.toggle("btn-open");

    mobileMenuRef.classList.toggle("product-open");

    
  })

})();