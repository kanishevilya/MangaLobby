const btnJoinUs = document.querySelector(".btn__first");

btnJoinUs.addEventListener("click", () => {
  location.href = "../html/signup.html";
});

const btnToCart = document.querySelector(".btn__second");

btnToCart.addEventListener("click", () => {
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

const btnLogin = document.querySelector(".fourth__btn");

btnLogin.addEventListener("click", () => {
  location.href = "../html/login.html";
});

const btnShowMore = document.querySelector(".third__btn");

btnShowMore.addEventListener("click", () => {
  location.href = "../html/catalog.html";
});
