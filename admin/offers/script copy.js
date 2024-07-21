window.addEventListener("DOMContentLoaded", function () {
  // Validate form values
  (function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            event.preventDefault()
            storeOffer()
            // ProductInOffer()
          }

          form.classList.add('was-validated')
        }, false)
      })
  })()
  let ProductsSelct = document.getElementById("ProductsSelct")
  let offerValueParent = document.getElementById("offerValueParent")
  let offerValue = document.getElementById("offerValue")
  let offerHolder = document.getElementById("offer-holder")
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  let sellerProducts = JSON.parse(localStorage.getItem('products'))
    .filter((seller) => seller.sellerID == currentUser.email)


  // Get products from database
  function getProducts() {
    for (let i = 0; i < sellerProducts.length; i++) {
      ProductsSelct.innerHTML += `
      <option value="${sellerProducts[i].id}">
      ${sellerProducts[i].title}
      </option>
      `
    }
  }
  getProducts()

  function storeOffer() {
    let selectedOne = sellerProducts.find(pro => pro.id == ProductsSelct.value);
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
    ProductsSelct.selectedIndex = 0;
    offerValue.value = '';
    reRenderProducts()
  }
  // Render data from local strage for first time an devery time add or udated product
  function reRenderProducts() {
    let offerdProduct = JSON.parse(localStorage.getItem("offers")).filter((prod) => prod.sellerID == currentUser.email) || []
    if (offerdProduct.length) {
      offerHolder.innerHTML = ""
      for (let i = 0; i < offerdProduct.length; i++) {
        offerHolder.innerHTML += `
        <div class="card  col-12 col-md-4 p-1" style="width: 18rem;">
        <img src="${offerdProduct[i].image}" class="card-img-top mx-auto" alt="${offerdProduct[i].image}" style="width: 6rem; height:fit-content">
        <div class="card-body">
        <h5 class="card-title line-clamp-title">${offerdProduct[i].title}</h5>
        <p class="card-text line-clamp-description">${offerdProduct[i].description}</p>
        <div class="d-flex flex-column gap-2 justify-content-center">
        <p>Price: <b>${offerdProduct[i].price}$</b></p>
        <p>Category: <b>${offerdProduct[i].category}</b></p>
        <p>Rate: <b>${offerdProduct[i].rating.rate}</b></p>
        <p>Count: <b>${offerdProduct[i].rating.count}</b></p>
        <p>offer value: <b>${offerdProduct[i].discount}%</b></p>
        </div>
        <button class="btn btn-danger btn-sm" style='width:100%;' onclick="deleteOffer(${offerdProduct[i].id})">Delete offer</button>
        </div>
        </div>
        `
      }
    } else offerHolder.innerHTML = `<h1>No offers Now</h1>`
  }
  reRenderProducts()
  window.deleteOffer = (id) => {
    let restAfterDelete = JSON.parse(localStorage.getItem("offers")).filter((product) => product.id != id)
    this.localStorage.setItem("offers", JSON.stringify(restAfterDelete))
    reRenderProducts()
  }



})

// [{ "id": 1724647523310, "title": "Fjallraven1, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating": { "rate": 3.9, "count": 120 }, "stock": 10, "sellerID": "admin@iti.com", "offerValue": 12 }, { "id": 1728447523310, "title": "Fjallraven2, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating": { "rate": 3.9, "count": 120 }, "stock": 10, "sellerID": "admin@iti.com", "offerValue": 12 }, { "id": 1724617523310, "title": "Fjallraven3, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating": { "rate": 3.9, "count": 120 }, "stock": 10, "sellerID": "admin@iti.com", "offerValue": 12 }]