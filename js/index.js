let secProducts = document.querySelector(".cards");
let secCart = document.querySelector(".cartList");
let emptyCart = document.querySelector(".carrinhoVazio");
let priceTotal = document.querySelector(".totalPrice");
let inputSearch = document.querySelector("#pesquisar");
let btnSearch = document.querySelector("#btnPesquisar");

function listingProducts(listing, ul) {
  ul.innerHTML = "";

  for (let i = 0; i < listing.length; i++) {
    let product = listing[i];
    let createCard = createProductCard(product, ul);
    ul.appendChild(createCard);
  }
}

function searchProduct() {
  inputSearch.addEventListener("keyup", function () {
    let searchValue = inputSearch.value.toLowerCase();
    let filteredProducts = data.filter(function (product) {
      return (
        product.nameItem.toLowerCase().includes(searchValue) ||
        product.tag[0].toLowerCase().includes(searchValue)
      );
    });
    listingProducts(filteredProducts, secProducts);
  });
}

function filterByBtn() {
  let filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let category = this.innerText.toLowerCase();
      let filteredProducts;

      if (category === "todos") {
        filteredProducts = data;
      } else {
        filteredProducts = data.filter((product) =>
          product.tag[0].toLowerCase().includes(category)
        );
      }

      listingProducts(filteredProducts, secProducts);
    });
  });
}

searchProduct();
filterByBtn();

listingProducts(data, secProducts);

function createProductCard(products, cartProducts) {
  let idProduct = products.id;
  let image = products.img;
  let category = products.tag;
  let nameProduct = products.nameItem;
  let descProduct = products.description;
  let valueProduct = products.value;
  let addCart = products.addCart;

  let liClass = "";
  let figClass = "";
  let divClass = "";
  let tittleClass = "";
  let priceClass = "";
  let textBtn = "";
  let btnClass = "";
  let ctgrClass = "";

  let li = document.createElement("li");

  let fig = document.createElement("figure");
  let figImg = document.createElement("img");

  let div = document.createElement("div");
  let ctgr = document.createElement("span");
  let hTittle = document.createElement("h3");
  let pDesc = document.createElement("p");
  let sPrice = document.createElement("span");
  let btnAddCart = document.createElement("button");

  if (cartProducts.className == "cartList") {
    liClass = "cartCard";
    figClass = "cartCardImg";
    divClass = "cartCardTextBox";
    ctgrClass = "esconder";
    hTittle.classList.add("cartTittle");
    pDesc.classList.add("esconder");
    sPrice.classList.add("cartPrice");
    textBtn = "Remover do carrinho";
    btnAddCart.classList.add("cartrmv");
  } else {
    liClass = "card";
    figClass = "card-img";
    divClass = "card-desc";
    ctgrClass = "category";
    hTittle.classList.add("product", "text");
    pDesc.classList.add("description", "text");
    sPrice.classList.add("price", "text");
    textBtn = addCart;
    btnAddCart.classList.add("btnAddCart", "text");
  }

  li.classList.add(liClass);

  fig.classList.add(figClass);
  figImg.src = `./img/${image}`;
  figImg.alt = nameProduct;

  div.classList.add(divClass);

  ctgr.classList.add(ctgrClass);
  ctgr.innerText = category;

  hTittle.innerText = nameProduct;

  pDesc.innerText = descProduct;

  let valueForm = `R$ ${valueProduct.toFixed(2)}`;
  sPrice.innerText = valueForm.replace(".", ",");

  btnAddCart.innerText = textBtn;
  btnAddCart.id = idProduct;

  li.append(fig, div);
  fig.appendChild(figImg);
  div.appendChild(ctgr);
  div.appendChild(hTittle);
  div.appendChild(pDesc);
  div.appendChild(sPrice);
  div.appendChild(btnAddCart);

  return li;
}

secProducts.addEventListener("click", interceptingProduct);

let cart = [];

function interceptingProduct(event) {
  let btnBuy = event.target;

  if (btnBuy.tagName == "BUTTON") {
    emptyCart.classList.add("esconder");
    secCart.classList.remove("esconder");
    priceTotal.classList.remove("esconder");

    let idProduct = btnBuy.id;
    let product = data.find((product) => {
      if (product.id == idProduct) {
        return product;
      }
    });
    addCart(product);
  }
}

function addCart(product) {
  if (product !== undefined) {
    cart.push(product);
    listingProducts(cart, secCart);
    calcTotal(cart);
  }
}

secCart.addEventListener("click", interceptingCart);

function interceptingCart(event) {
  let btnRmv = event.target;
  if (btnRmv.tagName == "BUTTON") {
    let idProduct = btnRmv.id;
    let product = cart.find((product) => {
      if (product.id == idProduct) {
        return product;
      }
    });
    removeCart(product);
  }
}

function removeCart(product) {
  if (product !== undefined) {
    let ind = cart.indexOf(product);
    cart.splice(ind, 1);
    listingProducts(cart, secCart);
    calcTotal(cart);
    if (cart.length == 0) {
      emptyCart.classList.remove("esconder");
      secCart.classList.add("esconder");
      priceTotal.classList.add("esconder");
    }
  }
}

function calcTotal(cartList) {
  let total = 0;
  for (let i = 0; i < cartList.length; i++) {
    total += cartList[i].value;
  }
  document.querySelector(".pricetotal span").innerText = `R$ ${total
    .toFixed(2)
    .replace(".", ",")}`;
  document.querySelector(".qtdtotal span").innerText = cartList.length;

  return total;
}
