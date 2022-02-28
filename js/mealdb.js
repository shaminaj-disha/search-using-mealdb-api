document.getElementById("error-message").style.display = "none";
document.getElementById("no-input").style.display = "none";
document.getElementById("no-result").style.display = "none";
//toggleSpinner function
const toggleSpinner = displayStyle => {
    document.getElementById("loading-spinner").style.display = displayStyle;
}
// toggleSearchResult function
const toggleSearchResult = displayStyle => {
    document.getElementById("search-result-container").style.display = displayStyle;
}
// toggleMealDetails function
const toggleMealDetails = displayStyle => {
    document.getElementById("meal-details").style.display = displayStyle;
}
//displayError function
function displayError() {
    document.getElementById("error-message").style.display = "block";
}
//searchFood function
const searchFood = async () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    //clear field
    searchField.value = "";
    if (searchText == "") {
        document.getElementById("search-result").textContent = "";
        document.getElementById("meal-details").textContent = "";
        document.getElementById("error-message").style.display = "none";
        document.getElementById("no-result").style.display = "none";
        document.getElementById("no-input").style.display = "block";
        //toggleSpinner("none");
    }
    else {
        document.getElementById("no-input").style.display = "none";
        toggleSpinner("block");
        toggleSearchResult("none");
        toggleMealDetails("none");
        //load data
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`; //don't forget to put https://
        try {
            const response = await fetch(url);
            const data = await response.json();
            displaySearchResult(data.meals);
        }
        catch (error) {
            console.log(error);
            displayError();
            //document.getElementById("error-message").style.display = "block";
        }
        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => displaySearchResult(data.meals))
        //     .catch(error => console.log(error)); //console.log(data) //or (data.meals);
    }
}
//displaySearchResult function
const displaySearchResult = meals => {
    //console.log(meals.length); //can't use meals.length as meals is null
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    //searchResult.innerText = ""; //not recommended
    document.getElementById("meal-details").textContent = "";
    if (meals == null) {
        //console.log(meals.length);
        document.getElementById("no-result").style.display = "block";
    }
    else {
        document.getElementById("no-result").style.display = "none";
        meals?.forEach(meal => {
            // console.log(meal) //or (meals);
            const div = document.createElement("div");
            div.classList.add("col");
            //put "loadMealDetail('${meal.idMeal}')" for string values
            div.innerHTML = `
                <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p>${meal.strIngredient8 ? meal.strIngredient8 : ""}</p>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }
    toggleSpinner("none");
    toggleSearchResult("block");
}
//loadMealDetail function
const loadMealDetail = async mealId => {
    //console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetail(data.meals[0]);
    }
    catch (error) {
        console.log(error);
        displayError();
    }
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]));//console.log(data.meals[0]));
}
// displayMealDetail function
const displayMealDetail = meal => {
    //console.log(meal);
    const mealDetails = document.getElementById("meal-details");
    mealDetails.textContent = "";
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Go to youtube</a>
        </div>
    `;
    mealDetails.appendChild(div);
    toggleMealDetails("block");
}