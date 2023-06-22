const header__logo = document.querySelector(".header__logo");
header__logo.addEventListener("click", () => {
  window.location.href = "../index.html";
});
const header__acc__block = document.querySelector(".header__acc__block");
header__acc__block.addEventListener("click", () => {
  if (JSON.parse(localStorage.getItem("CurrentUser")) != null) {
    window.location.href = "../html/account.html";
  } else {
    if (window.location.href.indexOf("login") == -1 && window.location.href.indexOf("signup") == -1) {
      Swal.fire({
        title: "Youre doesn't login",
        confirmButtonText: "OK",
      }).then((result) => {
        window.location.href = "../html/login.html";
      });
    }
  }
});

const header__cart__block = document.querySelector(".header__cart__block");
header__cart__block.addEventListener("click", () => {
  if (JSON.parse(localStorage.getItem("CurrentUser")) != null) {
    window.location.href = "../html/cart.html";
  } else {
    if (window.location.href.indexOf("login") == -1 && window.location.href.indexOf("signup") == -1) {
      Swal.fire({
        title: "Youre doesn't login",
        confirmButtonText: "OK",
      }).then((result) => {
        window.location.href = "../html/login.html";
      });
    }
  }
});

const footerLogo = document.querySelector(".logo");
footerLogo.addEventListener("click", () => {
  window.location.href = "../index.html";
});
const insta = document.querySelector(".footer__insta");
insta.addEventListener("click", () => {
  window.open("https://www.instagram.com/ilya.celebrimbor/");
});
