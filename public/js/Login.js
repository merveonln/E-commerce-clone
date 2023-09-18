document.querySelector(".girisYap").addEventListener("click", function (event) {
  event.preventDefault(); // Sayfanın yeniden yüklenmesini engellemek için

  let girilenEmail = document.querySelector(".kayıtlıMail").value;
  let girilenSifre = document.querySelector(".kayıtlıSifre").value;

  let kullanicilar = JSON.parse(localStorage.getItem("kullanicilar")) || [];

  let girisKontrol = false;
  for (const element of kullanicilar) {
    if (girilenEmail == element.mail && girilenSifre == element.sifre) {
      girisKontrol = true;
      break;
    }
  }

  if (girisKontrol) {
    window.location.href = "index.html";
    localStorage.setItem("girisKontrol", true);
  } else {
    document.querySelector(".errorAut").innerHTML =
      "Kullanıcı Adı veya Şifre Hatalı!";
    localStorage.setItem("girisKontrol", false);
  }
});

document.querySelector(".showPassword").addEventListener("change", function () {
  let girilenSifre = document.getElementById("exampleInputPassword1");
  let passwordToggle = document.querySelector(".password-toggle");

  if (this.checked) {
    girilenSifre.type = "text";
    passwordToggle.innerHTML = "Hide Password";
  } else {
    girilenSifre.type = "password";
    passwordToggle.innerHTML = "Showw Password";
  }
});
