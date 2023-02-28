let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      pokemon.name &&
      Object.keys(pokemon).length <= 4
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Make sure item is an object and has a name");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = $(".pokemon-list");
    let listItem = $('<li class="list-group-item"></li>');
    let button = $(
      '<button class="pokemon-button bth bth-outline-dark" data-target="#pokemon-modal" data-toggle="modal">' +
        pokemon.name +
        "</button>"
    );
    listItem.append(button);
    pokemonList.append(listItem);
    button.on("click", function () {
      showDetails(pokemon);
    });
  }

  //load pokemons
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map((type) => type.type.name);
        pokemon.abilities = details.abilities.map(
          (abilities) => abilities.ability.name
        );
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalBody.empty();
    modalTitle.empty(pokemon.name);

    let imagePokemonFront = $(
      '<img class = "pokemon-img" src = "' + pokemon.imageUrl + '"/>'
    );
    let heightPokemon = $("<p>" + "Height: " + pokemon.height + "</p>");
    let typesPokemon = $("<p>" + "Types: " + pokemon.types + "</p>");
    let abilitiesPokemon = $(
      "<p>" + "Abilities: " + pokemon.abilities + "</p>"
    );

    modalBody.append(imagePokemonFront);
    modalBody.append(heightPokemon);
    modalBody.append(typesPokemon);
    modalBody.append(abilitiesPokemon);
  }

  function searchPokemon() {
    let inputValue = $("input").val().toLowerCase();
    $(".pokemon-list").empty();
    pokemonList.forEach((pokemon) => {
      loadDetails(pokemon);
      if (pokemon.name.includes(inputValue)) {
        addListItem(pokemon);
      }
    });
  }

  $(".search__button").on("click", (e) => {
    e.preventDefault();
    searchPokemon();
  });

  $("input").on("input", (e) => {
    e.target.value === "" &&
      getAll().forEach((pokemon) => addListItem(pokemon));
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
