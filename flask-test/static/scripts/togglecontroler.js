var toggleContainer = document.querySelector("#toggle__container");
var toggleButton = document.querySelector("#toggle__button")
var mobileMenu = document.querySelector("#mobile__menu")

toggleButton.addEventListener("click", () =>
{
    toggleContainer.classList.toggle("open");
    toggleButton.classList.toggle("open");
    mobileMenu.classList.toggle("open");
});