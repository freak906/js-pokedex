let pokemonRepository = (function(){
let pokemonList = [{
    name: 'Scyther',
    height: 4.11,
    type: 'bug',
    weaknesses: ['fire','ice','electric'] 
},{
    name: 'Mewtwo',
    height: 6.7,
    type: 'psychic',
    weaknesses: ['dark','bug','ghost']
},{
    name: 'Noctowl',
    height: 5.3,
    type: 'flying',
    weaknesses: ['ice','rock','electric']
}];
    function add(pokemon) {
        if (typeof pokemon === "object" && pokemon.name && pokemon.height && pokemon.type && pokemon.weaknesses && Object.keys(pokemon).length <= 4){
            pokemonList.push(pokemon);
        }else{
            console.log('Make sure item is an object and has name, height, type and weaknesses properties');
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
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})();
//pushed a new pokemon in
let newPokemon = {name: 'Ninetales', height: 3.7, type: 'fire', weaknesses: ['water','ground','rock']};
console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add(newPokemon));

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon)
});
