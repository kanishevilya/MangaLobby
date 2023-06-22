const btnJoinUs = document.querySelector(".btn__first");

btnJoinUs.addEventListener("click", () => {
  location.href = "html/signup.html";
});

const btnToCart = document.querySelector(".btn__second");

btnToCart.addEventListener("click", () => {
  if (JSON.parse(localStorage.getItem("CurrentUser")) != null) {
    window.location.href = "html/cart.html";
  } else {
    if (window.location.href.indexOf("login") == -1 && window.location.href.indexOf("signup") == -1) {
      Swal.fire({
        title: "Youre not logged in",
        confirmButtonText: "OK",
      }).then((result) => {
        window.location.href = "html/login.html";
      });
    }
  }
  //
});

const btnLogin = document.querySelector(".fourth__btn");

btnLogin.addEventListener("click", () => {
  window.location.href = "html/login.html";
});

const btnShowMore = document.querySelector(".third__btn");

btnShowMore.addEventListener("click", () => {
  window.location.href = "html/catalog.html";
});
