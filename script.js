document.addEventListener('DOMContentLoaded', function () {

    fetch("https://pokeapi.co/api/v2/pokemon/", "GET", recherche);

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

        for (let i = 0; i < result.results.length; i++) {
            //Je crée mon <li></li>
            let li = document.createElement('li');
            
            res = result.results[i].name
            // Je récupère les nom avec la boucle
            li.innerHTML = res;

            document.getElementById('jokes').append(li);

            // Gestion du formulaire pour rechercher les pokémons

            let form = document.querySelector(".form")

            // Event formulaire

            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Empêche le rechargement de la page

                // On récupére la valeur de l'input
                
                const searchValue = document.getElementById('poke').value;

                // Condition permettant de vérifier la saisie

                if (searchValue == result.results[i].name){
                    let p = document.getElementById("stat")
                    p.innerHTML = "vvgvgvjgvvvgvgjvgvggvgvjgggggggggggggggggggggggggggggggggg"
                    console.log("ok");
                }

                else{
                    console.log("Mauvaise valeur");
                }

            });

    }
    }
}
)