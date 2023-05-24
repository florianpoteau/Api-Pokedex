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
      
        // Boucle permettant de récupérer et de afficher les générations de 1 à 7 sur chaque bouton
      for (let i = 0; i<gen1.length; i++){
      click_bouton_gen(gen1[i], generations[i]);
      }
      }

      // Fetch et fonction recherche permettant à l'input de rechercher un pokémon et d'afficher un pokémon avec ses statistiques
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`, "GET", recherche)

      // Fonction click_bouton_gen appellé dans la boucle ligne 38
      // evénement au click
      function click_bouton_gen(gen, generation) {
          gen.addEventListener("click", (e) => {
            e.preventDefault();

            // Fetch permettant de rechercher chaque pokémon de chaque génération avec la fonction rechercheImg
            fetch(`https://pokeapi.co/api/v2/generation/${generation}`, "GET", rechercheImg());
          });
      }
    
      // Fonction permettant de récupérer les images et le texte dans les générations
      function rechercheImg() {
        return function () {
          let result = JSON.parse(this.response);
          console.log(result);
          const titre = document.querySelector(".titreGeneration");
          titre.style.color = "#f3bc57";
      
          // Supprimez le contenu de l'élément imageSrc avant d'ajouter de nouvelles images
          let imgSrc = document.querySelector(".imageSrc");
          imgSrc.innerHTML = '';

          // Faire une boucle pour afficher 10 images par génération et parcourir la liste
          for (let i = 0; i < result.pokemon_species.length; i++) {
            const pokemon = result.pokemon_species[i];
            console.log(result);
            const pokemonIndex = pokemon.url.split("/").slice(-2, -1)[0];
      
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
      
            // Créez un élément img pour afficher les images des Pokémon
            const imageElement = document.createElement("img");
            imageElement.classList.add("test")
            imageElement.src = imageUrl;
      
            // Créez un élément p pour afficher le nom de chaque Pokémon
            const nomPokemon = document.createElement("p");
            nomPokemon.innerHTML = pokemon.name;
      
            // Créez un conteneur d'image disposé en flex en utilisant classList.add et ajoutez les images et le texte à ce conteneur
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("imageContainer");
            imageContainer.appendChild(imageElement);
            imageContainer.appendChild(nomPokemon);
      
            imgSrc.appendChild(imageContainer);
          }
        };
      }

      // Function permettant d'afficher les statistiques d'un pokémon lors de l'envoie du formulaire avec le nom du pokémon

      function recherche (){

        let result = JSON.parse(this.response);

        const nomPoke = document.querySelector(".nomPoke")
        const image = document.querySelector(".imagePokemon")
        const form = document.querySelector(".form")

        form.addEventListener("submit", (e) =>{
          e.preventDefault();

          const searchValue = document.querySelector("#poke").value.toLowerCase();

          for (let i = 0; i<result.results.length; i++){

            if (result.results[i].name.includes(searchValue)){
            fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${i}`, "GET", rechercheNom)
          }
        
        function rechercheNom(){

          let pokemon = JSON.parse(this.response);

          nomPoke.innerHTML = result.results[i].name

          image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`;

          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.results[0].name}/`, "GET", rechercheStatistique)
  
        }

        function rechercheStatistique (){
          pokemon = JSON.parse(this.response);
          const hauteur = document.querySelector(".hauteur");
          const largeur = document.querySelector(".largeur");
          const pv = document.querySelector(".pv")
          const type = document.querySelector(".abilite")
          console.log(pokemon);

          hauteur.textContent= `Hauteur: ${pokemon.height}`
          largeur.textContent = `Largeur: ${pokemon.weight}`
          pv.textContent = `Pv: ${pokemon.stats[0].base_stat}`

          const tableauType = pokemon.types.map(type => type.type.name);

          console.log(tableauType[1]);

          type.textContent= `Abilité(s): ${tableauType[0]}, ${tableauType[1]}`

        }
      
      }
        })
        
      }

    }
    )

      
    

     
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
