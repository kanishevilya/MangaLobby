const nameTitle = document.querySelector(".name");
const email = document.querySelector(".email");
const btn__unsign = document.querySelector(".btn__unsign");
window.onload = () => {
  btn__unsign.addEventListener("click", () => {
    localStorage.setItem("CurrentUser", JSON.stringify(null));
    window.location.href = "../html/login.html";
  });

  console.log(localStorage.getItem("CurrentUser") == null);
  console.log(localStorage.getItem("CurrentUser"));
  console.log(null);
  if (JSON.parse(localStorage.getItem("CurrentUser")) == null) {
    return;
  }
  let user = JSON.parse(localStorage.getItem("CurrentUser"));
  nameTitle.textContent = user.userName;
  email.textContent = user.userEmail.toLowerCase();
};
