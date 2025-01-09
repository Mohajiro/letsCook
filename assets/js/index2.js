// Founction de la telechargement des données
const dataLoading = async (url) => { 
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Data is: ', data);
        return data;
    } catch (error) {
        console.error('Loading error: ', error);
    }
};

// REcuperation des element de DOM
const recipesListe = document.querySelector('.recipes');

// Founction d'affichage des données
const displayRecipes = async (url) => {
    const data = await dataLoading(url)

    if (!recipesListe) {
        console.error('Error of loading, block recipes not found');
    }

    if (recipesListe .length === 0) {
        console.error('Error of loading, no recipes found');
    }

    recipesListe.innerHTML = "";
    console.log('Data is: ', data);
    data.recipes.forEach(element => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe';
        recipeElement.innerHTML = `
        <h2>Recette: ${element.name}</h2>
        <img src="${element.image}" alt="${element.name}">
        Les ingridients: <br><br> <span>${element.ingredients.join(', ')}</span></p>
        `;
        recipesListe.appendChild(recipeElement);
    });
}

displayRecipes('https://dummyjson.com/recipes');


// Function de la formation d'url

const urlFormer = (limit, filter, query) => {
    let url = `https://dummyjson.com/recipes/search?limit=${limit}&${filter}&q=${query}`;


}