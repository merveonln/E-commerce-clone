let cartItems = []; // Ürünleri tutmak için boş bir dizi oluşturuldu

function addToCart() {
  var productCard = this.closest(".card");
  var productImage = productCard.querySelector(".card-img-top").src;
  var productName = productCard.querySelector(".card-text").textContent;
  var productPrice = productCard.querySelector(".card-title").textContent;

  var product = {
    image: productImage,
    name: productName,
    price: productPrice,
  };

  cartItems.push(product); // Ürünü sepete ekle
  updateCartItemCount();
  updateCartItems();
  saveCartItemsToLocalStorage(); // Sepet bilgilerini localStorage'e kaydet
}

function updateCartItemCount() {
  const littleBox = document.querySelector(".little-box");
  if (littleBox) {
    littleBox.innerHTML = cartItems.length; // Ürün sayısını güncelle
  }
}

function updateCartItems() {
  // Sepet öğelerini görüntülemek için gerekli işlemler yapılabilir
  // Örneğin, sepet öğelerini bir liste içinde HTML'e ekleyebilirsiniz
  // Örneğin:
  const cartList = document.querySelector("#cart-list");
  cartList.innerHTML = ""; // Önceki sepet öğelerini temizle

  cartItems.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.textContent = item.name + " - " + item.price;
    cartList.appendChild(listItem);
  });
}

function saveCartItemsToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Ürünleri localStorage'e kaydet
}

const addToCartButtons = document.querySelectorAll(".btn.bg-grey.btn-grey");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    addToCart.call(button); // "this" referansını düğmeye atayarak addToCart fonksiyonunu çağır
  });
});

// Sayfa yüklendiğinde localStorage'deki verileri geri yükle (eğer varsa)
window.addEventListener("load", function () {
  const savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    cartItems = JSON.parse(savedCartItems); // localStorage'deki verileri geri yükle
    updateCartItemCount();
    updateCartItems();
  }
});
