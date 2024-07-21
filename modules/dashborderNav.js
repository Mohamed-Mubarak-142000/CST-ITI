// check is there is login in to seller or admin

(function () {
  let curUser = JSON.parse(localStorage.getItem("currentUser"))
  if (!curUser) {
    location.replace("../../login_sys/login.html");
  } else if (curUser.role == "customer") {
    location.replace("../../home/home.html");
  } //else location.replace("../products/products.html");
}
)()
// hide-show Navbar
const sideBar = document.getElementById("sidebar")
const hideToggle = document.getElementById("menu-toggle-hide")
const showToggle = document.getElementById("menu-toggle-show")
const deleteMyAccount = document.querySelector("#DeleteMyAccount button")
const Home = document.getElementById('Home')
const Products = document.getElementById('Products')
const Users = document.getElementById('Users')
const Orders = document.getElementById('Orders')
const Offers = document.getElementById('Offers')
const Review = document.getElementById('Review')
const Complains = document.getElementById('Complains')
const Logout = document.getElementById('Logout')

deleteMyAccount.href = ""

hideToggle.addEventListener("click", function () {
  sideBar.classList.toggle("active")
  showToggle.style.display = "block"
})
showToggle.addEventListener("click", function () {
  sideBar.classList.toggle("active");
  showToggle.style.display = "none"
})

// hide statsictrsc and users from dashbord for sellers
const currentUser = JSON.parse(localStorage.getItem("currentUser"))
if (currentUser?.role == "seller") {
  Home.remove()
  Users.remove()
  Complains.remove()
  Review.remove()
} else deleteMyAccount.remove()

// Log out whatever is admin of seller
Logout.style.cursor = 'pointer'
Logout.addEventListener("click", function () {
  localStorage.removeItem("currentUser")
  location.replace("../../login_sys/login.html");
})

//  seller delete his account himself
deleteMyAccount.addEventListener("click", function (e) {
  let restOfUsers = JSON.parse(localStorage.getItem("users")).filter((user) => user.email != currentUser.email)
  let allProductsAfterDeleteSellerProduct = JSON.parse(localStorage.getItem("products")).filter((Product) => Product.sellerID != currentUser.email)

  console.log(restOfUsers);
  console.log(allProductsAfterDeleteSellerProduct);
  let confirmFromUser = confirm("Are you sure want to delete you account??")
  if (confirmFromUser) {
    let again = confirm("all products will be deleted")
    if (again) {
      localStorage.setItem("users", JSON.stringify(restOfUsers))
      localStorage.setItem("products", JSON.stringify(allProductsAfterDeleteSellerProduct))
      localStorage.removeItem("currentUser")
      location.replace("../../login_sys/login.html");
    }
  }
})