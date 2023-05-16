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

    async getAllPokemonKanto() {
        const response = await this.axiosApp.get('/pokedex/2');
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
    async getAllPokemonJohto() {
        const response = await this.axiosApp.get('/pokedex/3');
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
    // async getAllPokemonHoenn() {

    //     const response = await this.axiosApp.get('/pokedex/4');
    //     const pokemonList = response.data.pokemon_entries;
    //     let pokemonPromises = pokemonList.map((pokemon) =>
    //     this.axiosApp.get(`/pokemon/${pokemon.pokemon_species.name}`)
    //     )
    //     pokemonPromises = pokemonPromises.slice(0, 4)
    //     const pokemonResponses = await Promise.all(pokemonPromises);
    //     const pokemonDetailsList = pokemonResponses.map(reponse => reponse?.data)
    //     console.log({ pokemonDetailsList })
    //     return pokemonDetailsList;

    // }

    // const pokemonDetailsList = await Promise.all(pokemonList.map(async (pokemon) => {
    //     const pokemonDetailsResponse = await this.axiosApp.get(`/pokemon/${pokemon.pokemon_species.name}`);
    //     const pokemonDetails = {
    //         name: pokemon.pokemon_species.name,
    //         id: pokemonDetailsResponse.data.id,
    //         url: pokemonDetailsResponse.data.sprites.front_default,
    //     };
    //     console.log("------------------------------------------------", pokemonDetails)
    //     return pokemonDetails;
    // }));
    // console.log('-------------------------------------------------------', pokemonDetailsList)
    // return pokemonDetailsList;





    // async getAllPokemonSinnoh() {
    //     const response = await this.axiosApp.get('/pokedex/5');
    //     const pokemonList = response.data.pokemon_entries;
    //     const pokemonDetailsList = await Promise.all(pokemonList.map(async (pokemon) => {
    //         const pokemonDetailsResponse = await this.axiosApp.get(`/pokemon/${pokemon.pokemon_species.name}`);
    //         const pokemonDetails = {
    //             name: pokemon.pokemon_species.name,
    //             id: pokemonDetailsResponse.data.id,
    //             url: pokemonDetailsResponse.data.sprites.front_default,
    //         };
    //         return pokemonDetails;
    //     }));
    //     return pokemonDetailsList;
    // }



}
const pokemonApiHandler = new PokemonApiHandler()

module.exports = pokemonApiHandler