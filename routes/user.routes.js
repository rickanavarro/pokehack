const express = require('express')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guards')
const router = express.Router()
const pokemonApiHandler = require('../services/pokemon-api.service')

const User = require('./../models/User.model')

// profile page
router.get("/profile", isLoggedIn, async (req, res, next) => {

    const user = await User.findById(req.session.currentUser._id)

    const pokemonFavorites = user.myFavorites;

    const promises = pokemonFavorites.map(pokemon => pokemonApiHandler.getPokemonDetails(pokemon))

    const responses = await Promise.all(promises)

    const pokemons = responses.map(elem => elem.data)
    console.log({ pokemons })

    console.log({ pokemons, user })
    res.render("user/profile", { pokemons, user })

})


// admin page (PROTECTED & ROLE BASED ACCESS -render-)
router.get("/admin", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

    User
        .find()
        .then(users => { res.render("user/admin-page", { users }) })
        .catch(error => { next(error) })
})

// admin page (PROTECTED & ROLE BASED ACCESS -BORRAR-)

router.post("/admin/delete-user", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    const userId = req.body.userId;

    User
        .findByIdAndRemove(userId)
        .then(() => { res.redirect("/admin") })
        .catch(error => { next(error) })
})




module.exports = router