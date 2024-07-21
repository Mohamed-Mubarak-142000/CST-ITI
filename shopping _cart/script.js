import {
  totalItems,
  renderAllProductCart,
  wishListProducts,
  cartListProducts,
  createHeading,
  updatePrice,
  removeFromCart,
  getallProductFromLocalStorage,
  totalSalary,
  checkedCurrentUser,
} from "../home/script.js";

window.addEventListener("load", renderPage);

export function getProductsFromLS() {
  let renderCartProduct = document.getElementById("renderCartProduct");
  renderCartProduct.innerHTML = ""; // Clear existing content

  if (cartListProducts.length > 0) {
    cartListProducts.forEach((product) => {
      const productExist = getallProductFromLocalStorage.find(
        (item) => item.id === product.id
      );
      if (productExist) {
        createProductInCartPage(product);
      }
    });
    const totalSalaryOfProducts = document.createElement("p");
    totalSalaryOfProducts.innerText = `Total Price Of Products: $ ${totalSalary().toFixed(2)}`;
    totalSalaryOfProducts.classList.add("text-danger", "fw-bold");
    renderCartProduct.appendChild(totalSalaryOfProducts);

    const divBorder = document.createElement("hr");
    renderCartProduct.appendChild(divBorder);
  } else {
    const noProductsMessage = document.createElement("p");
    noProductsMessage.classList.add(
      "text-bold",
      "text-center",
      "fs-1",
      "mt-5",
      "text-secondary"
    );
    noProductsMessage.innerText = "Your Cart is empty.!";
    renderCartProduct.appendChild(noProductsMessage);
  }
  checkedExistPrice()
}

function createProductInCartPage(product) {
  const renderCartProduct = document.getElementById("renderCartProduct");
  const oneProduct = document.createElement("div");
  oneProduct.classList.add(
    "d-flex",
    "gap-3",
    "flex-column",
    "flex-lg-row",
    "align-items-center",
    "justify-content-between",
    "col-10",
    "offset-1",
    "position-relative",
    "shadow-lg",
    "rounded-2",
    "py-2"
  );

  // Initial check when the script loads
  if (window.innerWidth > 600) {
    // oneProduct.style.height = "350px";
    oneProduct.style.minHeight = "";
  } else {
    oneProduct.style.height = "";
    oneProduct.style.minHeight = "500px";
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      oneProduct.style.height = "250px";
      oneProduct.style.minHeight = "";
    } else {
      oneProduct.style.height = "";
      oneProduct.style.minHeight = "500px";
    }
  });

  const removeBtn = document.createElement("div");
  removeBtn.classList.add(
    "bg-danger",
    "position-absolute",
    "bottom-0",
    "mb-2",
    "end-0",
    "rounded-start-2",
    "p-2",
    "text-light"
  );
  removeBtn.style.cursor = "pointer";
  removeBtn.innerText = "Remove";
  removeBtn.addEventListener("click", () => removeFromCart(product.id));

  const infoProduct = document.createElement("div");
  infoProduct.classList.add("w-75");
  const heading = document.createElement("h4");
  heading.innerText = product.title;
  infoProduct.appendChild(heading);

  const description = document.createElement("h6");
  description.classList.add("text-secondary", "my-2");
  description.innerText = product.description;
  infoProduct.appendChild(description);

  const category = document.createElement("h6");
  category.classList.add("my-2");
  category.innerText = product.category;
  infoProduct.appendChild(category);


  const tPrice = document.createElement("h5");
  tPrice.classList.add("my-2");

  const discount = document.createElement('div')
  discount.style.width = "fit-content"
  discount.style.textAlign = "center"
  discount.style.padding = "1px"
  discount.classList = "bg-warning p-0 m-0 rounded-1"
  if (product.discount) {
    console.log(product.discount);
    let PriceAfterDiscount = ((product.price * product.discount) / 100).toFixed(2)
    discount.innerHTML = `<span style="text-decoration: line-through; opacity:.5">$${product.price}</span> <span>$${PriceAfterDiscount}</span>`;
    tPrice.innerText = "$" + PriceAfterDiscount * product.quantity;
  } else {
    discount.innerText = `$${product.price}`;
    tPrice.innerText = "$" + (product.price * product.quantity).toFixed(2);
    discount.classList = "invisible"
  }
  infoProduct.appendChild(discount);
  infoProduct.appendChild(createQuantityAndPrice(product));

  infoProduct.appendChild(tPrice);

  const imageProduct = document.createElement("div");
  imageProduct.classList.add("w-25", "h-50");
  const image = document.createElement("img");
  image.classList.add("w-100", "h-100", "object-fit-contain");
  image.setAttribute("src", product.image);
  imageProduct.appendChild(image);

  oneProduct.appendChild(imageProduct);
  oneProduct.appendChild(infoProduct);
  oneProduct.appendChild(removeBtn);

  renderCartProduct.appendChild(oneProduct);
}

// Calculate price * quantity
function createQuantityAndPrice(product) {
  let orginStockCount = JSON.parse(localStorage.getItem("products")).filter((item) => item.id == product.id)[0].stock
  // console.log(orginStockCount);
  const quantityPrice = document.createElement("div");
  quantityPrice.classList.add(
    "d-flex",
    "align-items-center",
    "gap-5"
    // "justify-content-between"
  );

  const priceSpan = document.createElement("span");
  priceSpan.classList.add("text-primary", "fw-bold");
  console.log(product.quantity);
  if (product.discount) {
    priceSpan.innerText = product.quantity + "*" + (((product.price * product.discount) / 100).toFixed(2));
  } else {
    priceSpan.innerText = product.quantity + "*" + product.price;
  }

  const stockSpan = document.createElement("span");
  stockSpan.classList.add("text-danger", "fw-bold");
  stockSpan.innerText = (orginStockCount - product.quantity) + " stock";

  quantityPrice.appendChild(priceSpan);
  quantityPrice.appendChild(stockSpan);
  return quantityPrice;
}

function checkedExistPrice() {
  const checkPriceBtn = document.getElementById("checkPrice");
  if (cartListProducts.length <= 0 || null) {
    checkPriceBtn.href = "../home/home.html";
    checkPriceBtn.innerText = "Go to home page";
  } else {
    checkPriceBtn.href = "../checkout_process/checkout.html";
    checkPriceBtn.innerText = "Checkout";
  }
}

function renderPage() {
  renderAllProductCart();
  getProductsFromLS();
  totalItems(wishListProducts, "wLProducts");
  totalItems(cartListProducts, "cartCount");
  updatePrice();
  checkedExistPrice();
  checkedCurrentUser();

  const headerOfCartPage = document.getElementById("headerOfCartPage");
  headerOfCartPage.appendChild(createHeading("Your Cart"));
}
