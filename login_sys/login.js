
let userEmail = document.querySelector("input[type=email]");
let pass = document.querySelector("input[type=password]");
let creatAcccount = document.querySelector(".creatAcc");

(function () {
  // let currentUser = JSON.parse(localStorage.getItem("currentUser"))
  // if (currentUser?.role == "admin" || currentUser.role == "customer") {
  //   location.replace('../admin/products/products.html')
  // } else location.replace('../home/home.html')

  // add admin account hard coded
  let admin = {
    fName: "hossam",
    lName: 'ahmed',
    email: "admin@iti.com",
    password: 123456,
    role: "admin"
  }
  localStorage.setItem("admin", JSON.stringify(admin))
}

)()

creatAcccount.addEventListener("click", () => location.replace("./singup.html"))


function isInDataBase() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (userEmail.value == admin.email && pass.value == admin.password) {
    localStorage.setItem("currentUser", JSON.stringify(admin));
    location.replace("../admin/products/products.html");
  } else if (users.length > 0) {
    const currentUser = users.find((user) => user.email === userEmail.value);

    if (currentUser) {
      if (pass.value === currentUser.password) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        const redirectUrl = currentUser.role === "seller" ? "../admin/products/products.html" : "../home/home.html";
        location.replace(redirectUrl);
      } else {
        displayErrorMsg();
      }
    } else {
      displayErrorMsg();
    }
  } else {
    displayErrorMsg();
  }
}

function displayErrorMsg() {

  document.querySelector('.NotFounUser').innerText = 'Password or Email is incorrect'
  document.querySelector('.NotFounUser').classList.remove("hiddeElement")
  setTimeout(function () {
    document.querySelector('.NotFounUser').classList.add("hiddeElement")
  }, 5000)
}


(function () {
  "use strict";
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          isInDataBase()
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();