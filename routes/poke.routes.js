const router = require("express").Router()
const exphbs = require("express-handlebars");

const pokemonApiHandler = require('../services/pokemon-api.service')


//lista
router.get("/pokedex", (req, res, next) => {

    // const { id: "https://pokeapi.co/api/v2/pokemon/{{id}}/"}
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
        .then(name =>
            res.render('pokemon/pokemon-details', { pokemon: name }))
        .catch(err => next(err));
})






module.exports = router