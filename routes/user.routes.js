const express = require('express')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guards')
const router = express.Router()
const pokemonApiHandler = require('../services/pokemon-api.service')

const User = require('./../models/User.model')
const Event = require('./../models/Event.model')



// profile page
router.get("/profile", isLoggedIn, (req, res, next) => {
    const userId = req.session.currentUser._id;
    const userPromise = User.findById(userId)
    const eventPromise = Event.find({ "assistance": { "$in": [userId] } })
    let events
    let user

    Promise.all([userPromise, eventPromise])
        .then(([userResult, eventsResult]) => {
            user = userResult;
            events = eventsResult;
            const pokePromises = user.myFavorites.map(pokemon => pokemonApiHandler.getPokemonDetails(pokemon));
            return Promise.all(pokePromises);
        })
        .then(pokemonDetails => {
            console.log(events)
            const pokemonData = pokemonDetails.map(elm => elm.data)
            res.render('user/profile', { pokemonData, events, user })
        })
        .catch(err => console.log("Error occurred: " + err))
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

//edit users
router.get("/admin/:id", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    const { _id } = req.params

    User
        .findByIdAndUpdate(_id)
        .then((response) => res.render("/user/details", response))
        .catch(error => { next(error) })
})






module.exports = router