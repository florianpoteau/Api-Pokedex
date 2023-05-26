document.addEventListener('DOMContentLoaded', function () {

// Fetch


function fetch(url, method, fun) {
    //Initialisation de XHR
    const request = new XMLHttpRequest();
    request.addEventListener("load", fun);
    //Spécifier le type d'appel [ GET, POST, PUT, PATCH, DELETE ] et l'URL
    request.open(method, url);
    //Spécification que je veux du JSON en type de retour
    request.setRequestHeader('Accept', "application/json");
    //Permet d'envoyer la requête
    request.send();
  }

  let formulaireComplete = false;

  let nombrePokemon = 0;


  function click_liste_pokemon (result, i, ajouter) {

    if(formulaireComplete == true){
      
      ajouter.addEventListener("click", () => {
        const pokemonName = result.pokemon_species[i].name;
      
        // Vérifier si le nom du Pokémon existe déjà dans la liste
        const existingPokemon = formDresseur.querySelector(`li[data-name="${pokemonName}"]`);
        if (existingPokemon) {
          // Supprimer le Pokémon existant de la liste
        } else {
          nombrePokemon += 1;
          console.log(nombrePokemon);
          console.log(pokemonName);
      
          const li = document.createElement("li");
          li.setAttribute("data-name", pokemonName);
          li.innerHTML = pokemonName;
      
          if (nombrePokemon > 6) {
            // Supprimer le dernier Pokémon ajouté s'il y en a plus de 6
            formDresseur.removeChild(formDresseur.lastElementChild);
            nombrePokemon--;
          }
      
          formDresseur.appendChild(li);
        }
      });
      

      
    }
  }

    // événement sur le formulaire du dresseur
    

    const formDresseur = document.querySelector(".formDresseur");

    formDresseur.addEventListener("submit", (e) => {

      e.preventDefault();

      const inputDresseur = document.getElementById("dresseur").value
      const displayDresseur = document.querySelector(".displayDresseur");
      
      // Cookie pour récupérer le nom du dresseur
      document.cookie = `Dresseur =  ${inputDresseur}`; //Crée ou met à jour un cookie 'user'
      alert(document.cookie); //Affiche la liste des cookies

            // Création d'un élément p pour afficher le dresseur et suppression du bouton et de l'input

      const nomDresseur = document.createElement("p")
      formDresseur.appendChild(nomDresseur)
      nomDresseur.innerHTML = `Votre dresseur s'appelle: ${inputDresseur}`
      nomDresseur.style.color = "white"
      displayDresseur.style.display = "none"

      // Création d'un élément p pour choisir les pokémons
      const choixPokemon = document.createElement("p");
      choixPokemon.innerHTML = `Choisissez 6 pokémons en cliquant dessus via les générations`
      formDresseur.appendChild(choixPokemon)
      choixPokemon.style.color = "white"

      formulaireComplete = true;

      

    })

  // création des boutons de génération 1 à 9
      
  const flexGen = document.querySelector(".flexGen")

  // On boucle les boutons de 1 à 9 pour les créer

  for (let i = 1; i <= 9; i++) {
    const genButton = document.createElement("button");
    genButton.classList.add("gen");
    genButton.textContent = "Gen " + i;
      
    flexGen.appendChild(genButton);

    // Création d'un tableau de génération afin de le fournir en paramètre pour la fonction click_bouton_gen
    const generations = ["1", "2","3","4","5","6","7", "8","9"]

    // Sélection de tous les boutons créer
    let gen1 = document.querySelectorAll(".gen");
      
    // Boucle permettant de récupérer et d'afficher les générations de 1 à 9 sur chaque bouton
  for (let i = 0; i<gen1.length; i++){
  click_bouton_gen(gen1[i], generations[i]);
  }
  }



  // Fetch et fonction recherche permettant à l'input de rechercher un pokémon et d'afficher un pokémon avec ses statistiques
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`, "GET", recherche_nom)

  // Fonction click_bouton_gen
  // evénement au click
  function click_bouton_gen(gen, generation) {
      gen.addEventListener("click", (e) => {
        e.preventDefault();

        // Fetch permettant de rechercher chaque pokémon de chaque génération avec la fonction rechercheImg
        fetch(`https://pokeapi.co/api/v2/generation/${generation}`, "GET", Generation());
      });
  }

      
    
  // Fonction permettant de récupérer les images et le texte dans les générations
  function Generation() {

    

    return function () {
      let result = JSON.parse(this.response);
      const titre = document.querySelector(".titreGeneration");
      titre.style.color = "#f3bc57";
      
      // Supprimez le contenu de l'élément imageSrc avant d'ajouter de nouvelles images
      let imgSrc = document.querySelector(".imageSrc");
      imgSrc.innerHTML = '';

      // Faire une boucle pour afficher 10 images par génération et parcourir la liste
      for (let i = 0; i < result.pokemon_species.length; i++) {
        const pokemon = result.pokemon_species[i];
        titre.innerHTML = `Génération ${result.id}`
        const pokemonIndex = pokemon.url.split("/").slice(-2, -1)[0];
      
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

        
      
        // Créez un élément img pour afficher les images des Pokémon
        const imageElement = document.createElement("img");
        imageElement.classList.add("test")
        imageElement.src = imageUrl;
      
        // Créez un élément p pour afficher le nom de chaque Pokémon
        const nomPokemon = document.createElement("p");
        nomPokemon.innerHTML = pokemon.name;

        const boutonAjouter = document.createElement("button")
        boutonAjouter.innerHTML = "Ajouter"
        boutonAjouter.classList.add(".btnAjouter")
        boutonAjouter.style.width = "90%"
        boutonAjouter.style.height = "20px"
      
        // Créez un conteneur d'image disposé en flex en utilisant classList.add et ajoutez les images et le texte à ce conteneur
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("imageContainer");
        imageContainer.appendChild(imageElement);
        imageContainer.appendChild(nomPokemon);
        imageContainer.appendChild(boutonAjouter)
      
        imgSrc.appendChild(imageContainer);

        // Appelle de la fonction permettant d'ajouter un pokémon a la liste des dresseurs
        click_liste_pokemon(result, i, boutonAjouter);
      }
    };
  }

  // Function permettant d'afficher les statistiques d'un pokémon lors de l'envoie du formulaire avec le nom du pokémon

  function recherche_nom (){

    let result = JSON.parse(this.response);

    const nomPoke = document.querySelector(".nomPoke")
    const image = document.querySelector(".imagePokemon")
    const form = document.querySelector(".form")

    form.addEventListener("submit", (e) =>{
      e.preventDefault();

      const searchValue = document.querySelector("#poke").value.toLowerCase();

      for (let i = 0; i<result.results.length; i++){

        if (result.results[i].name.includes(searchValue)){
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${i}`, "GET", affichage_pokemon)
      }
        
    function affichage_pokemon(){

      let pokemon = JSON.parse(this.response);

      nomPoke.innerHTML = result.results[i].name

      image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`;

      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.results[0].name}/`, "GET", rechercheStatistique)
    }
    }
  })

}



    function rechercheStatistique (){
      result = JSON.parse(this.response);

      const hp = result.stats[0].base_stat
const attaque = result.stats[1].base_stat
const defense = result.stats[2].base_stat
const attaqueSp = result.stats[3].base_stat
const defenseSp = result.stats[4].base_stat
const speed = result.stats[5].base_stat

      const ctx = document.getElementById('myChart');

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['hp', 'attaque', 'defense', 'attaque spéciale', 'défense spéciale', 'vitesse'],
          datasets: [{
            label: ['Statistique'],
            data: [hp, attaque, defense, attaqueSp, defenseSp, speed],
            borderWidth: 1
                
          }]
        },
        options: {
          plugins: {
            customCanvasBackgroundColor: {
              color: 'lightGreen',
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    
  }

})

      
    

     
    //     //     function select () {
    //     //     // filtrer avec le select par type de pokémon

    //     // const selectValue = document.getElementById("select").value
    //     // console.log(selectValue);
    //     //     result = JSON.parse(this.response);
    //     //     console.log(result);

    //     //     // Condition permettant de vérifier la saisie
                    
    //     //     if (selectValue == result.types[0].type.name || (result.types[1] && selectValue == result.types[1].type.name)) {
    //     //         li.innerHTML = `${result.name}`
    //     //         li.style.listStyleType = "disc"
    //     //         joke.append(li)
    //     //     }

    //     //     else {
    //     //         li.innerHTML = ""
    //     //         li.style.listStyleType = "none"
    //     //     }
    //     // }

        

    

    //     //     // Récupérer le type du pokémon

    //     //     const type = document.getElementById("type")

    //     //     const type1 = document.getElementById("type1")

    //     //     const tableauType = pokemon.types.map(type => type.type.name);

    //     //     type.innerHTML = `Son premier type est ${tableauType[0]}`;

    //     //     if (tableauType.length > 1) {
    //     //     type1.innerHTML = `Son deuxième type est ${tableauType[1]}`;
    //     //     } else {
    //     //     type1.innerHTML = "Ce Pokémon n'a que un type";
    //     //     }
    //     //   }

    //         });

    // }
    // }
