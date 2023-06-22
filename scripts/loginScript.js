const userEmail = document.querySelector(".email");
const userPassword = document.querySelector(".password");
const btn = document.querySelector(".login");

btn.addEventListener("click", () => {
  let userArr = JSON.parse(localStorage.getItem("userArr"));
  if (userArr != null) {
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].userEmail == userEmail.value && userArr[i].userPassword === userPassword.value) {
        localStorage.setItem("CurrentUser", JSON.stringify(userArr[i]));
        window.location.href = "../html/account.html";
        localStorage.setItem("CartIdArray", JSON.stringify(userArr[i].cart == undefined ? null : userArr[i].cart));
        return;
      }
    }
    Swal.fire({
      title: "InCorrect data",
      icon: "error",
      confirmButtonText: "OK",
    }).then((e) => {});
  } else {
    Swal.fire({
      title: "InCorrect data",
      icon: "error",
      confirmButtonText: "OK",
    }).then((e) => {});
  }
});
