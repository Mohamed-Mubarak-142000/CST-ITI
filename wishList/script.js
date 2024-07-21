import {
  cartListProducts,
  checkedCurrentUser,
  createHeading,
  createImageElement,
  createInfoElement,
  fetchProducts,
  getallProductFromLocalStorage,
  totalItems,
  updatePrice,
} from "../home/script.js";

window.addEventListener("load", renderWishListPage);

const WISHLIST_KEY = "wishList";
let wishListProducts = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
const youWishList = document.getElementById("you_wish_list");
const headingPage = document.getElementById("heading_page");

// Function to fetch and render product by ID
async function fetchAndRenderProductById(productId) {
  try {
    const product = getallProductFromLocalStorage.find(
      (pro) => pro.id === productId
    );
    if (product) {
      const productCard = createProductCard(product);
      youWishList.appendChild(productCard);
      console.log("Product fetched:", product);
    } else {
      console.warn("Product not found for ID:", productId);
    }
  } catch (error) {
    console.error(
      `Error fetching product with ID ${productId}: ${error.message}`
    );
  }
}

// Function to create product card
function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add(
    "card",
    "col-12",
    "col-md-6",
    "col-lg-3",
    "position-relative"
  );

  productCard.appendChild(createImageElement(product.image));
  productCard.appendChild(createInfoElement(product));

  const removeBtn = document.createElement("div");
  removeBtn.innerText = "Remove";
  removeBtn.addEventListener("click", () => removeFromWishList(product.id));
  removeBtn.classList.add("fav_option", "bg-danger", "text-light", "rounded");

  productCard.appendChild(removeBtn);

  return productCard;
}

// Function to remove product from wish list
export function removeFromWishList(productId) {
  wishListProducts = wishListProducts.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishListProducts));

  renderWishListProducts();
  totalItems(wishListProducts, "wLProducts");
}

// Function to render all products in the wish list
function renderWishListProducts() {
  youWishList.innerHTML = ""; // Clear the existing list
  let wishListProducts = JSON.parse(localStorage.getItem("wishList"));

  if (!headingPage.querySelector("h1")) {
    const title = createHeading("Your Wish List Products");
    headingPage.appendChild(title);
  }

  if (wishListProducts.length === 0) {
    const noProductsMessage = document.createElement("p");
    noProductsMessage.classList.add(
      "text-bold",
      "text-center",
      "fs-1",
      "mt-5",
      "text-secondary"
    );
    noProductsMessage.innerText = "Your wishlist is empty.!";
    youWishList.appendChild(noProductsMessage);
  } else {
    wishListProducts.forEach((product) => {
      fetchAndRenderProductById(product.id);
    });
  }
}

// Function to render the wish list page
function renderWishListPage() {
  renderWishListProducts();
  totalItems(wishListProducts, "wLProducts");
  totalItems(cartListProducts, "cartCount");
  updatePrice();
  checkedCurrentUser();
}


