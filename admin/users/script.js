window.addEventListener("DOMContentLoaded", function () {
  // form validation
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
            submitType()
            forms.reset()
          }

          form.classList.add('was-validated')
        }, false)
      })
  })()

  let tbody = document.getElementsByTagName("tbody")[0]
  let tfoot = document.getElementsByTagName("tfoot")[0]
  let fName = document.querySelector('#validationFirstName')
  let lName = document.querySelector('#validationLastName')
  let email = document.querySelector('#validationCustomEmail')
  let password = document.querySelector('#validationPassword')
  let role = document.querySelector('#validationRoleChoice')
  let submit = document.querySelector('button[type=submit]')

  function submitType() {
    if (submit.innerText.toLowerCase() == "add") {
      addUser()
    } else {
      console.log("edit");
      updateUser()
    }
  }
  // getUsers from localStrage
  function getUsers() {
    tbody.innerHTML = ''
    let users = JSON.parse(localStorage.getItem("users"))
    users?.map((user, index) => {
      tbody.innerHTML += `
                  <tr>
                      <td>${index + 1}</td>
                      <td>${user.fName}</td>
                      <td>${user.lName}</td>
                      <td><p id='description'>${user.email}</p></td>
                      <td>${user.password}</td>
                      <td>${user.role}</td>
                    <td>
                        <div class="d-flex align-items-center justify-content-center gap-2">
                            <button class="btn btn-primary btn-sm" onclick="editUser(${index})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
                          </div>  
                    </td>
                    </tr>
                  `
    })
    tfoot.innerHTML = `
              <tr>
                <td colspan="5" class="text-start">Total users</td>
                <td colspan="2">${users.length}</td>
              </tr>
               `
  }
  getUsers()
  // addUser to localStrage
  function addUser() {
    let users = JSON.parse(localStorage.getItem("users")) || []
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*_?&]{8,14}$/igm
    if (password.value.match(regex)) {
      let newUser = {
        fName: fName.value,
        lName: lName.value,
        email: email.value,
        password: password.value,
        role: role.value
      }
      users.push(newUser)
      RerenderAndSetLocalStorage(users)
    } else {
      password.parentElement.children[password.parentElement.children.length - 1].style.display = "block"
    }
  }

  // editUser in localStrage
  let updatedUserIndex;
  window.editUser = function (index) {
    submit.innerText = "Update";
    updatedUserIndex = index + 1;
    let users = JSON.parse(localStorage.getItem("users"))
    fName.value = users[index].fName
    lName.value = users[index].lName
    email.value = users[index].email
    password.value = users[index].password
    role.value = users[index].role
  }
  // Update user data in localStrage
  function updateUser() {
    let users = JSON.parse(localStorage.getItem("users"))
    users[updatedUserIndex - 1].fName = fName.value
    users[updatedUserIndex - 1].lName = lName.value
    users[updatedUserIndex - 1].email = email.value
    users[updatedUserIndex - 1].password = password.value
    users[updatedUserIndex - 1].role = role.value
    RerenderAndSetLocalStorage(users);
  }
  // deleteUser()
  window.deleteUser = function (index) {
    let users = JSON.parse(localStorage.getItem("users"))
    users.splice(index, 1)
    localStorage.setItem("users", JSON.stringify(users))
    getUsers()
  }
  // Render and re-set updated user
  function RerenderAndSetLocalStorage(users) {
    localStorage.setItem("users", JSON.stringify(users))
    getUsers()
    clearForm()
  }
  //  Empty form values
  function clearForm() {
    fName.value = ''
    lName.value = ''
    email.value = ''
    password.value = ''
    role.value = ''
  }
})