import data from "./database.js";

function toggleClasses(element, classNames) {
  classNames.forEach((className) => {
    element.classList.toggle(className);
  });
}

function mobileMenu() {
  const header = document.querySelector("header");
  const menuBtn = document.querySelector("#menuMobile");
  const menuIcon = menuBtn.querySelector("i");
  const themeBtns = document.querySelector(".btnIcon");
  const sidePanel = document.querySelector(".header__categories--sidepanel");

  const areasToExclude = [header, themeBtns, sidePanel];

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!menuIcon.classList.contains("fa-xmark")) {
      sidePanel.style.width = "100%";
    } else {
      sidePanel.style.width = "0";
    }
    toggleClasses(menuIcon, ["fa-xmark"]);
  });

  window.addEventListener("click", (e) => {
    const isClickInsideExcludedArea = areasToExclude.some((area) =>
      area.contains(e.target)
    );

    if (!isClickInsideExcludedArea && menuIcon.classList.contains("fa-xmark")) {
      sidePanel.style.width = "0";
      toggleClasses(menuIcon, ["fa-xmark"]);
    }
  });
}

function themeMode() {
  const html = document.querySelector("html");
  const themeBtns = document.querySelectorAll(".btnIcon");

  themeBtns.forEach((btn) => {
    const themeIcon = btn.querySelector("i");
    btn.addEventListener("click", () => {
      toggleClasses(themeIcon, [
        "fa-moon",
        "fa-fade",
        "fa-sun",
        "fa-spin-pulse",
      ]);
      toggleClasses(html, ["dark"]);
      const isDarkMode =
        html.classList.contains("dark") &&
        themeIcon.classList.contains("fa-sun");

      localStorage.setItem(
        "@weartake:theme-mode",
        JSON.stringify({ mode: isDarkMode })
      );
    });

    const savedTheme = localStorage.getItem("@weartake:theme-mode");
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme);
      if (parsedTheme.mode) {
        html.classList.add("dark");
        if (!themeIcon.classList.contains("fa-sun")) {
          toggleClasses(themeIcon, [
            "fa-moon",
            "fa-fade",
            "fa-sun",
            "fa-spin-pulse",
          ]);
        }
      }
    }
  });
}

themeMode();
mobileMenu();
