import data from "./database.js";

function toggleClasses(element, classNames) {
  classNames.forEach((className) => {
    element.classList.toggle(className);
  });
}

function mobileMenu() {
  const menuBtn = document.querySelector("#menuMobile");
  const menuIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", () => {
    toggleClasses(menuIcon, ["fa-xmark"]);
  });
}

function themeMode() {
  const html = document.querySelector("html");
  const themeBtn = document.querySelector("#themeBtn");
  const themeIcon = themeBtn.querySelector("i");

  const darkTheme = localStorage.getItem("@weartake: dark");

  themeBtn.addEventListener("click", () => {
    toggleClasses(themeIcon, ["fa-moon", "fa-fade", "fa-sun", "fa-spin-pulse"]);
  });
}

themeMode();
mobileMenu();
