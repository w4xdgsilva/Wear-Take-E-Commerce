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

function renderProducts(products) {
  const productsList = document.querySelector("#productsId");

  products.forEach((product) => {
    const productItem = createProductItem(product);

    productsList.appendChild(productItem);
  });
}

function createProductItem(product) {
  const productItem = document.createElement("div");
  productItem.classList.add("product-item__container");

  const productImage = document.createElement("img");
  productImage.classList.add("product-item__image");
  productImage.src = product.img;
  productImage.alt = product.nameItem;

  const productsTag = document.createElement("div");
  productsTag.classList.add("products-tags");

  product.tag.slice(0, 2).forEach((tag) => {
    const productTag = document.createElement("span");
    productTag.textContent = tag;

    productsTag.appendChild(productTag);
  });

  if (product.tag.length > 2) {
    const remainingTags = product.tag.length - 2;

    const remainingTagsSpan = document.createElement("span");
    remainingTagsSpan.textContent = `+${remainingTags}`;

    remainingTagsSpan.title = product.tag.slice(2).join(", ");

    productsTag.appendChild(remainingTagsSpan);
  }

  const productName = document.createElement("h2");
  productName.textContent = product.nameItem;

  const productDescription = document.createElement("p");
  productDescription.textContent = product.description;

  const productPrice = document.createElement("p");
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  productPrice.textContent = currency.format(product.value);

  const productAddToCartButton = document.createElement("button");
  productAddToCartButton.textContent = product.addCart;

  productItem.append(
    productImage,
    productsTag,
    productName,
    productDescription,
    productPrice,
    productAddToCartButton
  );

  return productItem;
}

renderProducts(data);
themeMode();
mobileMenu();
