const router = require("express").Router()
const exphbs = require("express-handlebars");

const pokemonApiHandler = require('../services/pokemon-api.service')


//lista
router.get("/pokedex", (req, res, next) => {

    pokemonApiHandler
        .getAllPokemon()
        // .then(pokemon => res.send(pokemon.data))
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
        // .then(name => res.send(name.sprites))
        .catch(err => next(err));
})

//list de kanto
router.get("/pokedex/kanto", (req, res, next) => {
    pokemonApiHandler
        .getAllPokemonKanto()
        .then(pokemon => res.render('pokemon/kanto-list', { pokemon: pokemon.data.pokemon_entries }))
        .catch(err => next(err));
})






module.exports = router