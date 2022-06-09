/*
const url = 'https://jsonplaceholder.typicode.com/users';

// Ajax API requstpractice
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (response) {
            let res = response;
            let list = res.map(r => r.name + "<br />");
            $('#users').html(list);
        }
    })
})
$(document).ready(getEmail())
function getEmail() {
    $.ajax({
        type: 'GET',
        url,
        success: function (response) {
            let res = response;
            let list = res.map(r => r.id + '. ' + 'Username=' + r.username + '   |    ' + 'Useremail=' + r.email + "<br/>");
            $('#email').html(list);
        }
    })
}
*/
const recipeItemsCtn = document.querySelector('#recipeItemsCtn');
const userInput = document.querySelector('#searchQuery');
const searchBtn = document.querySelector('#searchBtn');
const clearBtn = document.querySelector('#clearBtn')
const vegetarianBtn = document.querySelector('#vegetarianBtn')
const pescatarianBtn = document.querySelector('#pescatarianBtn')
const ketoBtn = document.querySelector('#ketoBtn')
const shellfishBtn = document.querySelector('#shellfishBtn')
const checkDietBtn = document.querySelector('#checkDietBtn')

let query = null;
let output = '';
let vegetarian = null;
let pescatarian = null;
let keto = null;
let shellfishfree = null;
let specialDiet = '&health=vegetarian';

// Get the value of input field when the "Search Button" is clicked 
searchBtn.onclick = getUserInput;
clearBtn.onclick = clearAll;
checkDietBtn.onclick = checkDietInput;

userInput.onkeydown = function (event) {
    if (event.keyCode == 13) {
        getUserInput();
    }
}

function checkDietInput() {
    if (vegetarianBtn.checked) {
        vegetarian = '&health=vegetarian';
    } else {
        vegetarian = '';
    }
    if (pescatarianBtn.checked) {
        pescatarian = '&health=pecatarian';
    } else {
        pescatarian = '';
    }
    if (ketoBtn.checked) {
        keto = '&health=keto-friendly';
    } else {
        keto = '';
    }
    if (shellfishBtn.checked) {
        shellfishfree = '&health=shellfish-free';
    } else {
        shellfishfree = '';
    }
    if (vegetarianBtn.checked || pescatarianBtn.checked || ketoBtn.checked || shellfishBtn.checked) {
        specialDiet = `${vegetarian}${pescatarian}${keto}${shellfishfree}`
    } else {
        specialDiet = null;
    }
}

function getUserInput() {
    output = '';
    query = userInput.value;
    console.log(query);
    if (query == null) {
        return;
    }
    let recipeurl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=fbe7fb97&app_key=43d5277fb4ac9ba443771811063ce750&${specialDiet}`
    fetch(recipeurl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < (data.hits).length; i++) {
                output +=
                    `                
                <div class="col-4 p-1">
                <div class="card">                
                <img src="${data.hits[i].recipe.images.SMALL.url}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">"${data.hits[i].recipe.label}"</h5>
                <p class="card-text">"${parseInt(data.hits[i].recipe.calories)} Calories"</p>
                </div>
                <ul class="list-group list-group-flush">
                    ${outputArray(data.hits[i].recipe.ingredientLines)}
                </ul>
                </div>
                </div>
                `;

                /*
                "<h3>" + data.hits[i].recipe.label + "</h3><p class='fw-bold'>" + parseInt(data.hits[i].recipe.calories) + "Calories</p>" + "<img src=" + data.hits[i].recipe.images.SMALL.url + ">" + outputArray(data.hits[i].recipe.ingredientLines);
                */

            }
            recipeItemsCtn.innerHTML = output;
        });
}

function clearAll() {
    userInput.value = null;
    output = '';
    recipeItemsCtn.innerHTML = '';
}

function outputArray(arr) {
    let arrOutput = '';
    for (let i = 0; i < arr.length - 1; i++) {
        arrOutput += `<li class="list-group-item">${arr[i]}<li/>`;
    }
    return arrOutput;
}
/*
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">A second item</li>
    <li class="list-group-item">A third item</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
*/