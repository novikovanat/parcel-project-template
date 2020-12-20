(() => {
  const menuBtnRef2 = document.querySelector("[data-product2-button]");
  const mobileMenuRef2 = document.querySelector("[data-produc2-menu]");

  menuBtnRef2.addEventListener("click", () => {
    const expanded =
      menuBtnRef2.classList.toggle("btn-open");

    mobileMenuRef2.classList.toggle("product-open");

    
  })

})();