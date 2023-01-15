"use strict";
const filterBtn = document.querySelector(".filter-btn");
const searchedResult = document.querySelector("#search-result");
// where the pagination buttons will be added
const paginationElement = document.getElementById("pagination");
let searchedMeal = "";
// we start by initilazing current page to 1
let currentPage = 1;
// how many meals will be displayed on the page
let mealsPerPage = 6;
let areasIdArr = [];
let categoriesIdArr = [];
let arreasAndCategoriesId = [];
let allCategoriesMealsArr = [];
let allMealsOfAllCategories = [];
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector(".overlay");
modalOverlay.style.display = "none";
modal.style.display = "none";
document.querySelector(".no-items").style.display = "none";
// modal for meal
const mealModal = (meal, wrapper) => {
  let ingredients = "";
  Object.keys(meal[0]).forEach((property) => {
    if (property.startsWith("strIngredient") && meal[0][property]) {
      ingredients += `${meal[0][property]} - `;
    }
  });
  ingredients = ingredients.slice(0, -1) + "";
  let clickedMeal = `<img src="close-icon.png" alt="close icon" class="close-icon">
<h2>${meal[0].strMeal}</h2>
<div class="modal-meal-info">
<span class="modal-area">Area: ${meal[0].strArea}</span>
<span class="modal-category">Category: ${meal[0].strCategory}</span>
</div>
<div class ="modal-instructions">
<div class="meal-img-div"> <img class="meal-img" src="${meal[0].strMealThumb}"</div>
<h3>Instructions:</h3>
<p>${meal[0].strInstructions}</p>
<div class="ingredients-list">
<h5>Ingredients list</h5>
${ingredients}
<div>
</div>
</div>
</div>
`;
  console.log(document.querySelectorAll(".container")[1]);
  document.querySelector(".container").style.display = "none";
  wrapper.innerHTML = clickedMeal;
  wrapper.style.display = "block";
};
// displaying modal and fetching data of meal by ID
document.querySelector("body").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("btn-meal-info")) {
    let mealDiv = e.target.closest(".mealDiv");
    modalOverlay.style.display = "block";
    document.querySelector(".container").style.display = "none";
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDiv.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealModal(data.meals, modal));
  }
});
// closing modal
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("close-icon") ||
    e.target.classList.contains("overlay")
  ) {
    document.querySelector(".container").style.display = "block";
    modal.style.display = "none";
    modalOverlay.style.display = "none";
  }
});
const showMeal = (arr) => {
  const mealCard = document.createElement("div");
  mealCard.className = "row gap-4 d-flex justify-content-around";
  mealCard.innerHTML = `<img
      src="${arr.meals[0].strMealThumb}"
      class="card-img-top"
      />
      <div class="card-body p-2">
      <h5 class="card-title p-1">${arr.meals[0].strMeal}</h5>
      <a href="#" class="btn btn-primary">Get details</a>
      </div>`;
  document.querySelector(".row").appendChild(mealCard);
};
// const showData = (arr) => {
//   arr.forEach((meal) => {
//     const mealCard = document.createElement("div");
//     mealCard.className = "card mt-4";
//     mealCard.innerHTML = `<img
//               src="${meal.strMealThumb}"
//               class="card-img-top"
//               />
//               <div class="card-body p-2">
//               <h5 class="card-title p-1">${meal.strMeal}</h5>
//               <a href="#" class="btn btn-primary">Get details</a>
//               </div>`;
//     document.querySelector(".row").appendChild(mealCard);
//   });
// };
// fetching all meals of all categories
const callingAllMealsByCategory = async () => {
  // fetching all categories
  const allCategoriesArr = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const allCategoriesArrResponse = await allCategoriesArr.json();
  // fetching all categories
  for (const category of allCategoriesArrResponse.categories) {
    const allMealsOfCategory = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
    );
    const allMealsOfCategoryResponse = await allMealsOfCategory.json();
    allMealsOfAllCategories.push(...allMealsOfCategoryResponse.meals);
  }
  console.log(allMealsOfAllCategories);
  displayList(
    allMealsOfAllCategories,
    searchedResult,
    mealsPerPage,
    currentPage
  );
  setupPagination(allMealsOfAllCategories, paginationElement, mealsPerPage);
};
const getMealsByIdFromIntersection = async () => {
  let idsOfIntersection = [];
  arreasAndCategoriesId = areasIdArr.filter((areaId) =>
    categoriesIdArr.includes(areaId)
  );
  for (const id of arreasAndCategoriesId) {
    const fetchById = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const fetchByIdResponse = await fetchById.json();
    idsOfIntersection.push(...fetchByIdResponse.meals);
  }
  console.log(idsOfIntersection);
  displayList(idsOfIntersection, searchedResult, mealsPerPage, currentPage);
  setupPagination(idsOfIntersection, paginationElement, mealsPerPage);
  // idsOfIntersection = [];
};
// loading categories ( a self invoked function )
const loadCategoriesandArreas = (async () => {
  // =================>
  const fetchCategories = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const fetchCategoriesResponse = await fetchCategories.json();
  fetchCategoriesResponse.categories.forEach((category) => {
    const optionCategory = document.createElement("option");
    optionCategory.value = category.strCategory;
    optionCategory.innerHTML = category.strCategory;
    document.querySelector("#meals-categories").appendChild(optionCategory);
  });
  document.querySelectorAll("#meals-categories option").forEach((category) => {
    if (category.value === "Lamb")
      category.setAttribute("selected", "selected");
  });
  // ================>
  // fetching all areas
  const areaListSelect = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const areaListSelectResponse = await areaListSelect.json();
  // adding options to the select element based on the areas values
  areaListSelectResponse.meals.forEach((meal) => {
    const optionArea = document.createElement("option");
    optionArea.value = meal.strArea;
    optionArea.innerHTML = meal.strArea;
    document.querySelector("#meals-areas").appendChild(optionArea);
  });
  // making moroccan area selected by default
  document.querySelectorAll("#meals-areas option").forEach((area) => {
    if (area.value === "Moroccan") area.setAttribute("selected", "selected");
  });
  // =============>
  document.querySelector(".filter-btn").addEventListener("click", async (e) => {
    const selectedCategory = document.querySelector("#meals-categories").value;
    const selectedAreaValue = document.querySelector("#meals-areas").value;
    if (
      selectedCategory === "allCategories" &&
      selectedAreaValue === "allAreas"
    ) {
      callingAllMealsByCategory();
    } else {
      if (
        selectedCategory === "allCategories" &&
        selectedAreaValue !== "allAreas"
      ) {
        const fetchSelectedArea = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedAreaValue}`
        );
        const selectedAreaResponse = await fetchSelectedArea.json();
        console.log(selectedAreaResponse.meals);
        console.log("all categories && choosen area");
        displayList(
          selectedAreaResponse.meals,
          searchedResult,
          mealsPerPage,
          currentPage
        );
        setupPagination(
          selectedAreaResponse.meals,
          paginationElement,
          mealsPerPage
        );
      } else if (
        selectedCategory !== "allCategories" &&
        selectedAreaValue === "allAreas"
      ) {
        // fetching categories based on the selected category
        const fetchSelectedCategory = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );
        const selectedCategoryResponse = await fetchSelectedCategory.json();

        console.log(selectedCategoryResponse);
        document.querySelector(".row").innerHTML = "";
        displayList(
          selectedCategoryResponse.meals,
          searchedResult,
          mealsPerPage,
          currentPage
        );
        setupPagination(
          selectedCategoryResponse.meals,
          paginationElement,
          mealsPerPage
        );
      } else {
        // fetching categories based on the selected category
        const fetchSelectedCategory = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );
        const selectedCategoryResponse = await fetchSelectedCategory.json();
        categoriesIdArr = [];
        selectedCategoryResponse.meals.forEach((meal) => {
          categoriesIdArr.push(meal.idMeal);
        });
        console.log(categoriesIdArr);
        // fetching meals based on the selected area
        const fetchSelectedArea = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedAreaValue}`
        );
        const selectedAreaResponse = await fetchSelectedArea.json();
        areasIdArr = [];
        // storing the meals by Area in an array to use it after with filtering by category ( intersection )
        selectedAreaResponse.meals.forEach((meal) => {
          areasIdArr.push(meal.idMeal);
        });
        console.log(areasIdArr);
        getMealsByIdFromIntersection();
      }
      // console.log(areasIdArr);
      document.querySelector(".row").innerHTML = "";
    }
  });
})();
// Loading lamb category and Morocco area as default when accessing the page
const loadDefaultMeals = (async () => {
  const MorrocanAreaResponse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Moroccan"
  );
  const MorrocanAreaData = await MorrocanAreaResponse.json();
  // storing the meals by area in an array to use it for intersection with categories
  MorrocanAreaData.meals.forEach((meal) => {
    areasIdArr.push(meal.idMeal);
  });
  // console.log(areasIdArr);
  const lambCategoryResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb`
  );
  const lambCategoryData = await lambCategoryResponse.json();
  // storing the meals by category in an array to use it for intersection with areas
  lambCategoryData.meals.forEach((meal) => {
    categoriesIdArr.push(meal.idMeal);
  });
  arreasAndCategoriesId = [];
  getMealsByIdFromIntersection();
  categoriesIdArr = [];
  areasIdArr = [];
})();
// =========================================>
// create a sliced array from the original array based on the clicked page button then it display the array elements in html page
function displayList(items, wrapper, mealsPerPage, page) {
  if (items.length == 0) {
    document.querySelector(".no-items").style.display = "block";
  } else {
    document.querySelector(".no-items").style.display = "none";
    wrapper.innerHTML = "";
    page--;
    /* start and end will determine how are displayed items 
    on the page from the whole array */
    let start = mealsPerPage * page;
    let end = start + mealsPerPage;
    // will slice the array based on the start and the end
    let paginatedItems = items.slice(start, end); // 0=>6, 6=>12
    // we'll loop through the sliced array
    for (let i = 0; i < paginatedItems.length; i++) {
      // creating a div for each element of the sliced array
      searchedMeal += `
      <div class="card mt-4 p-0" style="width: 18rem;">
      <div class="mealDiv" data-id = "${paginatedItems[i].idMeal}">
      <img
      class="card-img-top" src="${paginatedItems[i].strMealThumb}"
      />
      <div class="card-body text-center">
      <h5 class="card-title">${paginatedItems[i].strMeal}</h5>
      <a href="" class="btn btn-primary btn-meal-info">Go somewhere</a>
      </div>
      </div>
      </div>
      `;
    }
    console.log("inserting in wrapper");
    wrapper.innerHTML = searchedMeal;
    console.log(wrapper.innerHTML);
    searchedMeal = "";
  }
}
// calculate how many pages button will be displayed and adding the buttons with the paginationButton function
function setupPagination(items, wrapper, mealsPerPage) {
  wrapper.innerHTML = "";
  // count pages
  let page_count = Math.ceil(items.length / mealsPerPage);
  // create buttons ( pages numbers ) based on the pages numbers
  if (page_count > 1) {
    for (let i = 1; i < page_count + 1; i++) {
      let btn = paginationButton(i, items);
      wrapper.appendChild(btn);
    }
  }
  // when selecting all categories and an area || all areas and a category the pagination show up but the meals doesn't until clicking the page button, so I did the click automatically on the first page with setTimeout
  setTimeout(() => {
    if (document.querySelector("#pagination").hasChildNodes()) {
      console.log("setTimeout");
      document.querySelector(".active").click();
    }
  }, 100);
}

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;
  button.classList.add("page-item");
  // if the current button value is equal to the page add an active class
  if (currentPage == page) button.classList.add("active");
  //
  button.addEventListener("click", function () {
    // when we click the button the value of the current page will be changed to the value of the clicked button
    currentPage = page;
    displayList(items, searchedResult, mealsPerPage, currentPage);
    // delete the active class from the selected button
    let current_btn = document.querySelector("#pagination button.active");
    current_btn.classList.remove("active");
    // adding the active class to the selected button
    button.classList.add("active");
  });
  return button;
}
