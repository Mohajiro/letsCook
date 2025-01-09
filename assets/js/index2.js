const dataLoading = async (url) => {
    try {
        const response = await fetch(url); // Отправляем HTTP-запрос на указанный URL.
        const data = await response.json(); // Преобразуем полученный ответ в формат JSON.
        return data; // Возвращаем данные.
    } catch (error) {
        console.error('Error loading data:', error); // Если произошла ошибка, выводим её в консоль.
    }
};

const displayRecipes = (recipes) => {
    const recipesListe = document.querySelector('.recipes'); // Находим контейнер для рецептов.

    recipesListe.innerHTML = ''; // Очищаем содержимое контейнера.

    recipes.forEach((element) => { // Перебираем каждый рецепт из списка.
        const recipeElement = document.createElement('div'); // Создаём новый div.
        recipeElement.className = 'recipe'; // Присваиваем класс.
        recipeElement.innerHTML = `
                <h2>${element.name}</h2> <!-- Название рецепта -->
                <img src="${element.image}" alt="${element.name}"> <!-- Изображение рецепта -->
                <p>
                Les ingridients: <br><br> <span>${element.ingredients.join(', ')}</span></p> <!-- Ингредиенты через запятую -->
        `;
        recipesListe.appendChild(recipeElement); // Добавляем элемент в контейнер.
    });
};

const updateRecipes = async (limit, filter, query) => {
    const url = `https://dummyjson.com/recipes/search?limit=${limit}&${filter}&q=${query}`; // Формируем URL с параметрами.
    const data = await dataLoading(url); // Загружаем данные с помощью функции `dataLoading`.
    if (data?.recipes) { // Если данные содержат рецепты:
        displayRecipes(data.recipes); // Отображаем их на странице.
    }
};

document.addEventListener('DOMContentLoaded', () => {
    dataLoading('https://dummyjson.com/recipes?limit=12') // Загружаем первые 12 рецептов.
        .then((data) => {
            if (data?.recipes) { // Если данные содержат рецепты:
                displayRecipes(data.recipes); // Отображаем их.
            }
        });

    const firstFilter = document.querySelector('#first-select'); // Первый селектор (кол-во на странице).
    const secondFilter = document.querySelector('#second-select'); // Второй селектор (сортировка).
    const searchForm = document.querySelector('.search-form'); // Форма поиска.

    let firstFilterValue = ''; // Начальное значение для первого фильтра.
    let secondFilterValue = ''; // Начальное значение для второго фильтра.
    let searchQuery = ''; // Начальное значение для строки поиска.

    // Обработчик изменений первого фильтра.
    firstFilter.addEventListener('change', (e) => {
        firstFilterValue = e.target.value; // Обновляем значение.
        updateRecipes(firstFilterValue, secondFilterValue, searchQuery); // Загружаем новые данные.
    });

    // Обработчик изменений второго фильтра.
    secondFilter.addEventListener('change', (e) => {
        secondFilterValue = e.target.value; // Обновляем значение.
        updateRecipes(firstFilterValue, secondFilterValue, searchQuery); // Загружаем новые данные.
    });

    // Обработчик отправки формы поиска.
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы.
        searchQuery = e.target[0].value; // Получаем текст из поля поиска.
        updateRecipes(firstFilterValue, secondFilterValue, searchQuery); // Загружаем новые данные.
    });
});

console.log("index.js loaded");
