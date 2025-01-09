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
        console.error('Recipes container not found');
        return;
    }

    recipesListe.innerHTML = '';

    if (recipes.length === 0) {
        recipesListe.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach((element) => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe';
        recipeElement.innerHTML = `
            <h2>${element.name}</h2>
            <img src="${element.image}" alt="${element.name}">
            <p>
                Ingredients: <span>${element.ingredients.join(', ')}</span>
            </p>
        `;
        recipesListe.appendChild(recipeElement);
    });
};

const updateRecipes = async (limit = 12, filter = '', query = '') => {
    const filterParam = filter ? `filter=${filter}` : '';
    const queryParam = query ? `q=${query}` : '';
    const url = `https://dummyjson.com/recipes/search?limit=${limit}&${filterParam}&${queryParam}`;

    const data = await dataLoading(url);

    if (data?.recipes) {
        displayRecipes(data.recipes);
    } else {
        console.error('No recipes found for this query.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const limit = 12;

    dataLoading(`https://dummyjson.com/recipes?limit=${limit}`).then((data) => {
        if (data?.recipes) {
            displayRecipes(data.recipes);
        }
    });

    const firstFilter = document.querySelector('#first-select');
    const secondFilter = document.querySelector('#second-select');
    const searchInput = document.querySelector('.search-form input');

    let firstFilterValue = '';
    let secondFilterValue = '';
    let searchQuery = '';

    if (firstFilter) {
        firstFilter.addEventListener('change', (e) => {
            firstFilterValue = e.target.value;
            updateRecipes(limit, firstFilterValue, searchQuery);
        });
    }

    if (secondFilter) {
        secondFilter.addEventListener('change', (e) => {
            secondFilterValue = e.target.value;
            updateRecipes(limit, secondFilterValue, searchQuery);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            updateRecipes(limit, firstFilterValue, searchQuery);
        });
    }
});

console.log('index.js loaded');
