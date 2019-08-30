const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            place : place
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData(data, place.formatted_address)
    })
})

const locatieElement = document.querySelector('[data-locatie]')
const statusElement = document.querySelector('[data-status]')
const temperatuurElement = document.querySelector('[data-temperatuur]')
const gemtempElement = document.querySelector('[data-gemtemp]')
const samenvattingElement = document.querySelector('[data-samenvatting]')
const verwachtingElement = document.querySelector('[data-verwachting]')

function setWeatherData(data, place){
    locatieElement.textContent = place
    statusElement.textContent = data.image
    temperatuurElement.textContent = data.temp
    gemtempElement.textContent = data.gtemp
    samenvattingElement = data.samenv
    verwachtingElement = data.verw
}   