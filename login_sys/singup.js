let signUpBtn = document.querySelector("button[type=submit]")
let fName = document.querySelectorAll("input[type=text]")[0]
let lName = document.querySelectorAll("input[type=text]")[1]
let password = document.querySelectorAll("input[type=password]")[0]
let email = document.querySelectorAll("input[type=email]")[0]
let role = document.querySelector("select")
let haveAcce = document.querySelector(".haveAcc")

haveAcce.addEventListener("click", () => {
  // console.log(password.parentElement.children[password.parentElement.children.length - 1]);
  location.replace("./login.html")
})

function CreateNewUser() {
  const allUsers = JSON.parse(localStorage.getItem("users")) || []

  const userFound = allUsers.filter(user => user.email == email.value)

  if (userFound.length == 0) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*_?&]{8,14}$/igm
    if (!password.value.match(regex)) {

      password.parentElement.children[password.parentElement.children.length - 1].style.display = "block"

    } else if (password.value.match(regex)) {
      password.parentElement.children[password.parentElement.children.length - 1].style.display = "none"

      let newUser = {
        fName: fName.value,
        lName: lName.value,
        email: email.value,
        password: password.value,
        role: role.value
      }
      allUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(allUsers))
      if (role.value == "seller") {
        location.replace("../admin/products/products.html")
      } else location.replace("../home/home.html")

      localStorage.setItem("currentUser", JSON.stringify(newUser))

    } else {
      displauErrorMsg("Password or  Email is incorrect")
    }
  }
}
function displauErrorMsg(msg) {
  document.querySelector('.NotFounUser').innerText = msg
  document.querySelector('.NotFounUser').classList.remove("hiddeElement")
  setTimeout(function () {
    document.querySelector('.NotFounUser').classList.add("hiddeElement")
  }, 5000)
}

function clearForm() {
  fName.value = ""
  lName.value = ""
  email.value = ""
  password.value = ""
  role.valu = ""
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => form.classList.add('was-validated'))
}


(function () {
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        event.preventDefault()
        CreateNewUser()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()