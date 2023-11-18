const { getCharacters } = require("rickmortyapi");

const getCharactersToMigrate = async () => {
    
    let characters = []
    let page = 1
    let maxPages = 2

    while( page < maxPages ) {
        
        const dirtyCharacters = await getCharacters({page: page})
        maxPages = dirtyCharacters.data.info.pages;

        let primeIds = dirtyCharacters.data.results.filter( (character) => isPrime(character.id) );

        primeIds = primeIds.map( (character) => {
            return { 
                character_id: character.id,
                firstname: character.name.split(" ")[0],
                lastname: character.name.split(" ")[1],
                status_character: character.status,
                character_species: character.species,
                character_gender: character.gender
            }
        });

        characters = characters.concat(primeIds)

        page++;
    }


    // trae los personajes

    // recorre los personajes metiendo en la lista los datos que necesito
    return characters;

};

const isPrime = (n, i = 2) => {
    if( n === 1)
        return true
    if( n <= 2 ) 
        return (n==2) ? true: false;
    if (n % i == 0)
        return false;
    if (i * i > n)
        return true;

    return isPrime(n, i + 1);
};

module.exports = getCharactersToMigrate;