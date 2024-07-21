import {
  cartListProducts,
  checkedCurrentUser,
  getallProductFromLocalStorage,
  renderAllProductCart,
  totalItems,
  updatePrice,
  wishListProducts,
} from "../home/script.js";

//select the breadcrumb to update it
async function start() {
  const cart = await fetchCartData();
  updateCartSummary(cart);
  changePaymentDetails();
}

start();

async function fetchCartData() {
  return JSON.parse(localStorage.getItem("cart-list")) || [];
}

async function updateCartSummary(cart) {
  // console.log('dssdm;kdsaavmslkdj');
  const totalItemsElement = document.getElementById("totalItems");
  const totalPriceElement = document.getElementById("CarttotalPrice");
  const payAmountElement = document.getElementById("payAmount");
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((product) => {
    let netPrice = product.discount ? ((product.price * product.discount) / 100) : product.price
    totalItems += product.quantity;
    totalPrice += netPrice * product.quantity;
  });
  totalItemsElement.innerHTML = `${totalItems} items`;
  payAmountElement.innerHTML = `$${totalPrice.toFixed(2)}`;
  totalPriceElement.innerHTML = `$${totalPrice.toFixed(2)}`;

}

function changePaymentDetails() {
  const visaDetails = document.getElementById("visaDetails");
  const payCash = document.getElementById("payCash");
  if (payCash.checked) {
    visaDetails.classList.add("hidden");
    visaDetails.querySelectorAll("input").forEach((input) => {
      input.required = false;
    });
  } else {
    visaDetails.classList.remove("hidden");
    visaDetails.querySelectorAll("input").forEach((input) => {
      input.required = true;
    });
  }
}

document.querySelectorAll('input[name="paymentMethod"]').forEach((input) => {
  input.addEventListener("change", changePaymentDetails);
});

document
  .getElementById("checkoutForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      // console.log("shehab");
      return;
    }

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("adress").value;
    const phone = document.getElementById("phone").value;
    const paymentMethod = document.querySelector(
      'input[name="paymentMethod"]:checked'
    ).value;
    const order = {
      firstName,
      lastName,
      email,
      address,
      phone,
      paymentMethod,
      cart: JSON.parse(localStorage.getItem("cart-list")) || [],
    };

    if (paymentMethod === "visa") {
      const cardName = document.getElementById("cardName").value;
      const cardNumber = document.getElementById("cardNumber").value;
      const cardCVV = document.getElementById("cardCVV").value;

      if (cardName && cardNumber && cardCVV) {
        order.cardName = cardName;
        order.cardNumber = cardNumber;
        order.cardCVV = cardCVV;
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment unsuccessful!",
          text: "Please fill in all card details.",
        });
        return;
      }
    }
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    updateOfStock();
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("cart-list", JSON.stringify([]));

    Swal.fire({
      icon: "success",
      title: "Thank you",
      text: "Payment successful!",
    }).then(() => {
      window.location.href = "../home/home.html";
    });
  });

///update stock
function updateOfStock() {

  cartListProducts.forEach((proCart) => {
    const existProduct = getallProductFromLocalStorage.find(
      (pro) => pro.id === proCart.id
    );

    // If the product doesn't exist in the local storage, skip this iteration
    if (!existProduct) {
      console.warn(`Product with ID ${proCart.id} not found in local storage.`);
      return;
    }

    // Update stock
    if (proCart.quantity > existProduct.stock) {
      alert(`Not engouh qountity in stock,${existProduct.stock} only availble  `)
      return;// end up function
    } else {
      existProduct.stock -= +proCart.quantity; // Assuming you meant to subtract proCart.quantity
    }

    console.log("Updated stock:", existProduct.stock);

    // Find the index of the product in the global list
    const productIndexGlobal = getallProductFromLocalStorage.findIndex(
      (p) => p.id === proCart.id
    );

    // Update the global product list if the product is found
    if (productIndexGlobal > -1) {
      getallProductFromLocalStorage[productIndexGlobal].stock = existProduct.stock;
      localStorage.setItem("products", JSON.stringify(getallProductFromLocalStorage));
    } else {
      console.warn(`Product with ID ${proCart.id} not found in global list.`);
    }
  });

  // Function complete, returning null
  return null;

}

window.addEventListener("load", renderPage);
function renderPage() {
  totalItems(wishListProducts, "wLProducts");
  totalItems(cartListProducts, "cartCount");
  renderAllProductCart();
  updatePrice();
  checkedCurrentUser();

}
