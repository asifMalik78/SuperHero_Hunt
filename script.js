const mainBody = document.querySelector(".main-body");
const searchBar = document.querySelector(".search-bar");
let isSearched = false;
const searchList = document.querySelector(".search-lists");
const searchRes = document.querySelector(".search-results");

//fetching the data from the api
async function fetchData(text) {
  try {
    let res = await fetch(
      `https://www.superheroapi.com/api.php/727054372039115/search/${text}`
    );
    let data = await res.json();
    if (!data.results) {
      searchRes.style.display = "none";
    }
    if (!isSearched) {
      initialLoad(data.results);
    } else {
      searchBarRes(data.results);
    }

    return data;
  } catch (err) {
    console.log("error is ", err.message);
  }
}

//render the heml page
function render(obj) {
  let elmt = createElement(obj);
  mainBody.innerHTML = elmt;
}

//adding result dynamically and created html elements dynamically
function createElement(obj) {
  return `
          <div class="main-container">
          <div class="superhero-name-image-wrapper">
              <h1 class="superhero-name">
                  ${obj.name}
              </h1>
  
              <div class="superhero-image-container">
                  <img src="${obj.image.url}" alt="" class="src">
              </div>
          </div>
      </div>
  
      <section class="powerstats">
          <h1>PowerStats</h1>
          <div class="powerstats-wrapper">
          <div class="powerstats-items">
              <h3>Intelligence</h3>
              <div class="progress-bar">
                  <div class="progress-bar-inner" style="width:${obj.powerstats.intelligence}%;">
                  </div>
              </div>
          </div>
  
          <div class="powerstats-items">
              <h3>Strength</h3>
              <div class="progress-bar">
                  <div class="progress-bar-inner" style="width:${obj.powerstats.strength}%;">
                  </div>
              </div>
          </div>
  
          <div class="powerstats-items">
              <h3>Speed</h3>
              <div class="progress-bar">
                  <div class="progress-bar-inner" style="width:${obj.powerstats.speed}%;">
                  </div>
              </div>
          </div>
  
          <div class="powerstats-items">
              <h3>Durability</h3>
              <div class="progress-bar">
                  <div class="progress-bar-inner" style="width:${obj.powerstats.durability}%;">
  
                  </div>
              </div>
          </div>
  
          <div class="powerstats-items">
              <h3>Power</h3>
              <div class="progress-bar">
                  <div class="progress-bar-inner" style="width:${obj.powerstats.power}%;">
  
                  </div>
              </div>
          </div>
          <div class="powerstats-items">
              <h3>Combat</h3>
              <div class="progress-bar">
                  <div class="progress-bar-inner" style="width:${obj.powerstats.combat}%;">
  
                  </div>
              </div>
          </div>
          </div>
      </section>
  
      <section class="biography">
          <h1>Biography</h1>
          <div class="content-wrapper">
              <p class="heading">Full Name </p>
              <p>${obj.biography["full-name"]}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Alter Egos </p>
              <p>${obj.biography["alter-egos"]}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Aliases</p>
              <p>${obj.biography["aliases"]}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Place Of Birth </p>
                  <p>${obj.biography["place-of-birth"]}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">First Appearance </p>
              <p>${obj.biography["first-appearance"]}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Publisher </p>
              <p>${obj.biography.publisher}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Alignment </p>
              <p>${obj.biography.alignment}</p>
          </div>
      </section>
  
      <section class="appearance">
          <h1>Appearance</h1>
          <div class="content-wrapper">
              <p class="heading">Gender</p>
              <p>${obj.appearance.gender}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Race</p>
              <p>${obj.appearance.race}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Height</p>
              <p>${obj.appearance.height}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Weight</p>
              <p>${obj.appearance.weight}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Eye Color</p>
              <p>${obj.appearance["eye-color"]}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Hair Color</p>
              <p>${obj.appearance["hair-color"]}</p>
          </div>
      </section>
  
      <section class="work">
          <h1>Work</h1>
          <div class="content-wrapper">
              <p class="heading">Occupation</p>
              <p>${obj.work.occupation}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Base</p>
              <p>${obj.work.base}</p>
          </div>
      </section>
  
      <section class="connection">
          <h1>Connection</h1>
          <div class="content-wrapper">
              <p class="heading">Group-Affiliation</p>
              <p>${obj.connections["group-affiliation"]}</p>
          </div>
  
          <div class="content-wrapper">
              <p class="heading">Relatives</p>
              <p>${obj.connections.relatives}</p>
          </div>
      </section>
          `;
}

//handle click for search results
function searchResultClick(id, name) {
  const item = document.getElementById(id);

  item.addEventListener("click", () => {
    isSearched = false;
    fetchData(name);
  });
}

//append all the search suggestion
function searchBarRes(data) {
  searchList.innerHTML = "";
  for (let i of data) {
    showSuggestion(i);
  }
}

// shows search suggestion when user types
function showSuggestion(obj) {
  let list = document.createElement("li");
  list.setAttribute("id", obj.id);
  let ls = list.classList;
  ls.add("search-lists-items");
  list.innerHTML = `
      <div class="search-image-container">
         <img src="${obj.image.url}" alt="superhero-image">
      </div>
         <div class="information"> ${obj.name}</div>                
      `;

  searchList.appendChild(list);

  searchResultClick(obj.id, obj.name);
}

// search field event listener
searchBar.addEventListener("keyup", (e) => {
  isSearched = true;
  if (e.target.value.length >= 3) {
    searchBarRes.innerHTML = "";
    searchRes.style.display = "block";
    fetchData(e.target.value);
  } else {
    searchRes.style.display = "none";
  }
});

// user search clicks handler
window.addEventListener("click", () => {
  searchRes.style.display = "none";
  searchBar.value = "";
});

//initial loading of the webpage
function initialLoad(data) {
  for (let i of data) {
    render(i);
  }
}

// fetch superhero data from api for initial load
window.addEventListener("load", () => {
  fetchData("ironman");
});
