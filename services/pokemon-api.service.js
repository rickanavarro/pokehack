const axios = require('axios')

class PokemonApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://pokeapi.co/api/v2'
        })
    }
    getAllPokemon() {
        const pokemonList = [];

        const fetchPokemon = (url) => {
            return this.axiosApp.get(url)
                .then((response) => {
                    const results = response.data.results;
                    const nextPageUrl = response.data.next;

                    pokemonList.push(...results);

                    if (nextPageUrl) {
                        return fetchPokemon(nextPageUrl);
                    }

                    const pokemonRequests = pokemonList.map((pokemon) => {
                        return this.getPokemonDetails(pokemon.name)
                            .then((response) => {
                                const imageUrl = response.data.sprites.front_default;
                                // const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                                return {
                                    ...pokemon,
                                    // name: capitalizedName,
                                    imageUrl: imageUrl
                                };
                            })
                            .catch((error) => {
                                console.log(`Error fetching details for ${pokemon.name}: ${error}`);
                                return null;
                            });
                    });

                    return Promise.all(pokemonRequests)
                        .then((pokemonDetails) => {
                            return pokemonDetails.filter((pokemon) => pokemon !== null);
                        });
                })
                .catch((error) => {
                    console.log(`Error fetching Pokemon list: ${error}`);
                    return [];
                });
        };

        return fetchPokemon('/pokemon');
    }

    getPokemonDetails(name) {
        return this.axiosApp.get(`/pokemon/${name}`);
    }

    getAllPokemonKanto() {
        return this.axiosApp.get('/pokedex/2')
    }

}







const pokemonApiHandler = new PokemonApiHandler()

module.exports = pokemonApiHandler