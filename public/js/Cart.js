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

function writeCartItems() {
  const cartTable = document.querySelector(".products");
  cartTable.innerHTML = "";
  productData.forEach((item) => {
    cartTable.innerHTML += `
          <tr>
            <td class="p-3">
              <div class="d-flex align-items-center">
                <img height="100px" class="fotograf" src="${
                  item.image
                }" alt="product-image">
                <div class="my-auto ms-5">
                  <h5 class="fw-bold baslik">${item.name}</h5>
                  <h6 class="urunID">Web ID: 1089772</h6>
                </div>
              </div>
            </td>
            <td class="text-center">
              <h5 class="fw-bold fiyat">${item.price}</h5>
            </td>
            <td class="text-center butonlar">
              <div class="d-flex align-items-center justify-content-center">
                <button id="arttir" class="border-secondary me-1">+</button>
                <div class="adet border border-1 w-50 h-100 p-1 text-center">${
                  item.quantity
                }</div>
                <button id="azalt" class="border-secondary ms-1">-</button>
              </div>
            </td>
            <td class="text-center">
              <div class="p-2">
                <h5 class="toplamFiyat fw-bold d-inline-block">${
                  item.quantity * parseFloat(item.price)
                }</h5>
                <i class="fa-solid btnClose fa-square-xmark float-end fs-2 ms-1"></i>
              </div>
            </td>
          </tr>
        `;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const storedData = localStorage.getItem(productDataKey);
  if (storedData) {
    productData = JSON.parse(storedData);
    shoppingBoxCount();
    writeCartItems(); // Sepet ürünlerini yazdır
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function increaseValue(index) {
  productData[index].quantity++;
  localStorage.setItem(productDataKey, JSON.stringify(productData));
  writeCartItems();
}

function decreaseValue(index) {
  if (productData[index].quantity > 1) {
    productData[index].quantity--;
    localStorage.setItem(productDataKey, JSON.stringify(productData));
    writeCartItems();
  }
}

function deleteItem(index) {
  productData.splice(index, 1);
  localStorage.setItem(productDataKey, JSON.stringify(productData));
  shoppingBoxCount();
  writeCartItems();
}

function writeCartItems() {
  const cartTable = document.querySelector(".products");
  cartTable.innerHTML = "";
  productData.forEach((item, index) => {
    cartTable.innerHTML += `
          <tr>
            <td class="p-3">
              <div class="d-flex align-items-center">
                <img height="100px" class="fotograf" src="${
                  item.image
                }" alt="product-image">
                <div class="my-auto ms-5">
                  <h5 class="fw-bold baslik">${item.name}</h5>
                  <h6 class="urunID">Web ID: 1089772</h6>
                </div>
              </div>
            </td>
            <td class="text-center">
              <h5 class="fw-bold fiyat">${item.price}</h5>
            </td>
            <td class="text-center butonlar">
              <div class="d-flex align-items-center justify-content-center">
                <button onclick="increaseValue(${index})" class="border-secondary me-1">+</button>
                <div class="adet border border-1 w-50 h-100 p-1 text-center">${
                  item.quantity
                }</div>
                <button onclick="decreaseValue(${index})" class="border-secondary ms-1">-</button>
              </div>
            </td>
            <td class="text-center">
              <div class="p-2">
                <h5 class="toplamFiyat fw-bold d-inline-block">${
                  item.quantity * parseFloat(item.price)
                }</h5>
                <i onclick="deleteItem(${index})" class="fa-solid btnClose fa-square-xmark float-end fs-2 ms-1"></i>
              </div>
            </td>
          </tr>
        `;
  });

  // Eco Tax'ı hesapla
  const ecoTax = calculateEcoTax();

  // Card Sub Total'u hesapla
  const cardSubTotal = calculateCardSubTotal();

  // Toplam fiyatı hesapla
  const totalPrice = cardSubTotal + parseFloat(ecoTax);

  // Toplam fiyatı HTML'e yazdır
  const totalPriceElement = document.getElementById("result");
  totalPriceElement.textContent = totalPrice.toFixed(2);

  // Eco Tax'ı HTML'e yazdır
  const ecoTaxElement = document.getElementById("ecoTax");
  ecoTaxElement.textContent = ecoTax;

  // Card Sub Total'u HTML'e yazdır
  const cardSubTotalElement = document.getElementById("totalPrice");
  cardSubTotalElement.textContent = cardSubTotal.toFixed(2);

  // Kargo ücretini hesapla ve HTML'e yazdır
  const shippingCostElement = document.getElementById("shippingCost");
  const shippingCost = calculateShippingCost(totalPrice);
  if (totalPrice < 250) {
    shippingCostElement.textContent = "Free";
  } else {
    shippingCostElement.textContent = "5.90$";
    totalPriceElement.textContent = (totalPrice + 5.9).toFixed(2);
  }
}

function calculateEcoTax() {
  let ecoTax = 0;

  productData.forEach((item) => {
    ecoTax += 10.62 * item.quantity;
  });

  return ecoTax.toFixed(2);
}

function calculateShippingCost(totalPrice) {
  // Kargo ücretini hesapla (örneğin, 5.90$ olarak)
  let shippingCost = 5.9;

  return shippingCost;
}

function calculateCardSubTotal() {
  let totalPrice = 0;

  productData.forEach((item) => {
    totalPrice += item.quantity * parseFloat(item.price);
  });

  return totalPrice;
}
