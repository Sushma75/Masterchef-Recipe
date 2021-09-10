const searchForm =document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery='';
const APP_ID= 'ce0bc8f8';
const APP_key='67ad609b0c07f57e9c0a0da42788d7e7';


searchForm.addEventListener('submit',(e)=> {
    e.preventDefault();
    searchQuery= e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI(){
    const baseURL= `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=ce0bc8f8&app_key=67ad609b0c07f57e9c0a0da42788d7e7&ingr=30`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}
function generateHTML(results)
{
    let generatedHTML='';
    results.map(result =>{
        generatedHTML +=
     `
     <div class="item">
        <img src="${result.recipe.image}"/>
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
        </div>
        <p class="item-data">calories:${result.recipe.calories.toFixed(2)}</p><br/>
        <p class="item-data">Health Label:${result.recipe.dishType}</p>
     </div> `
    })
    searchResultDiv.innerHTML=generatedHTML;
}