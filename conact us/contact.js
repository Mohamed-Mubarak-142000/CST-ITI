import {
  cartListProducts,
  checkedCurrentUser,
  fetchProducts,
  renderAllProductCart,
  totalItems,
  updatePrice,
  wishListProducts,
} from "../home/script.js";

window.addEventListener("load", renderPage);

document
  .getElementById("checkoutForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      console.log("shehab");
      return;
    }

    let Emails = JSON.parse(localStorage.getItem("Emails")) || [];
    const fullName = document.getElementById("fullName").value;
    console.log(fullName);
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;
    const usermail = { fullName, email, phone, message };
    Emails.push(usermail);
    localStorage.setItem("Emails", JSON.stringify(Emails));
    Swal.fire({
      icon: "success",
      title: "Thank you",
      text: "Your message has been sent successfully!",
    }).then(() => {
      window.location.href = "../home/home.html";
    });
  });

function renderPage() {
  totalItems(wishListProducts, "wLProducts");
  totalItems(cartListProducts, "cartCount");
  renderAllProductCart();
  fetchProducts();
  updatePrice();
  checkedCurrentUser();
}
