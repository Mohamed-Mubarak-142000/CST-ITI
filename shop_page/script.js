import {
  cartListProducts,
  checkedCurrentUser,
  createHeading,
  createProductCard,
  fetchProductsByCategory,
  getallProductFromLocalStorage,
  renderAllProductCart,
  totalItems,
  updatePrice,
  wishListProducts,
} from "../home/script.js";

window.addEventListener("load", renderPage);

// Function to get the product ID from the URL
function getProductIDFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category");
}

async function getAllProducts() {
  let allProducts = document.getElementById("allProducts");
  let category = getProductIDFromURL();
  allProducts.parentNode.insertBefore(
    createHeading(`${category}`),
    allProducts
  );

  let productContainer = document.createElement("div");
  productContainer.classList.add("row", "g-3");

  if (category === "all") {
    getallProductFromLocalStorage.forEach((product) => {
      const pro = createProductCard(product, wishListProducts);
      allProducts.appendChild(pro);
    });
  } else {
    let products = await fetchProductsByCategory(category);
    products.forEach((product) => {
      productContainer.appendChild(
        createProductCard(product, wishListProducts)
      );
    });
    allProducts.appendChild(productContainer);
  }
}

function renderPage() {
  getProductIDFromURL();
  getAllProducts();
  updatePrice();
  totalItems(wishListProducts, "wLProducts");
  totalItems(cartListProducts, "cartCount");
  renderAllProductCart();
  checkedCurrentUser();
}
