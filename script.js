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

      // variable pour les bouton gen
      
      let gen1 = document.querySelector(".gen1");
      let gen2 = document.querySelector(".gen2");
      let gen3 = document.querySelector(".gen3");
      let gen4 = document.querySelector(".gen4");
      let gen5 = document.querySelector(".gen5");
      let gen6 = document.querySelector(".gen6");
      let gen7 = document.querySelector(".gen7");

      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`, "GET", recherche)

      // evénement au click
      
      function click_bouton_gen(gen, generation) {
        gen.addEventListener("click", (e) => {
          e.preventDefault();
          fetch(`https://pokeapi.co/api/v2/generation/${generation}`, "GET", rechercheImg());
        });
      }
      
      function rechercheImg() {
        return function () {
          let result = JSON.parse(this.response);
          const titre = document.querySelector(".titreGeneration");
          titre.style.color = "#f3bc57";
      
          // Supprimez le contenu de l'élément imageSrc avant d'ajouter de nouvelles images
          let imgSrc = document.querySelector(".imageSrc");
          imgSrc.innerHTML = '';
      
          for (let i = 0; i < 10; i++) {
            console.log(result);
            const pokemon = result.pokemon_species[i];
            console.log(result);
            const pokemonIndex = pokemon.url.split("/").slice(-2, -1)[0];
      
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
      
            // Créez un élément img pour afficher les images des Pokémon
            const imageElement = document.createElement("img");
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
      
      
      
      click_bouton_gen(gen1, "generation-i", 0);
      click_bouton_gen(gen2, "generation-ii", 151);
      click_bouton_gen(gen3, "generation-iii", 251);
      click_bouton_gen(gen4, "generation-iv", 386);
      click_bouton_gen(gen5, "generation-v", 494);
      click_bouton_gen(gen6, "generation-vi", 650);
      click_bouton_gen(gen7, "generation-vii", 722);

      function recherche (){

        let result = JSON.parse(this.response);

        const nomPoke = document.querySelector(".nomPoke")
        const image = document.querySelector(".imagePokemon")
        const form = document.querySelector(".form")

        form.addEventListener("submit", (e) =>{
          e.preventDefault();

          const searchValue = document.querySelector("#poke").value;

          for (let i = 0; i<result.results.length; i++){

            if (searchValue == result.results[i].name){
            fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${i}`, "GET", rechercheNom)
          }
        
        function rechercheNom(){

          let pokemon = JSON.parse(this.response);

          nomPoke.innerHTML = searchValue

          image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`;

          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.results[0].name}/`, "GET", rechercheStatistique)
  
        }

        function rechercheStatistique (){
          pokemon = JSON.parse(this.response);
          const hauteur = document.querySelector(".hauteur");
          const largeur = document.querySelector(".largeur");
          const pv = document.querySelector(".pv")
          console.log(pokemon);

          hauteur.textContent= `Hauteur: ${pokemon.height}`
          largeur.textContent = `Largeur: ${pokemon.weight}`
          pv.textContent = `Pv: ${pokemon.stats[0].base_stat}`
        }
      
      }
        })
        
      }

      

      
    

    // function recherche() {
    //     let result = JSON.parse(this.response);

    //     liste = result.results;

    //     console.log(liste);

    //     let joke = document.getElementById('jokes');
    // joke.innerHTML = '';


    //     for (let i = 0; i < liste.length; i++) {
    //         //Je crée mon <li></li>
    //         let li = document.createElement('li');

    //         const image = document.querySelector(".image");

    //         image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`;

    //         joke.appendChild(li);

    //             // Gestion du formulaire pour rechercher les pokémons

    //         let form = document.querySelector(".form")

    //         // Evenénement formulaire

    //         form.addEventListener('submit', function(event) {
    //             event.preventDefault(); // Empêche le rechargement de la page

                

    //             // On récupére la valeur de l'input
                
    //             const searchValue = document.getElementById('poke').value;

    //             // const selectValue = document.getElementById("select").value
    //             // console.log(selectValue);

    //             // Appel de la fonction select pour le filtre

    //             // fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`, "GET", select);

    //             // Appel de la fonction printY pour afficher les pokémons

    //             if (searchValue == result.results[i].name){
                    
    //                 fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`, "GET", printY);
    //                 fetch("https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0", "GET", recherche);
    //             }
                
                
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

        

    //     // function printY() {


    //     //     // Afficher les donnée au format json

    //     //     let pokemon = JSON.parse(this.response);

    //     //     // Afficher en titre le nom du pokémon

    //     //     const h1 = document.querySelector(".h2")

    //     //     h1.innerHTML = searchValue

    //     //     // Récupérer l'image du pokémon

    //     //     const image = document.querySelector(".image");

    //     //     image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`;


    //     //     // Récupérer les statistiques du pokémon

    //     //     const tableau = [pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[3].base_stat, pokemon.stats[4].base_stat, pokemon.stats[5].base_stat]

    //     //     console.log(pokemon);

    //     //     let stat = document.getElementById("stat");

    //     //     stat.innerHTML = `Vous avez sélectionnez le pokémon ${searchValue}, il a: <br> <ul> <li> ${tableau[0]} pv </li><br> <li> ${tableau[1]} attaque(s),</li> <br> <li> ${tableau[2]} defense(s),</li> <br> <li> ${tableau[3]} en attaque spéciale,</li><br> <li>${tableau[4]} en défense spéciale </li><br> </li><li>${tableau[5]} en vitesse</li> </ul>`

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
}
)