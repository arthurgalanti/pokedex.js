const pokdemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 16
let offset = 0

function loadPokemonCards(offset, limit) {

pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type} ">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}"
                alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pokdemonList.innerHTML += newHtml
    })
    
}

loadPokemonCards(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonCards(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonCards(offset, limit)
    }
    
})