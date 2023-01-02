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
          item.types = details.types.map((type) => type.type.name).join(',');
        }).catch(function (e) {
          console.error(e);
        });
      }
      function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function() {
            showModal(item);
        });
      }
      
      let modalContainer = document.querySelector('#modal-container');
      
      function showModal(pokemon){
          modalContainer.innerText = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let pokemonName = document.createElement('h1');
        pokemonName.innerText = pokemon.name;

        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageUrl;
        
        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + pokemon.height;

        let pokemonTypes = document.createElement('p');
        pokemonTypes.innerText = 'Types: ' + pokemon.types;


        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = 'X';
        closeButton.addEventListener('click', hideModal);

        modal.appendChild(closeButton);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonImage);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonTypes)
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
        
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

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

