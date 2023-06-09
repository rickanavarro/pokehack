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
                                return {
                                    ...pokemon,
                                    url: imageUrl
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
            .then(response => {
                const pokemonList = response.data.pokemon_entries;
                const pokemonPromises = pokemonList.map(pokemon => {
                    return this.axiosApp.get(`/pokemon/${pokemon.pokemon_species.name}`)
                        .then(pokemonDetailsResponse => {
                            const pokemonDetails = {
                                name: pokemon.pokemon_species.name,
                                id: pokemonDetailsResponse.data.id,
                                url: pokemonDetailsResponse.data.sprites.front_default,
                            };
                            return pokemonDetails;
                        });
                });
                return Promise.all(pokemonPromises);
            })
            .catch(err => {
                console.log(err);
                return [];
            });
    }

    getAllPokemonJohto() {
        return this.axiosApp.get('/pokedex/3')
            .then(response => {
                const pokemonList = response.data.pokemon_entries;
                const pokemonPromises = pokemonList.map(pokemon => {
                    return this.axiosApp.get(`/pokemon/${pokemon.pokemon_species.name}`)
                        .then(pokemonDetailsResponse => {
                            const pokemonDetails = {
                                name: pokemon.pokemon_species.name,
                                id: pokemonDetailsResponse.data.id,
                                url: pokemonDetailsResponse.data.sprites.front_default,
                            };
                            return pokemonDetails;
                        });
                });
                return Promise.all(pokemonPromises);
            })
            .catch(err => {
                console.log(err);
                return [];
            });
    }



    // getAllPokemonHoenn() {

    //     console.log('ENTRANDO')

    //     this.axiosApp
    //         .get('/pokedex/4')
    //         .then(({ data }) => {
    //             console.log('LA DATA ------>', data)
    //             const pokePromises = data.pokemon_entries.map(({ pokemon_species }) => this.axiosApp.get(`/pokemon/${pokemon_species.name}`))
    //             return Promise.all(pokePromises)
    //         })
    //         .catch(err => console.log(err))
    // }


    async getAllPokemonSinnoh() {
        const response = await this.axiosApp.get('/pokedex/5');
        const pokemonList = response.data.pokemon_entries;
        const pokemonDetailsList = await Promise.all(pokemonList.map(async (pokemon) => {
            const pokemonDetailsResponse = await this.axiosApp.get(`/pokemon/${pokemon.pokemon_species.name}`);
            const pokemonDetails = {
                name: pokemon.pokemon_species.name,
                id: pokemonDetailsResponse.data.id,
                url: pokemonDetailsResponse.data.sprites.front_default,
            };
            return pokemonDetails;
        }));
        return pokemonDetailsList;
    }



}
const pokemonApiHandler = new PokemonApiHandler()

module.exports = pokemonApiHandler