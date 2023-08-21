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

  function openSidePanel() {
    sidePanel.style.width = "100%";
    menuIcon.classList.add("fa-xmark");
  }

  function closeSidePanel() {
    sidePanel.style.width = "0";
    menuIcon.classList.remove("fa-xmark");
  }

  function toggleMenu() {
    if (!menuIcon.classList.contains("fa-xmark")) {
      openSidePanel();
    } else {
      closeSidePanel();
    }
  }

  function handleMenuBtnClick(e) {
    e.stopPropagation();
    toggleMenu();
  }

  function handleWindowResize() {
    if (window.innerWidth > 769) {
      sidePanel.style.width = "0";
      menuIcon.classList.remove("fa-xmark");
    }
  }

  function handleWindowClick(e) {
    const isClickInsideExcludedArea = areasToExclude.some((area) =>
      area.contains(e.target)
    );

    if (!isClickInsideExcludedArea && menuIcon.classList.contains("fa-xmark")) {
      if (sidePanel.style.width === "0px") {
        openSidePanel();
      } else {
        closeSidePanel();
      }
    }
  }

  menuBtn.addEventListener("click", handleMenuBtnClick);
  window.addEventListener("resize", handleWindowResize);
  window.addEventListener("click", handleWindowClick);
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
      html.style.transition = "background-color ease-in-out 1s";
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
