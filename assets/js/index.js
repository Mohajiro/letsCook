const dataLoading = async() => {
    const response = await fetch('https://dummyjson.com/recipes?limit=12&sortBy=id&order=desc');
    const data = await response.json();
    return data;
};

const dataAffiching = () => {
    dataLoading()
        .then(data => {
            console.log(data.recipes);
            const recipesListe = document.querySelector('.recipes');

            data.recipes.map((element) => {
                const recipeElement = document.createElement('div');
                recipeElement.className = 'recipe';
                recipeElement.innerHTML = `
                    <h2>${element.name}</h2> 
                    <img src='${element.image}' alt='${element.name}'>
                    <br>
                    <br>
                    <span>${element.ingredients.join(', ')}</span>
                    <br>`;
                recipesListe.appendChild(recipeElement);
            });
        })
        .catch(error => {
            console.error('Error fetching or displaying data:', error);
        });
};

dataAffiching();

console.log("index.js loaded");

const search = document.querySelector('.search-form');
const firstFilter = document.querySelector('#first-select');
const secondFilter = document.querySelector('#second-select');
let secondFilterValue = '';
let firstFilterValue = '';
console.log(secondFilter);
firstFilter.addEventListener('change', (e)=> {
    console.log(e);
    firstFilterValue = e.target.value;
    console.log(firstFilterValue);
    return firstFilterValue;
})


search.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInfo = e.target[0].value;
    console.log(searchInfo);

    fetch(`https://dummyjson.com/recipes/search?limit=${firstFilterValue}&q=${searchInfo}`)
        .then((res) => res.json())
        .then((searchData) => {
            console.log(searchData);

            const recipesListe = document.querySelector('.recipes');
            recipesListe.innerHTML = '';

            searchData.recipes.map((element) => {
                const recipeElement = document.createElement('div');
                recipeElement.className = 'recipe';
                recipeElement.innerHTML = `
                    <h2>${element.name}</h2>
                    <img src='${element.image}' alt='${element.name}'>
                    <br>
                    <br>
                    <span>${element.ingredients.join(', ')}</span>
                    <br>`;
                recipesListe.appendChild(recipeElement);
            });
        })
        .catch(error => {
            console.error('Erreur de rechercher:', error);
        });
});
