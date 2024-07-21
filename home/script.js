import { getProductsFromLS } from "../shopping _cart/script.js";

window.addEventListener("load", renderPage);

// const PRODUCTS_JSON_URL = "";
const DEFAULT_RENDER_COUNT = 6;
const WISHLIST_KEY = "wishList";
const endDate = new Date("2024-07-31T23:59:59");
export let wishListProducts =
  JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];

export let getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

export let cartListProducts =
  JSON.parse(localStorage.getItem("cart-list"))?.filter(
    (item) => item.client == getCurrentUser.email
  ) || [];

export let getallProductFromLocalStorage =
  JSON.parse(localStorage.getItem("products")) || [];

// Fetch all products
export async function fetchProducts() {
  let products = [];
  fetch("../json_data/Products.json")
    .then((response) => response.json())
    .then((stored) => {
      let oldProducts = JSON.parse(localStorage.getItem("products"));
      if (oldProducts) {
        products = oldProducts;
      } else {
        products = stored;
        localStorage.setItem("products", JSON.stringify(stored));
      }
    });
}
// Create the product card
export function createProductCard(product, wishListProducts) {
  const card = document.createElement("div");
  card.classList.add(
    "card",
    "col-12",
    "col-md-6",
    "col-lg-3",
    "mx-auto",
    "position-relative"
  );

  card.appendChild(createImageElement(product.image));
  card.appendChild(createInfoElement(product));
  card.appendChild(createOptionsElement(product, wishListProducts));

  if (product.stock === 0) {
    card.style.filter = "blur(2px)";
    const messageStock = document.createElement("h5");
    messageStock.innerText = "Stock Out";
    messageStock.classList.add(
      "position-absolute",
      "top-50",
      "start-50",
      "translate-middle",
      "bg-danger",
      "text-white",
      "p-2",
      "z-5",
      "rounded"
    );
    card.appendChild(messageStock);
    card.style.pointerEvents = "none"; // Disable click events
  }

  // Add Intersection Observer animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const direction =
          entry.boundingClientRect.top < window.innerHeight / 2
            ? "slide-in-top"
            : "slide-in-bottom";
        card.classList.remove("slide-out-top", "slide-out-bottom");
        card.classList.add(direction);
      } else {
        const direction =
          entry.boundingClientRect.top < window.innerHeight / 2
            ? "slide-out-top"
            : "slide-out-bottom";
        card.classList.remove("slide-in-top", "slide-in-bottom");
        card.classList.add(direction);
      }
    });
  });

  observer.observe(card);

  return card;
}
//create image OF PRODUCT
export function createImageElement(imageSrc) {
  const imageContainer = document.createElement("div");
  const img = document.createElement("img");
  img.src = imageSrc;
  img.style.width = "100%";
  img.style.height = "200px";
  img.style.objectFit = "contain";

  imageContainer.appendChild(img);
  return imageContainer;
}

//create information of product
export function createInfoElement(product) {
  const info = document.createElement("a");
  info.href = `../product_details/product_details.html?category=${product.category}&id=${product.id}`;
  info.style.textDecoration = "none";

  const productName = document.createElement("p");
  productName.innerText = product.title.slice(0, 20);

  const contentPriceStock = document.createElement("div");
  contentPriceStock.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  const price = document.createElement("h4");

  price.innerText = `$${product.price}`;

  const stock = document.createElement("span");
  stock.classList.add("text-info");
  stock.innerText = `stock:${product.stock}`;

  const discount = document.createElement("div");
  const spanWriteDiscount = document.createElement("div");
  if (product.discount > 0) {
    spanWriteDiscount.classList.add(
      "text-black",
      "position-absolute",
      "top-50",
      "px-4",
      "py-2",
      "bg-warning"
    );
    spanWriteDiscount.style.transform = "rotate(30deg)";
    spanWriteDiscount.innerText = `${product.discount}% Discount`;
    info.appendChild(spanWriteDiscount);
    const spanPriceDiscount = document.createElement("span");
    spanPriceDiscount.classList.add("fs-5", "text-black");
    spanPriceDiscount.innerText = `$${
      product.price - ((product.price * product.discount) / 100).toFixed(2)
    }`;
    price.style.textDecoration = "line-through";
    price.style.fontSize = "18px";
    price.classList.add("text-danger");
    discount.appendChild(spanPriceDiscount);
  }

  contentPriceStock.appendChild(price);
  contentPriceStock.appendChild(stock);

  info.appendChild(productName);
  info.appendChild(contentPriceStock);
  info.appendChild(discount);
  return info;
}

//CREATE OPTIONS OF PRODUCT SUCH AS ADD TO WISHLIST AND ADD TO CART
export function createOptionsElement(product, wishListProducts) {
  const options = document.createElement("div");
  options.classList.add("fav_option");

  const heart = document.createElement("div");
  heart.classList.add("fa-heart", `heart-${product.id}`, "one_option");

  const isWishListed = wishListProducts.includes(product.id);

  heart.classList.add(isWishListed ? "fa-solid" : "fa-regular");

  heart.classList.add(isWishListed ? "heartFill" : "heartEmpty");

  heart.addEventListener("click", () => toggleWishList(product.id));

  const cart = document.createElement("div");
  cart.classList.add("fa-solid", "fa-cart-shopping", "one_option");
  //add to cart
  cart.addEventListener("click", () => addToCart(product.id));

  options.appendChild(heart);
  options.appendChild(cart);

  return options;
}
//RENDER PRODUCTS USED BY COUNT OF RENDER PRODUCT
export async function renderProducts(
  renderCount = DEFAULT_RENDER_COUNT,
  renderSection
) {
  const container = document.getElementById(renderSection);
  const productsToRender = getallProductFromLocalStorage.slice(0, renderCount);

  productsToRender.forEach((product) => {
    const pro = createProductCard(product, wishListProducts);
    container.appendChild(pro);
  });
}
// SELECT ALL CATEGORY IS UNIQUE
async function selectedCategory() {
  return [
    ...new Set(
      getallProductFromLocalStorage.map((product) => product.category)
    ),
  ];
}

//CREATE HEADER OF ALL SECTIONS
export function createHeading(text) {
  const header = document.createElement("div");
  header.classList.add("heading");

  for (let i = 0; i < 4; i++) {
    header.appendChild(document.createElement("div"));
  }

  const headingText = document.createElement("h1");
  headingText.classList.add("fs-2", "fw-bold", "text-center");
  headingText.innerText = text;

  header.appendChild(headingText);
  return header;
}

async function renderProductsByCategory() {
  const container = document.getElementById("all_sections");
  const categories = await selectedCategory();
  categories.slice(0, 3).forEach(async (category) => {
    const section = document.createElement("section");
    section.classList.add("category-section");

    section.appendChild(createHeading(category));

    const productContainer = document.createElement("div");
    productContainer.classList.add("row", "g-3", "fProdByCategory");

    const products = await fetchProductsByCategory(category);
    products.forEach((product) => {
      productContainer.appendChild(
        createProductCard(product, wishListProducts)
      );
    });

    section.appendChild(productContainer);
    container.appendChild(section);
  });
}

//FETCH ALL PRODUCT BY CATEGORY
export async function fetchProductsByCategory(category) {
  return getallProductFromLocalStorage.filter(
    (product) => product.category === category
  );
}

//RENDER GET ALL CATEGORIES
async function getAllCategory() {
  const categories = await selectedCategory();

  categories.forEach((category) => {
    const product = getallProductFromLocalStorage.find(
      (product) => product.category === category
    );
    if (product) createCategoryElement(product);
  });
}

//CREATE ONE CATEGORY ELEMENT
function createCategoryElement(product) {
  const container = document.getElementById("all_category");
  const categoryCard = document.createElement("div");
  categoryCard.classList.add("col-12", "col-md-6");

  const cardContent = document.createElement("div");
  cardContent.classList.add("cardCat", "bg-success-subtle");

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("contentInfo");

  const title = document.createElement("h4");
  title.innerText = product.category;
  infoContainer.appendChild(title);

  const description = document.createElement("p");
  description.innerText = `${product.description.slice(0, 80)}...`;
  infoContainer.appendChild(description);

  const moreLink = document.createElement("a");
  moreLink.innerText = "Show More Products";
  moreLink.classList.add("bg-warning-subtle");
  moreLink.href = `../shop_page/shop_page.html?category=${product.category}`;
  infoContainer.appendChild(moreLink);

  const imageContainer = document.createElement("div");
  const image = document.createElement("img");
  image.src = product.image;
  image.style.width = "100%";
  image.style.height = "100px";
  imageContainer.appendChild(image);

  cardContent.appendChild(infoContainer);
  cardContent.appendChild(imageContainer);
  categoryCard.appendChild(cardContent);
  container.appendChild(categoryCard);

  // Add Intersection Observer animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const direction =
          entry.boundingClientRect.top < window.innerHeight / 2
            ? "slide-in-top"
            : "slide-in-bottom";
        categoryCard.classList.remove("slide-out-top", "slide-out-bottom");
        categoryCard.classList.add(direction);
      } else {
        const direction =
          entry.boundingClientRect.top < window.innerHeight / 2
            ? "slide-out-top"
            : "slide-out-bottom";
        categoryCard.classList.remove("slide-in-top", "slide-in-bottom");
        categoryCard.classList.add(direction);
      }
    });
  });

  observer.observe(categoryCard);
}

//RENDER advertisement AS IMAGE
function renderAdder(imageUrl, imageUrl2, idSection) {
  const container = document.getElementById(idSection);
  container.innerHTML = "";

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("row", "g-3");

  // Check how many images are provided and set the column size accordingly
  if (imageUrl && imageUrl2) {
    imageContainer.appendChild(createImageDiv(imageUrl, "col-12", "col-lg-6"));
    imageContainer.appendChild(createImageDiv(imageUrl2, "col-12", "col-lg-6"));
  } else if (imageUrl) {
    imageContainer.appendChild(createImageDiv(imageUrl, "col-12"));
  }

  container.appendChild(imageContainer);
}

//CREATE IMAGE OF advertisement
function createImageDiv(imageUrl, ...colClasses) {
  const imageDiv = document.createElement("div");
  imageDiv.classList.add(...colClasses);

  const img = document.createElement("img");
  img.src = imageUrl;
  img.style.width = "100%";
  img.style.height = "300px";
  img.style.objectFit = "cover";

  imageDiv.appendChild(img);
  return imageDiv;
}

//RENDER GET ALL CATEGORY AS NAME OF CATEGORY
async function renderAllCategories() {
  const allCategoriesDiv = document.getElementById("all_categories");
  allCategoriesDiv.classList.toggle("show_all_cats");
  // allCategoriesDiv.classList.add("bg-warning-subtle");

  if (allCategoriesDiv.classList.contains("show_all_cats")) {
    const categories = await selectedCategory();
    allCategoriesDiv.innerHTML = "";

    categories.forEach((category) => {
      const link = document.createElement("a");
      // const categoryElement = document.createElement("div");
      link.href = `../shop_page/shop_page.html?category=${category}`;
      link.innerText = category;
      link.classList = "cat_link";
      link.style.textDecoration = "none";
      link.style.padding = "4px";

      // link.appendChild(categoryElement)
      allCategoriesDiv.appendChild(link);
    });
  } else {
    allCategoriesDiv.innerHTML = "";
  }
}

//SEARCH OF PRODUCT
export async function searchByProduct() {
  const searchInput = document.querySelector("[name='search_product_name']");
  const searchValue = searchInput.value.trim().toLowerCase();
  const searchResultsContainer = document.getElementById("contentResultSearch");
  // const firstLink = document.querySelector("#contentResultSearch a:nth-child(1)");
  // firstLink.style.marginTop = "510px";
  if (searchValue) {
    const matchingProducts = getallProductFromLocalStorage.filter((product) =>
      product.title.toLowerCase().includes(searchValue)
    );

    searchResultsContainer.classList.add("show_content_search");
    searchResultsContainer.innerHTML = "";

    matchingProducts.forEach((product) => {
      searchResultsContainer.appendChild(createSearchResultCard(product));
    });
  } else {
    searchResultsContainer.classList.remove("show_content_search");
    searchResultsContainer.innerHTML = "";
  }
}
//CREATE SEARCH PRODUCT CARD
function createSearchResultCard(product) {
  const card = document.createElement("a");
  card.href = `../product_details/product_details.html?category=${product.category}&id=${product.id}`;

  card.classList.add("oneSearch");
  card.style.textDecoration = "none";
  card.style.color = "black";
  const imageDiv = document.createElement("div");
  const img = document.createElement("img");
  img.src = product.image;
  img.style.width = "100px";
  img.style.height = "100px";

  imageDiv.appendChild(img);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("contentInfo");

  const title = document.createElement("h5");
  title.innerText = product.title;

  const description = document.createElement("p");
  description.innerText = `${product.description.slice(0, 100)}...`;

  infoDiv.appendChild(title);
  infoDiv.appendChild(description);

  card.appendChild(imageDiv);
  card.appendChild(infoDiv);

  return card;
}
// Function to toggle wishlist state of a product
async function toggleWishList(productId) {
  const heartIcon = document.querySelector(`.heart-${productId}`);
  if (!heartIcon) {
    console.error("Heart icon not found for product ID:", productId);
    return;
  }

  const product = getallProductFromLocalStorage.find((p) => p.id === productId);
  if (!product) {
    console.error("Product not found for ID:", productId);
    return;
  }
  const isInWishList = wishListProducts.some((p) => p.id === productId);
  if (isInWishList) {
    wishListProducts = wishListProducts.filter((p) => p.id !== productId);
    heartIcon.classList.replace("fa-solid", "fa-regular");
    heartIcon.classList.replace("heartFill", "heartEmpty");
  } else {
    wishListProducts.push(product);
    heartIcon.classList.replace("fa-regular", "fa-solid");
    heartIcon.classList.replace("heartEmpty", "heartFill");
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishListProducts));
  totalItems(wishListProducts, "wLProducts");
}

//Function to add product to the cart
export async function addToCart(productId, quantity = 1) {
  if (getCurrentUser) {
    const product = getallProductFromLocalStorage.find(
      (p) => p.id === productId
    );
    if (!product) {
      console.error("Product not found for ID:", productId);
      return;
    }
    const isProductInCart = cartListProducts.some((p) => p.id === productId);
    if (isProductInCart) {
      alert(`This product is already in the cart.`);
      return;
    }
    product.quantity = quantity || 1;

    // Update cart in localStorage
    product.client = getCurrentUser.email;
    cartListProducts.push(product);
    localStorage.setItem("cart-list", JSON.stringify(cartListProducts));

    // Show success message
    Swal.fire({
      icon: "success",
      title: "Thank you",
      text: "The product has been added to the cart",
    });

    // Update UI
    totalItems(cartListProducts, "cartCount");
    renderAllProductCart();
    updatePrice();
    // console.log("object", totalSalary());
  } else {
    Swal.fire({
      title: "You need to login first",
      text: "You won't be able to add this item untill login!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Login.!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Login.!",
          icon: "success",
        });
        location.replace("../login_sys/login.html");
      }
    });
  }
}

// Function to generate HTML for a product in the cart
function generateProductCart(product, container) {
  const oneProCart = document.createElement("div");
  oneProCart.classList.add("card", "position-relative");

  oneProCart.appendChild(createImageElement(product.image));
  oneProCart.appendChild(createInfoElement(product));

  const removeBtn = document.createElement("div");
  removeBtn.innerText = "Remove";
  removeBtn.classList.add("fav_option", "bg-danger", "text-light");
  removeBtn.addEventListener("click", () => removeFromCart(product.id));
  oneProCart.appendChild(removeBtn);
  container.appendChild(oneProCart);
}

//remove product from cart
export function removeFromCart(id) {
  cartListProducts = cartListProducts.filter((product) => product.id !== id);
  localStorage.setItem("cart-list", JSON.stringify(cartListProducts));
  renderAllProductCart();
  totalItems(cartListProducts, "cartCount");
  updatePrice();
  getProductsFromLS(); // Re-render cart products
}

// Function to render all products in the cart
export async function renderAllProductCart() {
  let offCanvasCartBody = document.getElementById("offCanvasCartBody");
  // Clear existing cart items
  offCanvasCartBody.innerHTML = "";

  if (cartListProducts.length > 0) {
    cartListProducts.forEach((product) => {
      const productExist = getallProductFromLocalStorage.find(
        (item) => item.id === product.id
      );
      if (productExist) {
        generateProductCart(product, offCanvasCartBody);
      }
    });
  } else {
    // Render message for empty cart
    const isEmptyCart = document.createElement("div");
    isEmptyCart.classList.add(
      "border-2",
      "w-full",
      "h-full",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "mt-5"
    );
    const message = document.createElement("h3");
    message.classList.add("text-secondary");
    message.innerText = "Your cart is empty.";
    isEmptyCart.appendChild(message);
    offCanvasCartBody.appendChild(isEmptyCart);
  }
}

//create product offer
function updateCountdown() {
  const nameOffer = document.getElementById("nameOffer");
  const imageOffer = document.getElementById("imageOffer");

  const productOffer = getallProductFromLocalStorage[15];
  const now = new Date();
  const timeDiff = endDate - now;
  nameOffer.innerText = productOffer.title;
  imageOffer.src = productOffer.image;
  imageOffer.style.width = "100%";
  imageOffer.style.height = "100%";
  imageOffer.style.objectFit = "contain";

  if (timeDiff <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  // JavaScript to dynamically set the href
  const electronics = "electronics"; // Replace with dynamic value
  const productId = "1720647576422"; // Replace with dynamic value
  const link = document.getElementById("buy-now-link");
  link.href = `../product_details/product_details.html?category=${electronics}&id=${productId}`;
}

//RETURN NUMBER OF ITEMS
export function totalItems(total, renderCounter) {
  const totalPro = total.length;
  const numberOfWishList = document.getElementById(renderCounter);
  const divCount = document.createElement("div");
  divCount.classList.add("divCount");

  divCount.innerText = totalPro > 0 ? totalPro : "0";
  numberOfWishList.appendChild(divCount);
}

//calc total price of products cart
export async function getTotalPriceOfCart() {
  let total = cartListProducts.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );
  return total;
}

export function totalSalary() {
  if (cartListProducts.length > 0) {
    let total = cartListProducts.reduce((accumulator, product) => {
      let netPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;
      return accumulator + netPrice * (product.quantity || 1);
    }, 0);
    return total;
  }
  return 0;
}

//update price
export async function updatePrice() {
  const totalPrice = await getTotalPriceOfCart();
  document.getElementById("totalPrice").innerText = ` $${totalSalary().toFixed(
    2
  )}`;
  document.getElementById(
    "totalPriceInCart"
  ).innerText = ` $${totalSalary().toFixed(2)}`;
  // console.log(+totalPrice);
  document.getElementById("subtitle").innerText = ` $${totalPrice.toFixed(2)}`;
  document.getElementById(
    "subtitle"
  ).previousElementSibling.innerText = `price before discount:`;
}

// Function to check current user
export function checkedCurrentUser() {
  const chCurUser = document.getElementById("chCurUser");
  const btnLogin = document.getElementById("btnLogin");
  const getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (getCurrentUser) {
    const fNameUser = getCurrentUser.fName.charAt(0);
    const lNameUser = getCurrentUser.lName.charAt(0);
    chCurUser.classList.add("d-block");

    const btnInfo = document.createElement("div");
    btnInfo.classList.add(
      "bg-warning",
      "rounded-circle",
      "position-relative",
      "text-center",
      "fs-5",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "ms-3",
      "shadow-lg"
    );
    btnInfo.style.width = "50px";
    btnInfo.style.height = "50px";
    btnInfo.setAttribute("id", "btnInfoShowing");
    btnInfo.style.cursor = "pointer";
    btnInfo.innerText = `${fNameUser}${lNameUser}`;
    btnInfo.addEventListener("click", toggleContentInFoUser);
    chCurUser.appendChild(btnInfo);
    btnLogin.classList.add("d-none");
  } else {
    chCurUser.classList.add("d-none");
    const createBtnLogin = document.createElement("a");
    createBtnLogin.href = "../login_sys/login.html";
    createBtnLogin.innerText = "Login";
    createBtnLogin.classList.add(
      "bg-primary",
      "py-2",
      "px-4",
      "outline-0",
      "border-0",
      "rounded",
      "text-light",
      "fs-5",
      "text-decoration-none"
    );
    btnLogin.appendChild(createBtnLogin);
  }
}

// Function to create and toggle user info content
export function toggleContentInFoUser() {
  const btnInfoShowing = document.getElementById("btnInfoShowing");
  let divContentInfoUser = document.querySelector(".divContentInfoUser");

  if (divContentInfoUser) {
    divContentInfoUser.classList.toggle("d-none");
  } else {
    divContentInfoUser = document.createElement("div");
    divContentInfoUser.classList.add(
      "divContentInfoUser",
      "bg-light-subtle",
      "rounded",
      "shadow-lg",
      "position-absolute",
      "mt-3",
      "flex-column",
      "gap-0",
      "rounded-2"
    );
    divContentInfoUser.style.width = "400px";
    divContentInfoUser.style.zIndex = 500000;
    divContentInfoUser.style.right = 0;
    divContentInfoUser.style.padding = "10px";
    divContentInfoUser.style.top = "100%";

    const getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

    const liName = document.createElement("p");
    liName.innerText =
      getCurrentUser.fName.slice(0, 10) +
      " " +
      getCurrentUser.lName.slice(0, 10);
    liName.classList.add("border-bottom", "p-2", "my-2", "text-secondary");
    divContentInfoUser.appendChild(liName);

    const emailName = document.createElement("p");
    emailName.innerText = getCurrentUser.email.slice(0, 20) + "..";
    emailName.classList.add("fw-bold", "p-2");
    emailName.style.fontSize = "14px";
    divContentInfoUser.appendChild(emailName);

    const logOutBtn = document.createElement("p");
    logOutBtn.innerText = "LogOut";
    logOutBtn.classList.add(
      "bg-danger",
      "p-2",
      "w-full",
      "my-0",
      "outline-none",
      "border-0",
      "text-light",
      "rounded-bottom-2"
    );
    logOutBtn.addEventListener("click", logoutUser);
    divContentInfoUser.appendChild(logOutBtn);

    btnInfoShowing.appendChild(divContentInfoUser);
  }
}

// Function to logout user
export function logoutUser() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cart-list");
  location.replace("../home/home.html");
}

// console.log("Total Salary:", totalSalary());

//RENDER ALL FUNCTIONALITY OF PAGES
function renderPage() {
  document
    .getElementById("btn_all_categories")
    .addEventListener("click", renderAllCategories);
  document
    .querySelector("[name='search_product_name']")
    .addEventListener("keyup", searchByProduct);

  getAllCategory();
  renderAdder("../Assets/images_home/add1.jpeg", "", "show_adder");
  renderProducts(DEFAULT_RENDER_COUNT, "all_Products");
  renderProductsByCategory();
  renderAdder(
    "../Assets/images_home/addver2.jpg",
    "../Assets/images_home/addver3.jpg",
    "show_adder2"
  );
  setInterval(updateCountdown, 1000);
  totalItems(wishListProducts, "wLProducts");
  totalItems(cartListProducts, "cartCount");
  renderAllProductCart();
  fetchProducts();
  updatePrice();
  checkedCurrentUser();
}
