import {
  cartListProducts,
  checkedCurrentUser,
  fetchProducts,
  renderAllProductCart,
  totalItems,
  updatePrice,
  wishListProducts,
  searchByProduct
} from "../home/script.js";

window.addEventListener("load", renderPage);

function renderPage() {
  document
    .querySelector("[name='search_product_name']")
    .addEventListener("input", searchByProduct);
  totalItems(wishListProducts, "wLProducts");
  totalItems(cartListProducts, "cartCount");
  renderAllProductCart();
  fetchProducts();
  updatePrice();
  checkedCurrentUser();
}

