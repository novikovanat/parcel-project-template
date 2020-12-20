(() => {
  const menuBtnRef1 = document.querySelector("[data-product1-button]");
  const mobileMenuRef1 = document.querySelector("[data-produc1-menu]");

  menuBtnRef1.addEventListener("click", () => {
    const expanded =
      menuBtnRef1.classList.toggle("btn-open");

    mobileMenuRef1.classList.toggle("product-open");

    
  })

})();