document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productList = document.getElementById("productList");
  const ulCategories = document.getElementById("categoryFilters");
  const reviewingList = document.getElementById("reviewingList");
  const reviewSection = document.getElementById("reviewing");
  const cardsHolder = document.getElementById("cards-holder");
  const selectView = document.getElementById("selectView");
  const tableHolder = document.getElementById("tableHolder");
  const cardwarrpper = document.querySelector(".cardwarrpper");

  let products = [];
  let waitReview = [];

  (function () {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.role == "admin") reviewSection.remove();

    fetch("../../json_data/Products.json")
      .then((response) => response.json())
      .then((stored) => {
        let oldProducts = JSON.parse(localStorage.getItem("products"));
        if (oldProducts) {
          products = oldProducts;
        } else {
          products = stored;
          localStorage.setItem("products", JSON.stringify(stored));
        }
        renderProducts(products);
        renderCategories();
        isWaitingListEmpty();
      });

    waitReview = JSON.parse(localStorage.getItem("waitReview")) || [];
  })();

  function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
  }

  function saveWaitReview() {
    localStorage.setItem("waitReview", JSON.stringify(waitReview));
  }

  function renderProducts(showProducts) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    productList.innerHTML = "";
    cardsHolder.innerHTML = "";
    reviewingList.innerHTML = "";

    showProducts
      .filter((product) => {
        if (currentUser.role === "seller") {
          return product.sellerID === currentUser.email;
        } else return product;
      })
      .forEach((product, index) => {
        productList.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td><img src="${product.image}" alt="${product.title}"></td>
            <td style="width:50px;"><p class="line-clamp-title">${product.title}</p></td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>
              <div class="d-flex align-items-center justify-content-center gap-2">
                <button class="btn btn-primary btn-sm" onclick="editProduct(${product.id}, ${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id}, ${index})">Delete</button>
              </div>
            </td>
          </tr>`;

        cardsHolder.innerHTML += `
          <div class="card col-12 col-md-4 p-1" style="width: 18rem;">
            <div class="card-header h-50 text-center d-flex align-items-center justify-content-center">
              <img src="${product.image}" class="card-img-top" alt="${product.image}" style="width: 8rem; height:fit-content">
            </div>
            <div class="card-body h-40">
              <h5 class="card-title line-clamp-title">${product.title}</h5>
              <p class="card-text line-clamp-card">${product.description}</p>
              <div class="d-flex flex-column gap-2 justify-content-center">
                <p>Price: <b>${product.price}$</b></p>
                <p>Category: <b>${product.category}</b></p>
                <p>Rate: <b>${product.rating.rate}</b></p>
                <p>Count: <b>${product.rating.count}</b></p>
                <p>Stock: <b>${product.stock}</b></p>
              </div>
              <div class="card-footer h- bg-white d-flex mt-5 align-items-center gap-3 justify-content-center">
                <button class="btn btn-primary btn-sm" style="width:70%;" onclick="editProduct(${product.id}, ${index})">Edit</button>
                <button class="btn btn-danger btn-sm" style="width:30%;" onclick="deleteProduct(${product.id}, ${index})">Delete</button>
              </div>
            </div>
          </div>`;
      });

    if (currentUser.role === "seller") {
      let waitingList = waitReview.filter((product) => product.sellerID === currentUser.email);
      if (waitingList.length === 0) {
        reviewingList.parentElement.innerHTML = `<p class="text-center">Your product that is under review will appear here</p>`;
      }
      waitingList.forEach((product, index) => {
        reviewingList.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td><img src="${product.image}" alt="${product.title}"></td>
            <td style="width:50px;"><p class="line-clamp-title">${product.title}</p></td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td style="width:50px;"><p>${product.sellerID}</p></td>
            <td>
              <div class="d-flex align-items-center justify-content-center gap-2">
                <button class="btn btn-danger btn-sm" onclick="deleteProductOnReviewing(${index})">Delete</button>
              </div>
            </td>
          </tr>`;
      });
    }
  }

  window.editProduct = (id, index) => {
    const product = products.find((pro) => pro.id == id);
    document.getElementById("productId").value = index;
    document.getElementById("name").value = product.title;
    document.getElementById("price").value = product.price;
    document.getElementById("description").value = product.description;
    document.getElementById("category").value = product.category;
    document.getElementById("image").value = product.image;
    document.getElementById("rate").value = product.rating.rate;
    document.getElementById("count").value = product.rating.count;
    document.getElementById("stock").value = product.stock;
    window.scrollTo(0, 0);
  };

  window.deleteProduct = (id, index) => {
    products.splice(index, 1);
    saveProducts();
    renderProducts(products);
    renderCategories();
  };

  productForm.addEventListener("submit", (event) => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    event.preventDefault();
    if (!productForm.checkValidity()) {
      event.stopPropagation();
      productForm.classList.add("was-validated");
      return;
    }

    const index = document.getElementById("productId").value;
    const product = {
      id: index ? products[index].id : Date.now(),
      title: document.getElementById("name").value,
      price: parseFloat(document.getElementById("price").value),
      description: document.getElementById("description").value,
      category: document.getElementById("category").value,
      image: document.getElementById("image").value,
      rating: {
        rate: parseFloat(document.getElementById("rate").value),
        count: parseInt(document.getElementById("count").value),
      },
      stock: parseFloat(document.getElementById("stock").value),
      sellerID: currentUser.email,
      discount: index ? products[index].discount : 0
    };

    if (currentUser.role == "admin") {
      if (index) {
        products[index] = product;
      } else {
        products.push(product);
      }
      saveProducts();
    } else if (currentUser.role === "seller") {
      waitReview.push(product);
      saveWaitReview();
      isWaitingListEmpty();

    }

    renderProducts(products);
    renderCategories();
    productForm.reset();
    productForm.classList.remove("was-validated");
  });

  function renderCategories() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let uniqueCategories = [];
    if (currentUser.role == "admin") {
      uniqueCategories = [...new Set(products.map(product => product.category))];
    } else if (currentUser.role == "seller") {
      uniqueCategories = [...new Set(products.filter((product) => product.sellerID === currentUser.email).map(product => product.category))];
    }

    ulCategories.innerHTML = `<li class="nav-item dropdown-item active">ALL</li>`;
    uniqueCategories.forEach(category => {
      ulCategories.innerHTML += `<li class="nav-item dropdown-item text-capitalize">${category}</li>`;
    });

    document.querySelectorAll(".nav-item.dropdown-item").forEach(li => {
      li.addEventListener("click", (e) => {
        let filterCategory = e.target.innerText.toLowerCase();
        ulCategories.childNodes.forEach(li => {
          li.classList.remove("active")
        });
        e.target.classList.add("active")

        let filteredProducts = filterCategory === "all" ? products : products.filter(product => product.category.toLowerCase() === filterCategory);
        renderProducts(filteredProducts);
      });
    });
  }

  function ChangeView(View) {
    if (View === "table") {
      tableHolder.style.display = "block";
      cardwarrpper.style.display = "none";
    }
    if (View === "cards") {
      cardwarrpper.style.display = "block";
      tableHolder.style.display = "none";
    }
    localStorage.setItem("view", View);
  }

  selectView.addEventListener("change", function (e) {
    ChangeView(e.target.value);
  });

  if (localStorage.getItem("view")) {
    ChangeView(localStorage.getItem("view"));
    selectView.value = localStorage.getItem("view");
  }

  window.deleteProductOnReviewing = (index) => {
    let reviewingListProducts = waitReview;
    reviewingListProducts.splice(index, 1);
    saveWaitReview();
    renderProducts(products);
  }

  function isWaitingListEmpty() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let waitingList = waitReview.filter((product) => product.sellerID === currentUser.email);
    if (waitingList.length === 0) {
      reviewingList.parentElement.innerHTML = `< p class="text-center" > Your product that is under review will appear here</ > `;
    }
  }
});
