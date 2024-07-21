import {
  createImageElement,
  addToCart,
  fetchProductsByCategory,
  renderProducts,
  createHeading,
  updatePrice,
  renderAllProductCart,
  totalItems,
  cartListProducts,
  wishListProducts,
  getallProductFromLocalStorage,
  checkedCurrentUser,
} from "../home/script.js";
window.addEventListener("load", renderPage);

// Fetch product details and render them on the page
function getProductIDFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  // console.log("url", urlParams.get("id"), urlParams.get("category"));
  return urlParams;
}
// Function to fetch product details and render them on the page
async function getProductDetails() {
  const idProduct = getProductIDFromURL().get("id");
  const product = getallProductFromLocalStorage.find(
    (product) => product.id === +idProduct
  );

  if (product) {
    createProductDetails(product);
  } else {
    console.error("Product not found!");
  }
}
// Function to create product details on the page
function createProductDetails(product) {
  const product_details = document.getElementById("product_details");

  const leftSide = document.createElement("div");
  leftSide.classList.add("col-12", "col-lg-6", "left-side");
  leftSide.appendChild(createImageElement(product.image));

  const rightSide = document.createElement("div");
  rightSide.classList.add("col-12", "col-lg-6", "right-side");

  const headProduct = document.createElement("h2");
  headProduct.innerText = product.title;
  rightSide.appendChild(headProduct);

  const descProduct = document.createElement("p");
  descProduct.classList.add("text-secondary", "my-3");
  descProduct.innerText = product.description;
  rightSide.appendChild(descProduct);

  const catProduct = document.createElement("h5");
  catProduct.classList.add("my-3");
  catProduct.innerText = product.category;
  rightSide.appendChild(catProduct);

  const priceProduct = document.createElement("h5");
  const discount = document.createElement("div");
  discount.style.width = "fit-content";
  discount.style.textAlign = "center";
  discount.classList = "bg-success rounded-1";
  if (product.discount) {
    discount.innerHTML = ` <p style="color:white; padding:3px">Discount ${product.discount}% </p>`;
    priceProduct.innerHTML = `<span style="text-decoration: line-through; opacity:.5">$${
      product.price
    }</span><br/> <span>$${((product.price * product.discount) / 100).toFixed(
      2
    )}</span>`;
  } else {
    priceProduct.innerText = `$${product.price}`;
    discount.classList = "invisible";
  }
  priceProduct.classList.add("my-3");
  rightSide.appendChild(priceProduct);
  rightSide.appendChild(discount);

  const stockDisplay = document.createElement("h5");
  stockDisplay.classList.add("my-3");
  stockDisplay.innerText = `Available Stock: ${product.stock - 1}`;
  stockDisplay.setAttribute("id", "stockDisplay");
  rightSide.appendChild(stockDisplay);

  const quantityInput = document.createElement("input");
  quantityInput.setAttribute("id", "quantityProduct");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("min", "1");
  quantityInput.value = product.quantity || 1;
  quantityInput.classList.add("text-center", "w-25", "border", "rounded");
  rightSide.appendChild(quantityInput);

  const contentPMShow = document.createElement("div");
  contentPMShow.classList.add("d-flex", "gap-1", "w-50", "my-2");

  const btnIncrease = document.createElement("button");
  btnIncrease.classList.add("btn", "btn-success");
  btnIncrease.innerText = "+";
  btnIncrease.addEventListener("click", function () {
    increaseCounterOfStock(product);
  });
  contentPMShow.appendChild(btnIncrease);

  contentPMShow.appendChild(quantityInput);

  const btnDecrease = document.createElement("button");
  btnDecrease.classList.add("btn", "btn-danger");
  btnDecrease.innerText = "-";
  btnDecrease.addEventListener("click", function () {
    decreaseCounterOfStock(product);
  });
  contentPMShow.appendChild(btnDecrease);

  rightSide.appendChild(contentPMShow);

  const addToCartbtn = document.createElement("button");

  const existProduct = cartListProducts.find((pro) => pro.id === product.id);
  if (existProduct) {
    addToCartbtn.style.pointerEvents = "none";
    addToCartbtn.style.filter = "blur(1px)";
  }
  addToCartbtn.classList.add("btn", "btn-warning", "py-2", "w-50");
  addToCartbtn.innerText = "Add To Cart";
  addToCartbtn.addEventListener("click", function () {
    addToCart(product.id, parseInt(quantityInput.value));
  });
  rightSide.appendChild(addToCartbtn);

  product_details.appendChild(leftSide);
  product_details.appendChild(rightSide);

  // Add Intersection Observer animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const direction =
          entry.boundingClientRect.top < window.innerHeight / 2
            ? "slide-in-top"
            : "slide-in-bottom";
        leftSide.classList.remove("slide-out-top", "slide-out-bottom");
        leftSide.classList.add(direction);

        rightSide.classList.remove("slide-out-top", "slide-out-bottom");
        rightSide.classList.add(direction);
      } else {
        const direction =
          entry.boundingClientRect.top < window.innerHeight / 2
            ? "slide-out-top"
            : "slide-out-bottom";
        rightSide.classList.remove("slide-in-top", "slide-in-bottom");
        rightSide.classList.add(direction);

        leftSide.classList.remove("slide-in-top", "slide-in-bottom");
        leftSide.classList.add(direction);
      }
    });
  });

  observer.observe(leftSide);
  observer.observe(rightSide);
}

// Function to decrease the product quantity
function decreaseCounterOfStock(product) {
  const quantityInput = document.getElementById("quantityProduct");
  const stockDisplay = document.getElementById("stockDisplay");

  let currentValue = parseInt(quantityInput.value);
  let maxStock = parseInt(
    stockDisplay.innerText.replace("Available Stock: ", "")
  );

  if (currentValue > 1) {
    currentValue--;
    maxStock++;
  }

  quantityInput.value = currentValue;
  stockDisplay.innerText = `Available Stock: ${maxStock}`;
}
// Function to increase the product quantity
function increaseCounterOfStock(product) {
  const quantityInput = document.getElementById("quantityProduct");
  const stockDisplay = document.getElementById("stockDisplay");

  let currentValue = parseInt(quantityInput.value);
  let maxStock = parseInt(
    stockDisplay.innerText.replace("Available Stock: ", "")
  );

  if (currentValue < product.stock && maxStock >= 0) {
    currentValue++;
    maxStock--;
  }

  quantityInput.value = currentValue || 1;
  stockDisplay.innerText = `Available Stock: ${maxStock}`;
}
// Function to update the product in the local storage
export function updateLocalStorageProduct(updatedProduct) {
  const productIndex = cartListProducts.findIndex(
    (p) => p.id === updatedProduct.id
  );

  if (productIndex > -1) {
    cartListProducts[productIndex] = updatedProduct;
    localStorage.setItem("cart-list", JSON.stringify(cartListProducts));
  }

  const productIndexGlobal = allProducts.findIndex(
    (p) => p.id === updatedProduct.id
  );

  if (productIndexGlobal > -1) {
    getallProductFromLocalStorage[productIndexGlobal].quantity =
      updatedProduct.quantity;
    getallProductFromLocalStorage[productIndexGlobal].stock =
      updatedProduct.stock;
    localStorage.setItem(
      "all-products",
      JSON.stringify(getallProductFromLocalStorage)
    );
  }
}
//section render related products
async function renderRelatedProducts() {
  const heading_related = document.getElementById("heading_related");
  heading_related.appendChild(createHeading("Related Products"));
  const categoryProduct = getProductIDFromURL().get("category");
  const data = await fetchProductsByCategory(categoryProduct);
  await renderProducts(6, "related_Products");
}

function renderPage() {
  renderRelatedProducts();
  getProductIDFromURL();
  getProductDetails();
  totalItems(wishListProducts, "wLProducts");
  totalItems(cartListProducts, "cartCount");
  renderAllProductCart();
  updatePrice();
  checkedCurrentUser();
}
