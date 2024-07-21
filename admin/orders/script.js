document.addEventListener("DOMContentLoaded", function () {
  // fetch('../../json_data/save.json')
  //   .then(response => response.json())
  //   .then(data => localStorage.setItem('orders', JSON.stringify(data)))
  const ordersContainer = document.getElementById('ordersContainer')
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  let allorders = JSON.parse(localStorage.getItem("orders")) || [];
  // console.log(allorders[0].email);
  // console.log(currentUser);
  // console.log(currentUser.email);
  // console.log(currentUser.role);
  let FilterOrders = allorders.filter((product) => {
    return currentUser.role == "admin" ? product : product.email == currentUser.email
  })
  // console.log(FilterOrders);
  for (let i = 0; i < FilterOrders.length; i++) {
    let order = document.createElement("details")
    order.classList = "orderwarrpper row rounded-3 overflow-hidden justify-content-center align-items-start py-2"
    let orderOwner = document.createElement("summary")
    orderOwner.classList = "col-12 col-md-4 me-auto d-felx w-100 p-3 "
    orderOwner.innerHTML = `
            <table class="w-100">
              <tr>
                <td>${FilterOrders[i].firstName + " " + FilterOrders[i].lastName}</td>
                <td>${FilterOrders[i].email}</td>
                <td>${FilterOrders[i].phone}</td>
                <td> ${FilterOrders[i].address}</td>
              </tr>
            </table>           
              `
    order.append(orderOwner)

    let orderInfo = document.createElement("div")
    orderInfo.classList = "d-flex gap-1 justify-content-center flex-wrap"
    for (let k = 0; k < FilterOrders[i]?.cart?.length; k++) {
      let singleProduct = document.createElement('div')
      singleProduct.classList = "card flex-1 col-md-4 p-2"
      singleProduct.innerHTML = ` 
      <div class="card-header h-50 text-center d-flex align-items-center justify-content-center">
          <img src="${FilterOrders[i].cart[k].image}" class="card-img-top " alt="${FilterOrders[i].cart[k].title}" style="width: 8rem; height:fit-content">
      </div>
      <div class="card-body h-40">
          <p class="card-title line-clamp-title">${FilterOrders[i].cart[k].title}</p>
      </div>
      <div class="row gap-2 justify-content-center">
          <p>Price: <b>${FilterOrders[i].cart[k].price}$</b></p=>
          <p>quantity: <b>${FilterOrders[i].cart[k].quantity}</b></p>
          </div>
          `
      // <p>Category: <b>${allorders[i].cart[k].category}</b></p>
      // <p>SellerEmail: <b>${allorders[i].cart[k].sellerID}</b></p>
      orderInfo.append(singleProduct)
    }
    order.append(orderInfo)
    ordersContainer.appendChild(order)
    ordersContainer.appendChild(document.createElement("hr"))
  }
})