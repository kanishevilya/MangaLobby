let arr = JSON.parse(localStorage.getItem("ApiArray"));

const manga__list = document.querySelector(".manga__list");

const inputPriceL = document.querySelector(".left__input__price");
const inputPriceR = document.querySelector(".right__input__price");
const inputName = document.querySelector(".left__input__name");

const filterBtn = document.querySelector(".left__btn");
const select__genre = document.querySelector(".select__genre");

const right__price__select = document.querySelector(".right__price__select");
const right__cnt__select = document.querySelector(".right__cnt__select");

const genresArray = JSON.parse(localStorage.getItem("GenresArray"));

const limitMax = 7;

function getHtmlBlock(src, name, author, price) {
  return `<div class="forImg">
                        <img src="${src}" alt="" class="block__img">
                    </div>
                    <h1 class="manga__name">${name}</h1>
                    <h1 class="manga__author">${author}</h1>
                    <div class="manga__links">
                        <p class="manga__price">${price}$</p>
                        <a href="" class="more__page">Show more</a>
                    </div>`;
}

// list__block;
window.onload = () => {
  inputPriceL.value = 0;
  inputPriceR.value = 1000000;
  genresSettings();
  arr = sortByPriceDir(arr);
  print(arr);
  forPriceInputs();
};

function genresSettings() {
  select__genre.innerHTML = "";
  let option = document.createElement("option");
  option.value = "all";
  option.textContent = "all";
  select__genre.append(option);
  for (let genre of genresArray) {
    option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    select__genre.append(option);
  }
}

function forPriceInputs() {
  function limitString(str, limit = limitMax) {
    if (str.length > limit) {
      return str.slice(0, limit);
    }
    return str;
  }

  function isNumber(val) {
    return val == +val;
  }
  inputPriceL.addEventListener("input", () => {
    inputPriceL.value = sliceToCorrect(inputPriceL);
    console.log(inputPriceL.value);
    if (+inputPriceL.value > +inputPriceR.value) {
      inputPriceR.value = inputPriceL.value;
    }
    inputPriceL.value = limitString(inputPriceL.value);
  });
  inputPriceR.addEventListener("input", () => {
    inputPriceR.value = sliceToCorrect(inputPriceR);
    console.log(inputPriceR.value);
    if (+inputPriceL.value > +inputPriceR.value) {
      inputPriceL.value = inputPriceR.value;
    }
    inputPriceR.value = limitString(inputPriceR.value);
  });
  function sliceToCorrect(inputPrice) {
    if (!isNumber(inputPrice.value[inputPrice.value.length - 1]) && inputPrice.value[inputPrice.value.length - 1] != ".") {
      inputPrice.value = limitString(inputPrice.value, inputPrice.value.length - 1);
    }
    if (inputPrice.value[inputPrice.value.length - 1] == "." && inputPrice.value.indexOf(".") != inputPrice.value.length - 1) {
      inputPrice.value = limitString(inputPrice.value, inputPrice.value.length - 1);
    }
    console.log(inputPrice.value);
    if (inputPrice.value[inputPrice.value.length - 1] != ".") {
      inputPrice.value = +inputPrice.value;
    }
    return inputPrice.value;
  }
}

filterBtn.addEventListener("click", () => {
  sortActions();
});

function sortByPrice(array) {
  let newArr = [];
  for (let manga of array) {
    if (+manga.price >= +inputPriceL.value && +manga.price <= +inputPriceR.value) {
      newArr.push(manga);
    }
  }
  return newArr;
}
function sortByName(array) {
  let newArr = [];
  for (let manga of array) {
    let title = manga.alternative_titles.english == undefined ? (manga.alternative_titles.synonyms == undefined ? manga.alternative_titles.japanese : manga.alternative_titles.synonyms.split(",")[0]) : manga.alternative_titles.english;
    if (title.indexOf(inputName.value) != -1) {
      newArr.push(manga);
    }
  }
  return newArr;
}
function sortByGenre(array) {
  let newArr = [];

  for (let manga of array) {
    if (manga.information.genres == undefined) {
      continue;
    }
    if (
      manga.information.genres
        .map((val) => {
          return val.name;
        })
        .indexOf(select__genre.value) != -1
    ) {
      newArr.push(manga);
    }
  }
  return newArr;
}
function sortByPriceDir(array) {
  let isUpper = right__price__select.value == "1$->100$" ? true : false;
  let newArray = array;
  newArray = newArray.sort((frst, sec) => {
    if (!isUpper) {
      return sec.price - frst.price;
    }
    return frst.price - sec.price;
  });
  return newArray;
}
function sortByCount(array) {
  if (right__cnt__select.value.indexOf("all") != -1) {
    return array;
  }
  return array.splice(0, right__cnt__select.value);
}
function sortActions() {
  let tempArray = sortByPrice(arr);
  if (inputName.value != "") {
    tempArray = sortByName(tempArray);
  }
  if (select__genre.value.indexOf("all") == -1) {
    tempArray = sortByGenre(tempArray);
  }
  tempArray = sortByPriceDir(tempArray);
  tempArray = sortByCount(tempArray);

  print(tempArray);
}

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

function print(array = arr) {
  manga__list.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let block = document.createElement("div");
    block.classList.add("list__block");
    let url = array[i].picture_url;
    let title = array[i].alternative_titles.english == undefined ? (array[i].alternative_titles.synonyms == undefined ? array[i].alternative_titles.japanese : array[i].alternative_titles.synonyms.split(",")[0]) : array[i].alternative_titles.english;
    let author = array[i].information.authors
      .map((value) => {
        return value.name;
      })
      .join(" | ");
    let price = (+array[i].statistics.score * 2).toFixed(1);
    block.innerHTML = getHtmlBlock(url, title, author, price);
    const manga__price = block.querySelector(".manga__price");
    const more__page = block.querySelector(".more__page");
    manga__price.addEventListener("click", (e) => {
      if (JSON.parse(localStorage.getItem("CurrentUser")) == null) {
        Swal.fire({
          title: "Youre doesn't login",
          confirmButtonText: "OK",
        }).then((e) => {});
        return;
      }
      e.preventDefault();
      if (manga__price.textContent[manga__price.textContent.length - 1] != "+") {
        manga__price.textContent += "+";
      }
      if (JSON.parse(localStorage.getItem("CartIdArray")) == null) {
        localStorage.setItem("CartIdArray", JSON.stringify([{ id: +array[i].id, cnt: 1 }]));
        setCartIdArray([{ id: +array[i].id, cnt: 1 }]);
      } else {
        let arr = JSON.parse(localStorage.getItem("CartIdArray"));
        let idArray = arr.map((val) => {
          return val.id;
        });
        if (idArray.indexOf(+array[i].id) != -1) {
          arr[idArray.indexOf(+array[i].id)].cnt++;
        } else {
          arr.push({ id: +array[i].id, cnt: 1 });
        }
        localStorage.setItem("CartIdArray", JSON.stringify(arr));

        setCartIdArray(arr);
      }
    });
    more__page.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("CurrentMorePage", JSON.stringify({ id: +array[i].id, href: "../html/catalog.html" }));
      window.location.href = "../html/more.html";
      return;
    });

    manga__list.append(block);
  }
}
