const axios = require('axios')

class PokemonApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://pokeapi.co/api/v2'
        })
    }

    getAllPokemon() {
        return this.axiosApp.get('/pokemon')
            .then((response) => {
                const results = response.data.results;
                const nextPageUrl = response.data.next;

                if (nextPageUrl) {
                    return this.getAllPokemonRecursively(results, nextPageUrl);
                }
                const pokemonRequests = results.map((pokemon) => {
                    return this.getPokemonDetails(pokemon.name)
                        .then((response) => {
                            pokemon.imageUrl = response.data.sprites.front_default
                            return pokemon
                        })
                })

                return Promise.all(pokemonRequests)
            });
    }

    getAllPokemonRecursively(pokemonList, nextPageUrl) {
        return this.axiosApp.get(nextPageUrl)
            .then((response) => {
                const results = response.data.results;
                const newPokemonList = pokemonList.concat(results);
                const newNextPageUrl = response.data.next;

                if (newNextPageUrl) {
                    return this.getAllPokemonRecursively(newPokemonList, newNextPageUrl);
                }


                return newPokemonList;
            });
    }

    getPokemonDetails(name) {
        return this.axiosApp.get(`/pokemon/${name}`);
    }

}






const pokemonApiHandler = new PokemonApiHandler()

module.exports = pokemonApiHandler