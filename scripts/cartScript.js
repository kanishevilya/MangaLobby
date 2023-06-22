const manga__list = document.querySelector(".manga__list");

let arr = JSON.parse(localStorage.getItem("ApiArray"));
let CartIdArray = JSON.parse(localStorage.getItem("CartIdArray"));
const btn = document.querySelector(".order__btn");
function getHtmlBlock(url, title, author, price, cnt) {
  return `<img src="${url}" alt="" class="order__img">
                <div class="order__main">
                    <h1 class="title">
                        ${title}
                    </h1>
                    <h3 class="author">${author}</h3>
                    <p class="more">M O R E</p>
                    <span class="price">Price: <span class="price__value">${price}$</span>
                    </span>
                    <div class="main__lower__part">
                        <p class="count">Count:</p> <p class="count__value">${cnt}</p> <p class="plus">+</p>
                                <p class="minus">-</p>

                        <h1 class="delete">DELETE</h1>
                    </div>
                </div>`;
}

function getTitle(array, i) {
  return array[i].alternative_titles.english == undefined ? (array[i].alternative_titles.synonyms == undefined ? array[i].alternative_titles.japanese : array[i].alternative_titles.synonyms.split(",")[0]) : array[i].alternative_titles.english;
}
function calcSum() {
  let sum = 0;
  for (let order of CartIdArray) {
    sum += arr[order.id].price * order.cnt;
  }
  let total = document.querySelector(".total");
  total.textContent = sum.toFixed(1) + "$";
}
function updateCartIdArr(idx, add) {
  CartIdArray[idx].cnt = +CartIdArray[idx].cnt + add;
  localStorage.setItem("CartIdArray", JSON.stringify(CartIdArray));
  setCartIdArray(CartIdArray);
}
window.onload = () => {
  if (CartIdArray == null) {
    return;
  }
  manga__list.innerHTML = ``;
  for (let order of CartIdArray) {
    let block = document.createElement("div");
    block.classList.add("order");
    let url = arr[order.id].picture_url;
    let title = getTitle(arr, order.id);
    let author = arr[order.id].information.authors
      .map((value) => {
        return value.name;
      })
      .join(" | ");
    let price = arr[order.id].price;
    block.innerHTML = getHtmlBlock(url, title, author, price, order.cnt);

    let order__main = block.querySelector(".order__main");
    let more = order__main.querySelector(".more");
    let main__lower__part = order__main.querySelector(".main__lower__part");
    let del = main__lower__part.querySelector(".delete");
    let plus = main__lower__part.querySelector(".plus");
    let minus = main__lower__part.querySelector(".minus");
    let count__value = main__lower__part.querySelector(".count__value");

    plus.addEventListener("click", () => {
      console.log(count__value);
      count__value.textContent = +count__value.textContent + 1;
      updateCartIdArr(CartIdArray.indexOf(order), 1);
      calcSum();
    });
    minus.addEventListener("click", () => {
      if (+count__value.textContent == 1) {
        return;
      }
      updateCartIdArr(CartIdArray.indexOf(order), -1);
      count__value.textContent = +count__value.textContent - 1;
      calcSum();
    });

    calcSum();
    del.addEventListener("click", (e) => {
      //delete info in LS and block remove
      e.preventDefault();
      console.log(CartIdArray.indexOf(order));
      CartIdArray.splice(CartIdArray.indexOf(order), 1);
      console.log(CartIdArray);

      localStorage.setItem("CartIdArray", JSON.stringify(CartIdArray));
      block.remove();
      calcSum();
    });

    more.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(1);
      localStorage.setItem("CurrentMorePage", JSON.stringify({ id: +order.id, href: "../html/cart.html" }));
      window.location.href = "../html/more.html";
    });

    manga__list.append(block);
  }
};
function setCartIdArray(arr) {
  let currenUser = JSON.parse(localStorage.getItem("CurrentUser"));
  let usersArray = JSON.parse(localStorage.getItem("userArr"));
  for (let i = 0; i < usersArray.length; i++) {
    if (currenUser.userEmail == usersArray[i].userEmail) {
      usersArray[i]["cart"] = arr;
    }
  }
  localStorage.setItem("userArr", JSON.stringify(usersArray));
}
btn.addEventListener("click", () => {
  if (document.querySelector(".total").textContent.indexOf("0.0$") != -1) {
    return;
  }
  Swal.fire({
    title: "Your order has been sent",
    confirmButtonText: "OK",
  }).then((res) => {
    manga__list.innerHTML = ``;
    CartIdArray = [];

    localStorage.setItem("CartIdArray", JSON.stringify(CartIdArray));

    setCartIdArray(CartIdArray);
    calcSum();
  });
});
