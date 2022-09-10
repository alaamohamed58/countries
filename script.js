const section = document.querySelector("section");
(searchBar = document.getElementById("search-bar")),
  (submitBtn = document.querySelector("input[type = 'image' ]")),
  (locationBtn = document.getElementById("btn"));

//render the element
const render = (data) => {
  let curr = Object.values(data.currencies)[0].name,
    language = Object.values(data.languages);
  section.innerHTML = "";
  const html = `<article>
    <img
      src= ${data.flags.png}
      alt="egy"
    />
    <div class="content">
      <h2> ${data.altSpellings[1]} </h2>
      <h3>${data.region}</h3>
      <div>👫 <span> ${(+data.population / 1000000).toFixed(1)} </span></div>
      <div>🗣 <span> ${language} </span></div>
      <div>💰 <span> ${curr} </span></div>
    </div>
  </article>`;

  section.insertAdjacentHTML("beforeend", html);
  section.style.opacity = "1";
};

const getJSON = (url, errorMsg = "Something Went Wrong") => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }

    return response.json();
  });
};

submitBtn.addEventListener("click", () => {
  getCountry(searchBar.value.toLowerCase());
});

function getCountry(country) {
  return getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    `something went wrong, Country Not Found `
  )
    .then((data) => {
      return render(data[0]);
    })
    .catch((err) => {
      const image = document.createElement("img");
      image.style.width = "30%";
      image.src = "/Think-PNG-Download-Image.png";

      section.innerHTML = "";
      section.appendChild(image);
      section.style.opacity = "1";
    });
}

locationBtn.addEventListener("click", () => {
  getJSON("http://ipwho.is/").then((data) => {
    getCountry(data.country);
  });
});
