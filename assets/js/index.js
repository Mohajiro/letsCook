const chargerDonnees = async (url) => {
    try {
        const reponse = await fetch(url);
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${reponse.status}`);
        }
        const donnees = await reponse.json();
        return donnees;
    } catch (erreur) {
        console.error('Erreur lors du chargement des données :', erreur);
        const recettesListe = document.querySelector('.recipes');
        recettesListe.innerHTML = `<p class="message-erreur">Erreur de chargement des données. Veuillez réessayer plus tard.</p>`;
        return null;
    }
};

const afficherRecettes = (recettes) => {
    const recettesListe = document.querySelector('.recipes');
    recettesListe.innerHTML = ''; // Vider le conteneur avant d'ajouter les nouvelles recettes

    if (recettes.length === 0) {
        recettesListe.innerHTML = `<p class="aucune-recette">Aucune recette ne correspond à votre recherche.</p>`;
        return;
    }

    recettes.forEach((element) => {
        const recetteElement = document.createElement('div');
        recetteElement.className = 'recipe';
        recetteElement.innerHTML = `
            <h2>${element.name}</h2>
            <img src="${element.image}" alt="${element.name}">
            <p>Ingrédients : <span>${element.ingredients.join(', ')}</span></p>
        `;
        recettesListe.appendChild(recetteElement);
    });
};

const mettreAJourRecettes = async (limite, filtre, requete) => {
    const url = `https://dummyjson.com/recipes?limit=${limite}&${filtre}&q=${requete}`;
    const donnees = await chargerDonnees(url);
    if (donnees && donnees.recipes) {
        afficherRecettes(donnees.recipes);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const limiteDefaut = 12;
    const filtreDefaut = '';
    const requeteDefaut = '';

    // Charger les 12 premières recettes au chargement de la page
    mettreAJourRecettes(limiteDefaut, filtreDefaut, requeteDefaut);

    const premierFiltre = document.querySelector('#first-select');
    const deuxiemeFiltre = document.querySelector('#second-select');
    const champRecherche = document.querySelector('.search-input');

    let valeurPremierFiltre = limiteDefaut;
    let valeurDeuxiemeFiltre = filtreDefaut;
    let requeteRecherche = requeteDefaut;

    // Gestion du changement du premier filtre (limite des recettes)
    premierFiltre.addEventListener('change', (e) => {
        valeurPremierFiltre = e.target.value;
        mettreAJourRecettes(valeurPremierFiltre, valeurDeuxiemeFiltre, requeteRecherche);
    });

    // Gestion du changement du deuxième filtre (tri)
    deuxiemeFiltre.addEventListener('change', (e) => {
        valeurDeuxiemeFiltre = e.target.value;
        mettreAJourRecettes(valeurPremierFiltre, valeurDeuxiemeFiltre, requeteRecherche);
    });

    // Gestion de la saisie dans le champ de recherche
    champRecherche.addEventListener('input', (e) => {
        requeteRecherche = e.target.value;
        mettreAJourRecettes(valeurPremierFiltre, valeurDeuxiemeFiltre, requeteRecherche);
    });
});
