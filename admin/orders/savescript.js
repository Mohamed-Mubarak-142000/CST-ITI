document.addEventListener("DOMContentLoaded", function () {
  // fetch('../../json_data/save.json')
  //   .then(response => response.json())
  //   .then(data => localStorage.setItem('orders', JSON.stringify(data)))
  const ordersContainer = document.getElementById('ordersContainer')

  let allorders = JSON.parse(localStorage.getItem("orders")) || []
  // [{ "firstName": "Shehab", "lastName": "Gamal", "email": "Shehabgamal623@gmail.com", "address": "1 st elmadina ", "phone": "01207884438", "paymentMethod": "visa", "cart": [{ "id": 2, "title": "Mens Casual Premium Slim Fit T-Shirts ", "price": 22.3, "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.", "category": "men's clothing", "image": "https://fakestoreapi.com/img/71-3HjGNDUL.AC_SY879._SX._UX._SY._UY.jpg", "rating": { "rate": 4.1, "count": 259 }, "sellerID": "hossam@iti.come", "quantity": 1 }, { "id": 1, "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL.AC_SL1500.jpg", "rating": { "rate": 3.9, "count": 120 }, "sellerID": "hossam@iti.come", "quantity": 1 }, { "id": 8, "title": "Pierced Owl Rose Gold Plated Stainless Steel Double", "price": 10.99, "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel", "category": "jewelery", "image": "https://fakestoreapi.com/img/51UDEzMJVpL.AC_UL640_QL65_ML3.jpg", "rating": { "rate": 1.9, "count": 100 }, "sellerID": "mohamed@iti.come", "quantity": 1 }, { "id": 11, "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5", "price": 109, "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.", "category": "electronics", "image": "https://fakestoreapi.com/img/71kWymZ+c+L.AC_SX679.jpg", "rating": { "rate": 4.8, "count": 319 }, "sellerID": "mohamed@iti.come", "quantity": 1 }], "cardName": "shehab gamal", "cardNumber": "1234567894561231", "cardCVV": "752" }]
  for (let i = 0; i < allorders.length; i++) {
    const order = document.createElement("div")
    order.classList = "orderwarrpper"
    let orderOwner = document.createElement('div')
    orderOwner.classList = "row  justify-content-between"
    orderOwner.style.border = "3px dashed orange"
    orderOwner.innerHTML = `
              <h5 class="col-12 col-md-6">Name: ${allorders[i].firstName + " " + allorders[i].lastName}</h5>
              <h5 class="col-12 col-md-6">Email: ${allorders[i].email}</h5>
               <h5 class="col-12 col-md-6">payment: ${allorders[i].paymentMethod}</h5>
               <h5 class="col-12 col-md-6">phone: ${allorders[i].phone}</h5>
               <h5 class="col">address: ${allorders[i].address}</h5>
               `
    order.append(orderOwner)

    let orderInfo = document.createElement("div")
    orderInfo.classList = "row  justify-content-center gap-3"
    for (let k = 0; k < allorders[i]?.cart?.length; k++) {
      let singleProduct = document.createElement('div')
      singleProduct.classList = "card col-6 col-md-4 p-1"
      singleProduct.innerHTML = ` 
      <div class="card-header h-50 text-center d-flex align-items-center justify-content-center">
          <img src="${allorders[i].cart[k].image}" class="card-img-top" alt="${allorders[i].cart[k].title}" style="width: 8rem; height:fit-content">
      </div>
      <div class="card-body h-40">
          <h5 class="card-title line-clamp-title">${allorders[i].cart[k].title}</h5>
      </div>
      <div class="d-flex flex-column gap-2 justify-content-center">
          <p>Price: <b>${allorders[i].cart[k].price}$</b></p>
          <p>Category: <b>${allorders[i].cart[k].category}</b></p>
          <p>quantity: <b>${allorders[i].cart[k].quantity}</b></p>
          <p>SellerEmail: <b>${allorders[i].cart[k].sellerID}</b></p>
      </div>
       `
      orderInfo.append(singleProduct)
    }
    order.append(orderInfo)
    ordersContainer.appendChild(order)
    ordersContainer.appendChild(document.createElement("hr"))
  }
})