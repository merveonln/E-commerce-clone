// ! Product Api'si çekildi
const url = "https://fakestoreapi.com/products?limit=3";
document.addEventListener("DOMContentLoaded", function () {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach((Images) => {
        writerProducts(Images);
      });
    });
});

// ! Apileri ekrana basma işlemi
const products = document.querySelector(".products");
function writerProducts(e) {
  products.innerHTML += `
    <div class="col-lg-4">
                <div class="card" >
                  <img
                    src=${e.image}
                    class="card-img-top mt-2"
                    height="600px"
                    alt=""
                  />
                  <div class="card-body text-center">
                    <h5 class="card-title text-orange fw-bold fs-4">${e.price} $</h5>
                    <p class="card-text">${e.title}</p>
                    <a href="#" class="btn bg-grey btn-grey" id="addBtn">
                      <i class="fa-solid fa-cart-shopping"></i> Add To Cart
                    </a>
                  </div>
                </div>
              </div>
  `;
}

const productDataKey = "selectedProducts";
let productData = [];

document.addEventListener("DOMContentLoaded", function () {
  const storedData = localStorage.getItem(productDataKey);
  if (storedData) {
    productData = JSON.parse(storedData);
    shoppingBoxCount();
  }
});

products.addEventListener("click", chooseBtn);

function chooseBtn(e) {
  if (e.target.id.includes("addBtn")) {
    const parentDiv = e.target.parentElement.parentElement;
    const data = {
      image: parentDiv.querySelector(".card-img-top").src,
      name: parentDiv.querySelector(".card-text").textContent,
      price: parentDiv.querySelector(".card-title").textContent,
      quantity: 1, // Başlangıçta adet 1 olarak ayarlanır
    };

    // Eğer aynı ürün daha önce eklenmişse, adetini artır
    const existingItem = productData.find((item) => item.name === data.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      productData.push(data);
    }

    console.log(productData);
    localStorage.setItem(productDataKey, JSON.stringify(productData));
    shoppingBoxCount();
    writeCartItems();
  }
}

function shoppingBoxCount() {
  const littleBox = document.querySelector(".little-box");
  if (littleBox) {
    littleBox.innerHTML = productData.length;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
