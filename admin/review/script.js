document.addEventListener("DOMContentLoaded", function () {

  function renderProducts() {
    let cardwarrpper = document.getElementById("cardwarrpper")
    let waitingProducts = JSON.parse(localStorage.getItem("waitReview")) || []
    if (waitingProducts.length != 0) {
      cardwarrpper.innerHTML = ""
      waitingProducts.forEach((product, index) => {
        let card = document.createElement("div")
        card.classList.add("card", "h-20")
        card.style.width = '18rem'
        card.innerHTML =
          `
          <div class="card-header">
            <img src=${product.image} class="card-img-top" alt=${product.title} >
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.title} </h5>
            <p class="card-text line-clamp-card">${product.description}</p>
          </div>
          <div class="card-footer">
            <div class="d-flex text-center align-items-center justify-content-between p-2">
              <h6>Price <br> ${product.price}$</h6>
              <hr>
              <h6>In Stock <br> ${product.stock}</h6>
            </div>
            <hr>
            <div class="row  justify-content-evenly">
            <a href="#" class="col-5 btn btn-primary" id="acceptProduct" onclick="acceptProduct(${index})">Accept</a> 
            <a href="#" class="col-5 btn btn-danger" id="RefuseProduct" onclick="RefuseProduct(${index})"  >Delete</a> 
            </div>
          </div>   
          `
        cardwarrpper.appendChild(card)

      })
    } else cardwarrpper.innerHTML = "<p class='text-center'>No Products now</p>"
  }
  window.acceptProduct = (index) => {
    let waitingProducts = JSON.parse(localStorage.getItem("waitReview")) || []
    let products = JSON.parse(localStorage.getItem("products")) || []
    products.push(waitingProducts.splice(index, 1)[0])
    localStorage.setItem("products", JSON.stringify(products))
    localStorage.setItem("waitReview", JSON.stringify(waitingProducts))
    renderProducts()
  }

  window.RefuseProduct = (index) => {
    let waitingProducts = JSON.parse(localStorage.getItem("waitReview")) || []
    let refusedProducts = JSON.parse(localStorage.getItem("refused")) || [];
    console.log();
    let refusedItem = waitingProducts[index]
    let refuseReson = prompt("write the reason for refusing", "NoT suitable to our community")
    if (refuseReson) {
      refusedItem.reason = refuseReson
      refusedProducts.push(refusedItem);
      localStorage.setItem("refused", JSON.stringify(refusedProducts))
      waitingProducts.splice(index, 1)[0]
      localStorage.setItem("waitReview", JSON.stringify(waitingProducts))
      renderProducts()
    }
  }

  renderProducts()

})


// [
//   { "id": 23, "title": "e-commerce", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 47, "count": 14 }, "stock": 14, "sellerID": "hossamahmed8862@gmail.com" },
//   { "id": 23, "title": "e-user", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 17 }, "stock": 15, "sellerID": "hossamahmed8862@gmail.com" },
//   { "id": 23, "title": "e-commerce-user", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 21 }, "stock": 18, "sellerID": "hossamahmed8862@gmail.com" }
//   ,
//   { "id": 23, "title": "fantssdv", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 47, "count": 14 }, "stock": 14, "sellerID": "hossamahmed8862@gmail.com" },
//   { "id": 23, "title": "e-sdfasd;lvs", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 17 }, "stock": 15, "sellerID": "hossamahmed8862@gmail.com" },
//   { "id": 23, "title": "e-kscdlkk;slkver", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 21 }, "stock": 18, "sellerID": "hossamahmed8862@gmail.com" }
//   ,
//   { "id": 23, "title": "e-dsdvsdmsslad", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 47, "count": 14 }, "stock": 14, "sellerID": "hossamahmed@gmail.com" },
//   { "id": 23, "title": "efsd;l,;l", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 17 }, "stock": 15, "sellerID": "hossamahmed62@gmail.com" },

//   { "id": 23, "title": "e-dv;cdavader", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 21 }, "stock": 18, "sellerID": "hossamahmed8862@gmail.com" }
//   ,
//   { "id": 23, "title": "e-commerce", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 47, "count": 14 }, "stock": 14, "sellerID": "hossamahmed@gmail.com" },
//   { "id": 23, "title": "e-user", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 17 }, "stock": 15, "sellerID": "hossamahmed62@gmail.com" },
//   { "id": 23, "title": "e-commerce-user", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 21 }, "stock": 18, "sellerID": "hossamahmed8862@gmail.com" }
//   ,
//   { "id": 23, "title": "fantssdv", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 47, "count": 14 }, "stock": 14, "sellerID": "hossamahmed@gmail.com" },
//   { "id": 23, "title": "e-sdfasd;lvs", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 17 }, "stock": 15, "sellerID": "hossamahmed62@gmail.com" },
//   { "id": 23, "title": "e-kscdlkk;slkver", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 21 }, "stock": 18, "sellerID": "hossamahmed8862@gmail.com" }
//   ,
//   { "id": 23, "title": "e-dsdvsdmsslad", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 47, "count": 14 }, "stock": 14, "sellerID": "hossamahmed@gmail.com" },
//   { "id": 23, "title": "efsd;l,;l", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 17 }, "stock": 15, "sellerID": "hossamahmed62@gmail.com" },

//   { "id": 23, "title": "e-dv;cdavader", "price": 12.8, "description": "l,fsdfsdmfnfljdsndsvndvndsvndsvndshvbsdkjvsvshvja", "category": "888", "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "rating": { "rate": 8, "count": 21 }, "stock": 18, "sellerID": "hossamahmed8862@gmail.com" }

// ]
