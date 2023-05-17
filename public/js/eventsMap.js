let myMap
//const eventCoords = { lat: 40.387574534772334, lng: -3.7056949208125385 }


function initViewMarkers() {
    initMap()
    getEventsJSON()
}


function initMap() {
    myMap = new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 12, center: { lat: 40.392521370648154, lng: - 3.6989879718518366 }, }
    )
}


function getEventsJSON() {
    fetch('/api/location')
        .then(res => res.json())
        .then(eventsJSON => renderEventsMarkers(eventsJSON))
        .catch(err => console.log(err));
}

function renderEventsMarkers(eventsJSON) {
    console.log({ eventsJSON })
    eventsJSON.forEach(elm => {
        const eventCoords = { lat: elm?.location?.coordinates[0], lng: elm?.location?.coordinates[1] };
        new google.maps.Marker({
            map: myMap,
            position: eventCoords,
            title: elm.name
        });
    });
}

// function renderEventsMarkers(eventId) {
//     fetch(`/api/location/${eventId}`)
//         .then(res => res.json())
//         .then(event => {
//             const eventCoords = {
//                 lat: event.location.coordinates[0],
//                 lng: event.location.coordinates[1]
//             };
//             new google.maps.Marker({
//                 map: myMap,
//                 position: eventCoords,
//                 title: event.name
//             });
//         })
//         .catch(err => console.log(err));
// }

// router.get("/api/location/:event_id", (req, res, next) => {
//     const { event_id } = req.params;

//     Event.findById(event_id)
//         .then(event => res.json(event))
//         .catch(err => next(err));
// });

function joinEvent(eventId, userId) {
    console.log(eventId);
    fetch(`/events/join/${eventId}`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.ok) {
                console.log('El usuario se unió al evento exitosamente');
            } else {
                console.log('Error al unirse al evento');
            }
        })
        .catch((error) => {
            console.log('Error de red:', error);
        });
}










