// Chargement de la liste
const dataLoading = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

const displayRecipes = (recipes) => {
    const recipesListe = document.querySelector('.recipes');
    if (!recipesListe) {
        console.error('Recipes container not found!');
        return;
    }

    recipesListe.innerHTML = '';
    recipes.forEach((element) => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe';
        recipeElement.innerHTML = `
            <div class="card">
                <h2>${element.name}</h2>
                <img src="${element.image}" alt="${element.name}">
                <br>
                <span>${element.ingredients.join(', ')}</span>
                <br>
            </div>
        `;
        recipesListe.appendChild(recipeElement);
    });
};

const updateRecipes = async ( query = '', filter = '', limit = 12 ) => {
    const a = query ? `/search?q=${query}` : ''; 
    const b = filter ? `${query ? `&${filter}` : `?${filter}`}` : '' ;
    const c = limit ? `${query || filter ? `&limit=${limit}` : `?limit=${limit}`}` : ``;
    const url = `https://dummyjson.com/recipes${a}${b}${c}`;
    const data = await dataLoading(url);
    console.log('URL:', url);
    if (data?.recipes) {
        displayRecipes(data.recipes);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    dataLoading('https://dummyjson.com/recipes?limit=12')
        .then((data) => {
            if (data?.recipes) {
                displayRecipes(data.recipes);
            }
        });

    const firstFilter = document.querySelector('#first-select');
    const secondFilter = document.querySelector('#second-select');
    const searchInput = document.querySelector('.search-input'); 

    let firstFilterValue = '';
    let secondFilterValue = '';
    let searchQuery = '';


    firstFilter.addEventListener('change', (e) => {
        firstFilterValue = e.target.value;
        updateRecipes( searchQuery, secondFilterValue,  firstFilterValue); 
    });

    secondFilter.addEventListener('change', (e) => {
        secondFilterValue = e.target.value;
        updateRecipes( searchQuery, secondFilterValue,  firstFilterValue);
    });


    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value; 
        updateRecipes( searchQuery, secondFilterValue,  firstFilterValue); 
    });
});

console.log("index.js loaded");
