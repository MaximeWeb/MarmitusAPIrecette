const recetteContainer = document.querySelector("#recetteContainerRandom");
const recetteContenerVegi = document.querySelector("#recetteContainerVegi");
const recetteContenerFrance = document.querySelector("#recetteContainerFrance");
const titre = document.querySelector("h1");
const recetteContenerAnglais = document.querySelector(
  "#recetteContainerAnglais"
);
const recetteContenerDessert = document.querySelector(
  "#recetteContainerDessert"
);
const buttonNext = document.querySelector("#buttonNext");
const formRecette = document.querySelector("#recette-form");
const inputRecette = document.querySelector("#recette-name");
const buttonSummer = document.querySelector("#summer");
const buttonWinter = document.querySelector("#winter");
const divSummer = document.querySelector(".summer");
const divnWinter = document.querySelector(".winter");
const buttonRandom = document.querySelector("#random");

const hiddenContener = () => {
  recetteContainer.innerHTML = "";
  recetteContenerVegi.innerHTML = "";
  recetteContenerFrance.innerHTML = "";
  recetteContenerAnglais.innerHTML = "";
  recetteContenerDessert.innerHTML = "";
};
hiddenContener();

const htmlSide = (data, contener) => {
  const html = `

    <div class="imgContainer">
      <img
      src=${data.meals[0].strMealThumb}
      alt="Recette"
      />
    </div>
    <div class="info">
        <h3 class="name">${data.meals[0].strMeal} <span id="change">
        <i class="far fa-heart avant"></i>
  
        <i class="fas fa-heart apres"></i>
  
    </span> </h3>
    </div>
  
              `;
  contener.insertAdjacentHTML("beforeend", html);
};

const renderRecette = (data) => {
  let ingredientsIndex = "";
  for (let i = 1; i <= 13; i++) {
    const ingredientKey = `strIngredient${i}`;
    const ingredient = data.meals[0][ingredientKey];

    if (ingredient) {
      ingredientsIndex += `- ${ingredient} `;
    }
  }

  const html = `
  <div class="imgContainer">
  <img
  src=${data.meals[0].strMealThumb}
  alt="Recette"
  />
</div>
<div class="info">
  <h3 class="name">${data.meals[0].strMeal} <span id="change">
      <i class="far fa-heart avant"></i>

      <i class="fas fa-heart apres"></i>

  </span> </h3>
  <p class="zone">Pays d'origine : <span>${data.meals[0].strArea}</span></p>
  <p class="categorie">Catégorie : <span>${data.meals[0].strCategory}</span></p>
  <p class="ingredients">Ingredients : <span>${ingredientsIndex}</span>  </p>
  <p class="instruction">Instruction : <span>${data.meals[0].strInstructions}</span></p>
</div>

            `;
  recetteContainer.insertAdjacentHTML("beforeend", html);
};

const myRecette = async () => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const dataRecette = await res.json();
  renderRecette(dataRecette);
  const res2 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian`
  );
  const dataRecetteVegi = await res2.json();
  htmlSide(dataRecetteVegi, recetteContenerVegi);
  const res3 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert`
  );
  const dataRecetteDessert = await res3.json();
  htmlSide(dataRecetteDessert, recetteContenerDessert);
  const res4 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=French`
  );
  const dataRecetteFrance = await res4.json();
  htmlSide(dataRecetteFrance, recetteContenerFrance);
  const res5 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=British`
  );
  const dataRecetteAnglais = await res5.json();
  htmlSide(dataRecetteAnglais, recetteContenerAnglais);
};
myRecette();

buttonNext.addEventListener("click", () => {
  hiddenContener();
  myRecette();
});

buttonRandom.addEventListener("click", () => {
  divSummer.style.opacity = 0;
  divnWinter.style.opacity = 0;
});

formRecette.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameRecette = inputRecette.value;
  recetteContainer.innerHTML = "";
  divSummer.style.opacity = 0;
  divnWinter.style.opacity = 0;
  try {
    const res6 = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameRecette}`
    );
    if (!res6.ok) {
      throw new Error("Recette not found");
    }
    const dataRecetteInput = await res6.json();
    console.log(dataRecetteInput);
    renderRecette(dataRecetteInput);
  } catch (error) {
    recetteContainer.innerHTML = "La recette est introuvable";
  }
});

titre.addEventListener("click", () => {
  divSummer.style.opacity = 1;
  divnWinter.style.opacity = 1;
  hiddenContener();
  myRecette();
});
