const express = require('express')
// const { isLoggedIn } = require('../middlewares/route-guards')
const router = express.Router()
const Event = require('../models/Event.model')



//new event (render)

router.get("/events/create", (req, res, next) => {
    res.render("events/create-event")
})


//new event (handler)

router.post("/events/create", (req, res, next) => {

    const { name, eventType, location, } = req.body

    Event
        .create({ name, eventType, location })
        .then(() => res.redirect(`/`))// esta sera la ruta real `/events/events-details/${newEvent._ud}`
        .catch(err => console.log(err))
})

//añadir a lo anterior mensaje de error en el que si no marcamos una opcion nos da error para continuar



//listado de eventos

router.get("/events", (req, res, next) => {

    Event
        .find()
        .then(events => res.render("events/events", { events: events })) //aquí puede acceder cualquier usuario o tiene que estar logeado??
        .catch(err => console.log(err))

})

//events-details

router.get("/events/details/:event_id", (req, res, next) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => res.render('events/events-details', event))
        .catch(err => console.log(err))
})



module.exports = router


