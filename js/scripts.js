let pokemonList = [ {
    name: 'Scyther',
    height: 1.5,
    types: ['bug', 'flying', 'swarm']
},{
    name: 'Mewtwo',
    height: 2,
    types: ['psychic', 'pressure', 'unnerve']
},{
    name: 'Noctowl',
    height: 1.6,
    types: ['flying', 'insomnia', 'keen-eye']
}];
let big = " - Wow, that's big!";
for (let i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height > 1.6){
        document.write(pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + ')' + big + '<br>' );
    }else{
        document.write(pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + ')' + '<br>');
    }
}