document.querySelector(".kayitOl").addEventListener("click", function (event) {
  event.preventDefault(); // Sayfanın yeniden yüklenmesini engellemek için

  let girilenİsim = document.querySelector(".girilenİsim").value;
  let girilenSifre = document.querySelector(".girilenSifre").value;
  let girilenMail = document.querySelector(".girilenMail").value;
  let registerCheck = document.querySelector(".registerCheck");

  // E-posta formatını kontrol etmek için düzenli ifade kullanma
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(girilenMail)) {
    registerCheck.innerHTML = "Geçerli bir e-posta adresi girin!";
    return;
  }

  if (girilenSifre.length > 0) {
    let kullanicilar = JSON.parse(localStorage.getItem("kullanicilar")) || [];
    kullanicilar.push({
      kadi: girilenİsim,
      sifre: girilenSifre,
      mail: girilenMail,
    });

    localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));

    registerCheck.innerHTML = `Kayıt İşlemi Başarılı!`;
  } else {
    registerCheck.innerHTML = "Şifre alanını doldurun!";
    return;
  }
});

document.querySelector(".showPassword").addEventListener("change", function () {
  let girilenSifre = document.getElementById("exampleInputPassword1");
  let passwordToggle = document.querySelector(".password-toggle");

  if (this.checked) {
    girilenSifre.type = "text";
    passwordToggle.innerHTML = "Şifreyi Gizle";
  } else {
    girilenSifre.type = "password";
    passwordToggle.innerHTML = "Şifreyi Göster";
  }
});
