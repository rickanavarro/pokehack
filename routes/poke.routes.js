const router = require("express").Router()
const exphbs = require("express-handlebars");
const bcrypt = require('bcryptjs')
const saltRounds = 10
const User = require('./../models/User.model')

const pokemonApiHandler = require('../services/pokemon-api.service')
const { isLoggedOut, isLoggedIn } = require('../middlewares/route-guards')

//lista
router.get("/pokedex", (req, res, next) => {

    pokemonApiHandler
        .getAllPokemon()
        .then(pokemon => res.render('pokemon/pokemon-list', { pokemon: pokemon.slice(0, 251) }))
        .catch(err => next(err));

})
//mark as favorite in pokedex

router.post("/pokedex/favorite/:name", isLoggedIn, (req, res, next) => {
    const { name } = req.params
    const id = req.session.currentUser;

    User
        .findByIdAndUpdate(id, { $push: { "myFavorites": name } })
        .then(res.redirect('/pokedex'))
        .catch(err => console.log(err))
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
//favorite in kanto
router.post("/kanto/favorite/:name", isLoggedIn, (req, res, next) => {
    const { name } = req.params
    const id = req.session.currentUser;

    User
        .findByIdAndUpdate(id, { $push: { "myFavorites": name } })
        .then(res.redirect('/pokedex/kanto'))
        .catch(err => console.log(err))
})

//list de johto

router.get("/pokedex/johto", (req, res, next) => {
    pokemonApiHandler.getAllPokemonJohto()
        .then(pokemon => res.render("pokemon/johto-list", { pokemon: pokemon }))
        .catch(err => next(err));
});
//favorite in johto
router.post("/johto/favorite/:name", isLoggedIn, (req, res, next) => {
    const { name } = req.params
    const id = req.session.currentUser;

    User
        .findByIdAndUpdate(id, { $push: { "myFavorites": name } })
        .then(res.redirect('/pokedex/johto'))
        .catch(err => console.log(err))
})
//list de hoenn
// router.get("/pokedex/hoenn", (req, res, next) => {

//     pokemonApiHandler
//         .getAllPokemonHoenn()
//         .then(pokemon => res.render('pokemon/hoenn-list', { pokemon: pokemon }))
//         .catch(err => next(err));
// })

//list de sinnoh
// router.get("/pokedex/sinnoh", (req, res, next) => {
//     pokemonApiHandler
//         .getAllPokemonSinnoh()
//         .then(pokemon => res.render('pokemon/sinnoh-list', { pokemon: pokemon }))
//         .catch(err => next(err));
// })





module.exports = router