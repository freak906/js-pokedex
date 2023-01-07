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
        let pokemonList = $('.pokemon-list');
        let listItem = $('<li class="list-group-item"></li>');
        let button = $('<button class="pokemon-button bth bth-outline-dark" data-target="#pokemon-modal" data-toggle="modal">' + pokemon.name + '</button>');
        listItem.append(button);
        pokemonList.append(listItem);
        button.on('click', function(){
            showDetails(pokemon);
        });
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
          item.types = details.types.map((type) => type.type.name);
          item.abilities = details.abilities.map((abilities) => abilities.ability.name);
        }).catch(function (e) {
          console.error(e);
        });
      }
       function showDetails(pokemon) {
         pokemonRepository.loadDetails(pokemon).then(function() {
             showModal(pokemon);
         });
       }
      function showModal(pokemon){
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalBody.empty();
        modalTitle.empty(pokemon.name);

        let imagePokemonFront = $('<img class = "pokemon-img" src = "' + pokemon.imageUrl + '"/>');
        let heightPokemon = $('<p>' + 'Height: ' + pokemon.height + '</p>');
        let typesPokemon = $('<p>' + 'Types: ' + pokemon.types + '</p>');
        let abilitiesPokemon = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

        modalBody.append(imagePokemonFront);
        modalBody.append(heightPokemon);
        modalBody.append(typesPokemon);
        modalBody.append(abilitiesPokemon);
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
// //pushed a new pokemon in
// let newPokemon = {name: 'Ninetales', height: 3.7, type: 'fire', weaknesses: ['water','ground','rock']};
// console.log(pokemonRepository.getAll());
// console.log(pokemonRepository.add(newPokemon));

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

