
let myMap
const eventCoords = { lat: 40.387574534772334, lng: -3.7056949208125385 }

const idEvent = document.querySelector('#id').value


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
    console.log(eventsJSON, idEvent)

    eventsJSON.forEach(elm => {
        if (elm._id === idEvent) {
            const eventCoords = { lat: elm?.location?.coordinates[0], lng: elm?.location?.coordinates[1] };
            new google.maps.Marker({
                map: myMap,
                position: eventCoords,
                title: elm.name
            });
        }

    });
}











