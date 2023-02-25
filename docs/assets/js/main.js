"use strict";const listCocktails=document.querySelector(".js-list-cocktails"),searchButton=document.querySelector(".js-btn-search"),resetButton=document.querySelector(".js-btn-reset"),inputCoctailName=document.querySelector(".js-input"),listFavorites=document.querySelector(".js-list-favorites"),clearAllFavoritesButton=document.querySelector(".js-btn-clear");let cocktailUrl="",listCocktailsData=[],listFavoritesData=[];const COCKTAIL_NAME="margarita";function checkInfoLocalStorage(){const t=JSON.parse(localStorage.getItem("cocktails"));t?(listFavoritesData=t,listFavoritesData[0].strDrinkThumb="",renderFavoriteList(listFavoritesData)):(cocktailUrl="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",fetchToApi(cocktailUrl))}function fetchToApi(t){fetch(t).then(t=>t.json()).then(t=>{listCocktailsData=t.drinks,renderCocktailList(listCocktailsData)})}function renderCocktailList(t){listCocktails.innerHTML="";for(const e of t)listCocktails.innerHTML+=renderCocktail(e);addEventToCocktail()}function renderFavoriteList(t){listFavorites.innerHTML="";for(const e of t)listFavorites.innerHTML+=renderFavorite(e);addEventToFavorite()}function renderCocktail(t){let e="";return e=t.strDrinkThumb?t.strDrinkThumb:"https://via.placeholder.com/210x210/1aba3a/ffffff.jpeg?text=Cocktail "+t.strDrink.toUpperCase(),`<li class="li-list">\n        <article class="article--cocktail js-li-cocktail" id=${t.idDrink}>        \n        <img class="article--cocktail__img"src="${e}" alt="imagen cocktail">\n        <h3 class="article--cocktail__title">${t.strDrink}</h3>\n        </article> \n    </li> `}function renderFavorite(t){let e="";return e=t.strDrinkThumb?t.strDrinkThumb:"https://via.placeholder.com/210x210/1aba3a/ffffff.jpeg?text=COCKTEL "+t.strDrink.toUpperCase(),`<li class="li-list">\n        <article class="article--favorite js-li-favorite" id=${t.idDrink}>        \n        <img class="article--favorite__img"src="${e}" alt="imagen cocktail">\n        <h3 class="article--favorite__title">${t.strDrink}</h3>\n        <i class="article--favorite__icon fa-solid fa-circle-xmark js-icon-close" id=${t.idDrink}></i>\n        </article> \n    </li> `}function handleClick(t){t.currentTarget.classList.toggle("selected");const e=t.currentTarget.id,i=listCocktailsData.find(t=>t.idDrink===e),a=listFavoritesData.findIndex(t=>t.idDrink===e);-1===a?listFavoritesData.push(i):listFavoritesData.splice(a,1),renderFavoriteList(listFavoritesData),localStorage.setItem("cocktails",JSON.stringify(listFavoritesData))}function addEventToCocktail(){const t=document.querySelectorAll(".js-li-cocktail");for(const e of t)e.addEventListener("click",handleClick)}function handleClickButtonSearch(t){t.preventDefault();const e=inputCoctailName.value;cocktailUrl=e?"https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+e:"https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",fetch(cocktailUrl).then(t=>t.json()).then(t=>{console.log(t),listCocktailsData=t.drinks,renderCocktailList(listCocktailsData),ckeckInFavorites()})}function handleClickButtonReset(t){t.preventDefault(),localStorage.clear(),inputCoctailName.value="",listFavoritesData=[],renderFavoriteList(listFavoritesData),cocktailUrl="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",fetchToApi(cocktailUrl)}function handleClickButtonClearAllFavorites(t){t.preventDefault(),localStorage.clear(),listFavoritesData=[],renderFavoriteList(listFavoritesData),ckeckInFavorites()}function ckeckInFavorites(){const t=document.querySelectorAll(".js-li-cocktail");for(let e of t){listFavoritesData.find(t=>t.idDrink===e.id)?e.classList.add("selected"):e.classList.remove("selected")}}function addEventToFavorite(){const t=document.querySelectorAll(".js-icon-close");for(const e of t)e.addEventListener("click",handleClickIconClose)}function handleClickIconClose(t){t.preventDefault();const e=t.currentTarget.id,i=listFavoritesData.findIndex(t=>t.idDrink===e);console.log("monica"),console.log(listFavoritesData),listFavoritesData.splice(i,1),console.log(listFavoritesData),renderFavoriteList(listFavoritesData),ckeckInFavorites(),0!==listFavoritesData.length?localStorage.setItem("cocktails",JSON.stringify(listFavoritesData)):localStorage.clear()}checkInfoLocalStorage(),searchButton.addEventListener("click",handleClickButtonSearch),resetButton.addEventListener("click",handleClickButtonReset),clearAllFavoritesButton.addEventListener("click",handleClickButtonClearAllFavorites);