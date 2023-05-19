const express = require('express')
const { isLoggedIn } = require('../middlewares/route-guards')
const router = express.Router()
const Event = require('../models/Event.model')



//new event (render)

router.get("/events/create", isLoggedIn, (req, res, next) => {
    res.render("events/create-event")
})


//new event (handler)

router.post("/events/create", isLoggedIn, (req, res, next) => {

    const { name, eventType, longitude, latitude, date, assistants } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Event
        .create({ name, eventType, location, date, assistants })
        .then(() => res.redirect(`/events`))
        .then(newEvent => {
            const { longitude, latitude } = newEvent.location;
            res.json({ longitude, latitude });
        })
        .catch(err => console.log(err))
})

//añadir a lo anterior mensaje de error en el que si no marcamos una opcion nos da error para continuar


//listado de eventos

router.get("/events", (req, res, next) => {

    Event
        .find()
        .then(events => res.render("events/events", { events: events }))
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

//ruta para el mapa en detalles

router.get("/events/details/:event_id", (req, res, next) => {
    res.render('events/events-details');
});

router.get("/api/location", (req, res, next) => {
    Event
        .find()
        .then(events => res.json(events))
        .catch(err => next(err))
});

//ruta para unirse al evento

router.post('/events/:id/assistance', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const { _id } = req.session.currentUser

    Event
        .findByIdAndUpdate(id, { $addToSet: { assistance: _id } })
        .then(() => res.redirect(`/events/details/${id}`))
        .catch((err) => console.log(err)
        )
})






module.exports = router


