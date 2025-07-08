"use strict";
const searchBtn = document.querySelector(".search-btn");
const searchedResult = document.querySelector("#search-result");
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector(".overlay");
modalOverlay.style.display = "none";
modal.style.display = "none";
let data;
let mealName;
let dataArr = [];
const sixRandomMeals = document.querySelectorAll(".row")[1];
document.querySelector(".no-items").style.display = "none";
// Function to generate unique descriptions for meals
const generateMealDescription = (meal) => {
  const descriptions = [
    `A mouthwatering ${
      meal.strCategory || "delicious"
    } dish that will transport your taste buds to ${
      meal.strArea || "culinary heaven"
    }.`,
    `Experience the authentic flavors of ${
      meal.strArea || "traditional"
    } cuisine with this exquisite ${meal.strCategory || "dish"}.`,
    `Discover the perfect blend of spices and ingredients in this ${
      meal.strCategory || "amazing"
    } creation from ${meal.strArea || "around the world"}.`,
    `Indulge in this ${
      meal.strCategory || "scrumptious"
    } masterpiece that showcases the rich culinary heritage of ${
      meal.strArea || "diverse cultures"
    }.`,
    `Savor every bite of this ${
      meal.strCategory || "delectable"
    } delight, crafted with love and tradition from ${
      meal.strArea || "time-honored recipes"
    }.`,
    `Embark on a culinary journey with this ${
      meal.strCategory || "fantastic"
    } dish that celebrates the essence of ${meal.strArea || "global cuisine"}.`,
    `Treat yourself to this ${
      meal.strCategory || "incredible"
    } creation that brings the authentic taste of ${
      meal.strArea || "home cooking"
    } to your table.`,
    `Experience pure gastronomic bliss with this ${
      meal.strCategory || "exceptional"
    } dish from the heart of ${meal.strArea || "culinary excellence"}.`,
    `Delight in this ${
      meal.strCategory || "wonderful"
    } recipe that captures the spirit and flavors of ${
      meal.strArea || "traditional cooking"
    }.`,
    `Immerse yourself in the rich aromas and flavors of this ${
      meal.strCategory || "extraordinary"
    } dish from ${meal.strArea || "distant lands"}.`,
  ];

  // Use meal name to create a consistent but varied description
  const index = meal.strMeal.length % descriptions.length;
  return descriptions[index];
};

// a function for print meals
const showData = (arr) => {
  let data = "";
  arr.forEach((ele) => {
    // Generate unique description for each meal
    const description = generateMealDescription(ele);

    data += `
    <div class="card mt-4 p-0"  style="width: 18rem; ">
    <div class="mealDiv" data-id = "${ele.idMeal}">
          <img
    class="card-img-top" src="${ele.strMealThumb}"
    />
    <div class="card-body text-center py-4">
      <h5 class="card-title">${ele.strMeal}</h5>
      <div class="meal-details mb-3">
        <span class="badge bg-secondary me-2">${ele.strCategory || "N/A"}</span>
        <span class="badge bg-info">${ele.strArea || "N/A"}</span>
      </div>
      <p class="card-description mb-3">${description}</p>
      <a href="" class="btn btn-primary btn-meal-info">more info</a>
    </div>
    </div>
    </div>
    `;
  });
  sixRandomMeals.innerHTML += data;
};
/*
this is a function for getting six random meals and it is 
self invoked function
*/
const getSixRandomsMeals = (() => {
  for (let i = 0; i < 6; i++) {
    // this is a function for getting a random meal
    // its also a self invoked function
    (async function getRandomMeal() {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        let data = await response.json();
        if (!response.ok) throw new Error(error);
        // storing the six random meals in an array
        dataArr.push(data);
        showData(data.meals);
        // selecting all buttons in meals
        document.querySelectorAll(".btn-meal-info").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            mealName = e.target.previousElementSibling.innerHTML;
          });
        });
      } catch (error) {
        document.querySelector(".row").innerHTML = `${error}`;
      }
    })();
  }
})();
// searching for a meal event
let searchedMeal = "";
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInputValue = document.querySelector("#search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        document.querySelector(".no-items").style.display = "none";
        searchedResult.className = "row gap-4 d-flex justify-content-around";
        paginationElement.style.display = "flex";
        DisplayList(data.meals, searchedResult, mealsPerPage, currentPage);
        SetupPagination(data.meals, paginationElement, mealsPerPage);
      } else {
        sixRandomMeals.style.display = "none";
        document.querySelector(".no-items").style.display = "block";
        searchedResult.className = "d-none";
        paginationElement.style.display = "none";
      }
    });
  document.querySelector("#search-input").value = "";
});
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
</div>
</div>
`;
  wrapper.innerHTML = clickedMeal;
  wrapper.style.display = "block";
};
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
// where the pagination buttons will be added
const paginationElement = document.getElementById("pagination");
// we start by initilazing current page to 1
let currentPage = 1;
// how many meals will be displayed on the page
let mealsPerPage = 6;
// create a sliced array from the original array based on the clicked page button then it display the array elements in html page
function DisplayList(items, wrapper, mealsPerPage, page) {
  wrapper.innerHTML = "";
  page--;
  /* start and end will determine how are displayed items 
      on the page from the whole array */
  let start = mealsPerPage * page;
  let end = start + mealsPerPage;
  // will slice the array based on the start and the end
  let paginatedItems = items.slice(start, end); // 0=>6, 6=>12
  // we'll loop through the sliced array and we'll create an item who takes the value of the sliced array element each time the loop iterates
  for (let i = 0; i < paginatedItems.length; i++) {
    // item will be an element from the sliced array
    // Generate unique description for each meal
    const description = generateMealDescription(paginatedItems[i]);

    searchedMeal += `
        <div class="card mt-4 p-0" style="width: 18rem;">
          <div class="mealDiv" data-id = "${paginatedItems[i].idMeal}">
        <img
  class="card-img-top" src="${paginatedItems[i].strMealThumb}"
  />
  <div class="card-body text-center">
    <h5 class="card-title">${paginatedItems[i].strMeal}</h5>
    <div class="meal-details mb-3">
      <span class="badge bg-secondary me-2">${
        paginatedItems[i].strCategory || "N/A"
      }</span>
      <span class="badge bg-info">${paginatedItems[i].strArea || "N/A"}</span>
    </div>
    <p class="card-description mb-3">${description}</p>
    <a href="" class="btn btn-primary btn-meal-info">more info</a>
  </div>
  </div>
  </div>
  `;
  }
  sixRandomMeals.innerHTML = "";
  searchedResult.innerHTML = searchedMeal;
  searchedMeal = "";
}
// calculate how many pages button will be displayed and adding the buttons with the paginationButton function
function SetupPagination(items, wrapper, mealsPerPage) {
  wrapper.innerHTML = "";
  // count pages
  let page_count = Math.ceil(items.length / mealsPerPage);
  // create buttons ( pages numbers ) based on the pages numbers
  if (page_count > 1) {
    for (let i = 1; i <= page_count; i++) {
      let btn = paginationButton(i, items);
      wrapper.appendChild(btn);
    }
  }
}

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;
  // if the current button value is equal to the page add an active class
  if (currentPage == page) button.classList.add("active");
  //
  button.addEventListener("click", function () {
    // when we click the button the value of the current page will be changed to the value of the clicked button
    currentPage = page;
    DisplayList(items, searchedResult, mealsPerPage, currentPage);
    // delete the active class from the selected button
    let current_btn = document.querySelector("#pagination button.active");
    current_btn.classList.remove("active");
    // adding the active class to the selected button
    button.classList.add("active");
  });
  return button;
}
