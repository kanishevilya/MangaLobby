const userName = document.querySelector(".name");
const userEmail = document.querySelector(".email");
const userPassword = document.querySelector(".password");
const btn = document.querySelector(".signup");

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

btn.addEventListener("click", () => {
  if (userName.value == "" || userName.value == " " || userEmail.value == "" || userPassword.value == "") {
    return;
  }
  if (emailReg.test(userEmail.value)) {
    if (passReg.test(userPassword.value)) {
      let userArr = JSON.parse(localStorage.getItem("userArr"));
      console.log(userArr);
      if (userArr == null) {
        console.log(1);
        userArr = [];
        userArr.push({ userName: userName.value, userEmail: userEmail.value, userPassword: userPassword.value });
        Swal.fire({
          title: "You have registered",
          confirmButtonText: "OK",
        }).then((e) => {
          localStorage.setItem("userArr", JSON.stringify(userArr));
          window.location.href = "../html/login.html";
        });
      } else {
        for (let i = 0; i < userArr.length; i++) {
          if (userArr[i].userName == userName.value) {
            Swal.fire({
              title: "This name is already in use",
              confirmButtonText: "OK",
            });
            return;
          }
          if (userArr[i].userEmail == userEmail.value) {
            Swal.fire({
              title: "This mail is already in use",
              confirmButtonText: "OK",
            }).then((res) => {
              window.location.href = "../html/login.html";
            });
            return;
          }
        }

        userArr.push({ userName: userName.value, userEmail: userEmail.value, userPassword: userPassword.value });
        Swal.fire({
          title: "You have registered",
          confirmButtonText: "OK",
        }).then((e) => {
          localStorage.setItem("userArr", JSON.stringify(userArr));
          window.location.href = "../html/login.html";
        });
      }
    } else {
      Swal.fire({
        title: "Enter a password of type 123456Aa@$!%*?&",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } else {
    Swal.fire({
      title: "Enter email by type aaaaa@gmail.com",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
});
