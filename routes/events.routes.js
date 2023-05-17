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
        .then(() => res.redirect(`/`))// esta sera la ruta real `/events/events-details/${newEvent._id}`
        .then(newEvent => {
            const { longitude, latitude } = newEvent.location;
            res.json({ longitude, latitude });
        })
        .catch(err => console.log(err))
})

//añadir a lo anterior mensaje de error en el que si no marcamos una opcion nos da error para continuar


//listado de eventos

router.get("/events", isLoggedIn, (req, res, next) => {

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

router.post('/events/join/:event_id', (req, res, next) => {
    const { event_id } = req.params;
    const { userId } = req.body;

    Event.findById(event_id)
        .then((event) => {
            if (event.assistants.includes(userId)) {
                return res.send('El usuario ya está registrado en este evento');
            }

            event.assistants.push(userId);
            event.save();
            res.status(200).send('El usuario se unió al evento exitosamente');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error al unirse al evento');
        });
});







module.exports = router


