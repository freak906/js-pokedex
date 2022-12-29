let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    function add(pokemon) {
        if (typeof pokemon === "object" && pokemon.name && Object.keys(pokemon).length <= 4){
            pokemonList.push(pokemon);
        }else{
            console.log('Make sure item is an object and has a name');
        }
    }
    function getAll(){
        return pokemonList;
    }
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        });
    }
    function showDetails(pokemon){
        console.log(pokemon);
    }
    //load pokemons
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }
      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }
      function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function() {
            console.log(item);
        });
      }
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();
/*pushed a new pokemon in
let newPokemon = {name: 'Ninetales', height: 3.7, type: 'fire', weaknesses: ['water','ground','rock']};
console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add(newPokemon));*/

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

