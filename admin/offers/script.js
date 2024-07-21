window.addEventListener("DOMContentLoaded", function () {
  // Validate form values
  (function () {
    'use strict';
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            event.preventDefault();
            storeOffer();
            // ProductInOffer()
          }

          form.classList.add('was-validated');
        }, false);
      });
  })();

  let ProductsSelct = document.getElementById("ProductsSelct");
  let offerValueParent = document.getElementById("offerValueParent");
  let offerValue = document.getElementById("offerValue");
  let offerHolder = document.getElementById("offer-holder");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let sellerProducts = JSON.parse(localStorage.getItem('products'))
    .filter((seller) => seller.sellerID == currentUser.email);

  // Get products from database
  function getProducts() {
    for (let i = 0; i < sellerProducts.length; i++) {
      ProductsSelct.innerHTML += `
      <option value="${sellerProducts[i].id}">
      ${sellerProducts[i].title}
      </option>
      `;
    }
  }
  getProducts();

  function storeOffer() {
    let selectedOne = JSON.parse(localStorage.getItem('products')).find(pro => pro.id == ProductsSelct.value);
    selectedOne.discount = Number(offerValue.value);

    let storedProductsOffers = JSON.parse(localStorage.getItem("offers")) || [];
    let productFound = false;

    for (let i = 0; i < storedProductsOffers.length; i++) {
      if (storedProductsOffers[i].id == selectedOne.id) {
        storedProductsOffers[i] = selectedOne;
        productFound = true;
        break; // Exit the loop once the product is found and updated
      }
    }
    if (!productFound) {
      storedProductsOffers.push(selectedOne); // Add the new offer if the product is not found
    }
    localStorage.setItem("offers", JSON.stringify(storedProductsOffers));

    // Update the main products list
    let allProducts = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].id == selectedOne.id) {
        allProducts[i].discount = selectedOne.discount;
        break;
      }
    }
    localStorage.setItem("products", JSON.stringify(allProducts));

    ProductsSelct.selectedIndex = 0;
    offerValue.value = '';
    reRenderProducts();
  }

  // Render data from local storage for the first time and every time a product is added or updated
  function reRenderProducts() {
    let offeredProducts = JSON.parse(localStorage.getItem("offers")).filter((prod) => prod.sellerID == currentUser.email) || [];
    if (offeredProducts.length) {
      offerHolder.innerHTML = "";
      for (let i = 0; i < offeredProducts.length; i++) {
        offerHolder.innerHTML += `
        <div class="card  col-12 col-md-4 p-1" style="width: 18rem;">
            <div class="card-header text-center">
              <img src="${offeredProducts[i].image}" class="card-img-top mx-auto" alt="${offeredProducts[i].image}" style="width:100%; height:fit-content">
            </div>
            <div class="card-body d-flex flex-column gap-2 justify-content-center">
                <h5 class="card-title line-clamp-title">${offeredProducts[i].title}</h5>
                <p class="card-text line-clamp-description">${offeredProducts[i].description}</p>
                <p>Price: <b>${offeredProducts[i].price}$</b></p>
                <p>Category: <b>${offeredProducts[i].category}</b></p>
                <p>Rate: <b>${offeredProducts[i].rating.rate}</b></p>
                <p>Count: <b>${offeredProducts[i].rating.count}</b></p>
                <p>Offer value: <b>${offeredProducts[i].discount}%</b></p>
            </div>
            <div class=" card-footer">
                <button class="btn btn-danger btn-sm" style='width:100%;' onclick="deleteOffer(${offeredProducts[i].id})">Delete offer</button>
            </div>
        </div>
        `;
      }
    } else {
      offerHolder.innerHTML = `<h1>No offers Now</h1>`;
    }
  }
  reRenderProducts();

  window.deleteOffer = (id) => {
    let restAfterDelete = JSON.parse(localStorage.getItem("offers")).filter((product) => product.id != id);
    localStorage.setItem("offers", JSON.stringify(restAfterDelete));

    // Update the main products list to set the discount to 0
    let allProducts = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].id == id) {
        allProducts[i].discount = 0;
        break;
      }
    }
    localStorage.setItem("products", JSON.stringify(allProducts));

    reRenderProducts();
  }
});
