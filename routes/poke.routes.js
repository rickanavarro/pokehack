const router = require("express").Router()
const exphbs = require("express-handlebars");

const pokemonApiHandler = require('../services/pokemon-api.service')


//lista
router.get("/pokedex", (req, res, next) => {

    pokemonApiHandler
        .getAllPokemon()
        .then(pokemon => res.render('pokemon/pokemon-list', { pokemon: pokemon.slice(0, 493) }))
        .catch(err => next(err));

})

//details
router.get("/pokemon/:name", (req, res, next) => {
    const { name } = req.params

    pokemonApiHandler
        .getPokemonDetails(name)
        .then(pokemon =>
            res.render('pokemon/pokemon-details', pokemon.data))
        .catch(err => next(err));
})

//list de kanto
router.get("/pokedex/kanto", (req, res, next) => {
    pokemonApiHandler
        .getAllPokemonKanto()
        .then(pokemon => res.render('pokemon/kanto-list', { pokemon: pokemon }))
        .catch(err => next(err));
})

//list de johto
router.get("/pokedex/johto", (req, res, next) => {
    pokemonApiHandler
        .getAllPokemonJohto()
        .then(pokemon => res.render('pokemon/johto-list', { pokemon: pokemon }))
        .catch(err => next(err));
})

//list de hoenn
router.get("/pokedex/hoenn", (req, res, next) => {
    pokemonApiHandler
        .getAllPokemonHoenn()
        .then(pokemon => res.render('pokemon/hoenn-list', { pokemon: pokemon }))
        .catch(err => next(err));
})

//list de sinnoh
// router.get("/pokedex/sinnoh", (req, res, next) => {
//     pokemonApiHandler
//         .getAllPokemonSinnoh()
//         .then(pokemon => res.render('pokemon/sinnoh-list', { pokemon: pokemon }))
//         .catch(err => next(err));
// })





module.exports = router