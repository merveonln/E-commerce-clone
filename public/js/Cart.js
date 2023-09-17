// localStorage'dan "cartItems" verisini alın
const cartItemsData = localStorage.getItem("cartItems");

// JSON formatındaki veriyi JavaScript dizisine dönüştürün
const cartItems = JSON.parse(cartItemsData);

// Ürünleri HTML tablosunda listelemek için tbody elementini alın
const tbody = document.querySelector(".border");

// Her ürün için işlemleri gerçekleştirin
cartItems.forEach(function (item) {
  const image = item.image;
  const name = item.name;
  const price = item.price;

  // Yeni bir tablo satırı (tr) oluşturun
  const row = document.createElement("tr");

  // İlk sütunun içeriğini oluşturun
  const firstColumn = document.createElement("td");
  firstColumn.classList.add("p-3");

  const div = document.createElement("div");
  div.classList.add("d-flex", "align-items-center");

  const img = document.createElement("img");
  img.height = "100px";
  img.src = image;
  img.alt = name;

  const innerDiv = document.createElement("div");
  innerDiv.classList.add("my-auto", "ms-5");

  const title = document.createElement("h5");
  title.classList.add("fw-bold");
  title.textContent = name;

  const webId = document.createElement("h6");
  webId.textContent = "Web ID: 1089772";

  innerDiv.appendChild(title);
  innerDiv.appendChild(webId);
  div.appendChild(img);
  div.appendChild(innerDiv);
  firstColumn.appendChild(div);
  row.appendChild(firstColumn);

  // İkinci sütunun içeriğini oluşturun
  const secondColumn = document.createElement("td");
  secondColumn.classList.add("text-center");

  const priceHeading = document.createElement("h5");
  priceHeading.classList.add("price", "fw-bold");
  priceHeading.textContent = price;

  secondColumn.appendChild(priceHeading);
  row.appendChild(secondColumn);

  // Üçüncü sütunun içeriğini oluşturun
  const thirdColumn = document.createElement("td");
  thirdColumn.classList.add("text-center");

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add(
    "d-flex",
    "align-items-center",
    "justify-content-center"
  );

  const plusButton = document.createElement("button");
  plusButton.classList.add("border-secondary", "me-1");
  plusButton.textContent = "+";

  const quantityDiv = document.createElement("div");
  quantityDiv.classList.add(
    "border",
    "border-1",
    "w-50",
    "h-100",
    "p-1",
    "text-center"
  );
  quantityDiv.textContent = "1";

  const minusButton = document.createElement("button");
  minusButton.classList.add("border-secondary", "ms-1");
  minusButton.textContent = "-";

  buttonGroup.appendChild(plusButton);
  buttonGroup.appendChild(quantityDiv);
  buttonGroup.appendChild(minusButton);
  thirdColumn.appendChild(buttonGroup);
  row.appendChild(thirdColumn);

  // Dördüncü sütunun içeriğini oluşturun
  const fourthColumn = document.createElement("td");
  fourthColumn.classList.add("text-center");

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("total", "p-2");

  const totalHeading = document.createElement("h5");
  totalHeading.classList.add("fw-bold", "d-inline-block");
  totalHeading.textContent = price;

  const closeIcon = document.createElement("i");
  closeIcon.classList.add(
    "fa-solid",
    "fa-square-xmark",
    "float-end",
    "fs-2",
    "ms-1"
  );

  totalDiv.appendChild(totalHeading);
  totalDiv.appendChild(closeIcon);
  fourthColumn.appendChild(totalDiv);
  row.appendChild(fourthColumn);

  // Tablo satırını tbody'ye ekleyin
  tbody.appendChild(row);
});

// Arttırma butonlarına event listener ekleyin
const plusButtons = document.querySelectorAll("#arttir");
plusButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    // Ürünün miktarını artırın
    const quantityDiv = document.querySelectorAll(
      ".border.border-1.w-50.h-100.p-1.text-center"
    )[index];
    let quantity = parseInt(quantityDiv.textContent);
    quantity++;
    quantityDiv.textContent = quantity.toString();

    // Toplam fiyatı güncelleyin
    const priceHeading = document.querySelectorAll(".price.fw-bold")[index];
    const price = parseFloat(priceHeading.textContent.replace("₺", ""));
    const totalDiv = document.querySelectorAll(".total.p-2")[index];
    const totalHeading = totalDiv.querySelector("h5");
    const total = (price * quantity).toFixed(2);
    totalHeading.textContent = total + "₺";

    // Sepet verisini güncelleyin
    cartItems[index].quantity = quantity;

    // localStorage'daki "cartItems" verisini güncelleyin
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  });
});

// Azaltma butonlarına event listener ekleyin
const minusButtons = document.querySelectorAll("#azalt");
minusButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    // Ürünün miktarını azaltın
    const quantityDiv = document.querySelectorAll(
      ".border.border-1.w-50.h-100.p-1.text-center"
    )[index];
    let quantity = parseInt(quantityDiv.textContent);
    if (quantity > 1) {
      quantity--;
      quantityDiv.textContent = quantity.toString();

      // Toplam fiyatı güncelleyin
      const priceHeading = document.querySelectorAll(".price.fw-bold")[index];
      const price = parseFloat(priceHeading.textContent.replace("₺", ""));
      const totalDiv = document.querySelectorAll(".total.p-2")[index];
      const totalHeading = totalDiv.querySelector("h5");
      const total = (price * quantity).toFixed(2);
      totalHeading.textContent = total + "₺";

      // Sepet verisini güncelleyin
      cartItems[index].quantity = quantity;

      // localStorage'daki "cartItems" verisini güncelleyin
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  });
});
