let arr = JSON.parse(localStorage.getItem("ApiArray"));
const section = document.querySelector("section");
function getHtml(url, characters, title, author, sunopsis) {
  return `<div class="left__part">
                <img src="${url}" alt="" class="manga__img">
                <h2 class="characters__title">Characters:</h2>
                <p class="characters">${characters}</p>
            </div>
            <div class="rigth__part">
                <h1 class="title">
                    ${title}
                </h1>
                <h3 class="author">${author}</h3>
                <p class="synopsis">${sunopsis}</p>
                <div class="btn">Back</div>
            </div>`;
}

window.onload = () => {
  let morePageId = JSON.parse(localStorage.getItem("CurrentMorePage"));
  if (morePageId == null) {
    return;
  }
  let manga = arr[morePageId.id];
  const block = document.createElement("div");
  block.classList.add("info__place");
  let url = manga.picture_url;
  let characters = manga.characters.map((value) => {
    return value.name;
  });
  characters = characters.join("<br>");
  let title = manga.alternative_titles.english == undefined ? (manga.alternative_titles.synonyms == undefined ? manga.alternative_titles.japanese : manga.alternative_titles.synonyms.split(",")[0]) : manga.alternative_titles.english;
  let author = manga.information.authors
    .map((value) => {
      return value.name;
    })
    .join(" | ");
  let synopsis = manga.synopsis;
  synopsis = synopsis.slice(0, synopsis.indexOf("["));
  block.innerHTML = getHtml(url, characters, title, author, synopsis);
  let btn = block.querySelector(".btn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = morePageId.href;
    localStorage.setItem("CurrentMorePage", JSON.stringify(null));
  });
  section.append(block);
};
