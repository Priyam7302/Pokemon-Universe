let container = document.querySelector(".container");
let filterByType = document.querySelector("#filterByType");
let pokemons = [];

let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
let typeUrl = "https://pokeapi.co/api/v2/type/";

async function fetchData(url) {
  let response = await fetch(url);
  let result = await response.json();
  // console.log(result);
  return result;
}

window.addEventListener("load", async () => {
  const types = await fetchData(typeUrl);
  console.log(types.results);

  addTypeOption(types.results);

  let res = await fetchData(url);
  let results = res.results;
  // console.log(results);

  let promises = [];

  for (let i = 0; i < results.length; i++) {
    let uri = results[i].url;
    // console.log(uri);
    let promise = fetch(uri).then((r) => r.json());
    promises.push(promise);
  }
  // console.log(promises);

  showData(promises);
});

filterByType.addEventListener("change", filterPokemons);

async function showData(promises) {
  let final = await Promise.all(promises);
  console.log(final);
  for (let i = 0; i < final.length; i++) {
    let flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
    let flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");
    let flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");
    let img = document.createElement("img");
    let para1 = document.createElement("p");
    let para2 = document.createElement("p");

    //back-card
    let flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    let height = document.createElement("p");
    let weight = document.createElement("p");
    let hp = document.createElement("p");
    let attack = document.createElement("p");
    let defense = document.createElement("p");
    let specialAttack = document.createElement("p");
    let specialDefense = document.createElement("p");
    let speed = document.createElement("p");

    para1.innerText = final[i].name;
    para2.innerText = "Type:" + final[i].types[0].type.name;

    img.src = final[i].sprites.other.dream_world.front_default;
    height.innerText = "Height: " + final[i].height + "cm";
    weight.innerText = "Weight: " + final[i].weight + "kg";
    hp.innerText = "hp: " + final[i].stats[0].base_stat;
    attack.innerText = "attack: " + final[i].stats[1].base_stat;
    defense.innerText = "defense: " + final[i].stats[2].base_stat;
    specialAttack.innerText = "special-attack: " + final[i].stats[3].base_stat;
    specialDefense.innerText =
      "special-defense: " + final[i].stats[4].base_stat;
    speed.innerText = "speed: " + final[i].stats[5].base_stat;

    flipCardFront.append(img, para1, para2);
    flipCardBack.append(
      height,
      weight,
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed
    );
    flipCardInner.append(flipCardFront, flipCardBack);
    flipCard.append(flipCardInner);
    container.append(flipCard);
  }
}

function addTypeOption(arr) {
  arr.forEach((obj) => {
    const option = document.createElement("option");
    option.value = obj.name;
    option.innerText = obj.name;
    filterByType.append(option);
    pokemons.push(option.value);
  });
  console.log(pokemons);
}

// function filterPokemons(e) {
//   const matchedPokemons = pokemons.filter((pokemon) => {
//     return pokemon.types.map((obj) => {
//       return obj.type.name.includes(e.target.value);
//     });
//   });
//   console.log(matchedPokemons);
// }

function filterPokemons(e) {
  
}
