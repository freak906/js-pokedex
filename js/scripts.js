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
    function add(item) {
        if (typeof item === "object" && item.name && item.height && item.type && item.weaknesses && Object.keys(item).length <= 4){
            pokemonList.push(item);
        }else{
            console.log('Make sure item is an object and has name, height, type and weaknesses properties');
        }
    }
    function getAll(){
        return pokemonList;
    }
    return {
        getAll: getAll,
        add: add
    };
})();

let newPokemon = {name: 'Ninetales', height: 3.7, type: 'fire', weaknesses: ['water','ground','rock']};
console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add(newPokemon));

pokemonRepository.getAll().forEach(function(pokemons) {
    document.write('Name: ' + pokemons.name + ', ' + 'Height: '  + pokemons.height + ', ' + 'Type: ' + pokemons.type + ', ' + 'Weaknesses: ' + pokemons.weaknesses[0] + '<br>');
    console.log('Name: ' + pokemons.name + ', ' + 'Height: '  + pokemons.height + ', ' + 'Type: ' + pokemons.type + ', ' + 'Weaknesses: ' + pokemons.weaknesses[0] + '<br>');
});

