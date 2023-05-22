document.addEventListener('DOMContentLoaded', function () {
    
    let liste = []

    fetch("https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0", "GET", recherche);

    // condition permettant de récupérer d'autre pokémon dans la liste

    const plus = document.querySelector(".plus")

    plus.addEventListener("click", () =>{
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=10&offset=10", "GET", recherche);
        plus.style.display = "none"
    })



    function fetch(url, method, fun) {
        //Initialisation de XHR
        const request = new XMLHttpRequest();
        request.addEventListener("load", fun)
        //Spécifier le type d'appelle [ GET, POST, PUT, PATCH, DELETE ] et l'URL
        request.open(method, url);
        //Spécification que je veux du JSON en type de retour
        request.setRequestHeader('Accept', "application/json")
        //Permet d'envoyer la requêtes
        request.send()
    }
    

    function recherche() {
        let result = JSON.parse(this.response);

        liste = result.results;

        console.log(liste);

        let joke = document.getElementById('jokes');
    joke.innerHTML = '';

        for (let i = 0; i < liste.length; i++) {
            //Je crée mon <li></li>
            let li = document.createElement('li');
            
            res = liste[i].name;
            // Je récupère les nom avec la boucle
            li.innerHTML = res;

            joke.appendChild(li);

                // Gestion du formulaire pour rechercher les pokémons

            let form = document.querySelector(".form")

            // Evenénement formulaire

            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Empêche le rechargement de la page

                

                // On récupére la valeur de l'input
                
                const searchValue = document.getElementById('poke').value;

                const selectValue = document.getElementById("select").value
                console.log(selectValue);

                // Appel de la fonction select pour le filtre

                fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`, "GET", select);

                // Appel de la fonction printY pour afficher les pokémons

                if (searchValue == result.results[i].name){
                    
                    fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`, "GET", printY);
                    fetch("https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0", "GET", recherche);
                }
                
                
            function select () {
            // filtrer avec le select par type de pokémon

        const selectValue = document.getElementById("select").value
        console.log(selectValue);
            result = JSON.parse(this.response);
            console.log(result);

            // Condition permettant de vérifier la saisie
                    
            if (selectValue == result.types[0].type.name || (result.types[1] && selectValue == result.types[1].type.name)) {
                li.innerHTML = `${result.name}`
                li.style.listStyleType = "disc"
                joke.append(li)
            }

            else {
                li.innerHTML = ""
                li.style.listStyleType = "none"
            }
        }

        

        function printY() {


            // Afficher les donnée au format json

            let pokemon = JSON.parse(this.response);

            // Afficher en titre le nom du pokémon

            const h1 = document.querySelector(".h1")

            h1.innerHTML = searchValue

            // Récupérer l'image du pokémon

            const image = document.querySelector(".image");

            image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`;


            // Récupérer les statistiques du pokémon

            const tableau = [pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[3].base_stat, pokemon.stats[4].base_stat, pokemon.stats[5].base_stat]

            console.log(pokemon);

            let stat = document.getElementById("stat");

            stat.innerHTML = `Vous avez sélectionnez le pokémon ${searchValue}, il a: <br> <ul> <li> ${tableau[0]} pv </li><br> <li> ${tableau[1]} attaque(s),</li> <br> <li> ${tableau[2]} defense(s),</li> <br> <li> ${tableau[3]} en attaque spéciale,</li><br> <li>${tableau[4]} en défense spéciale </li><br> </li><li>${tableau[5]} en vitesse</li> </ul>`

            // Récupérer le type du pokémon

            const type = document.getElementById("type")

            const type1 = document.getElementById("type1")

            const tableauType = pokemon.types.map(type => type.type.name);

            type.innerHTML = `Son premier type est ${tableauType[0]}`;

            if (tableauType.length > 1) {
            type1.innerHTML = `Son deuxième type est ${tableauType[1]}`;
            } else {
            type1.innerHTML = "Ce Pokémon n'a que un type";
            }
          }

            });

    }
    }
}
)