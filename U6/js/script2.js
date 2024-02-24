/* Uppgift U6-2 */
// --------------------------------------------------
// Globala variabler och konstanter
let mapLocationElem;	// Element för utskrift av koordinater
let myMap;				// Objekt för kartan
let addrMarkers = [];	// Array med objekt för knapparnas markörer
let userMarker;			// Objekt för markering där användaren klickar
const place = {         // Plats som kartan visar
    name: "Malmö",
    lat: 55.6023,
    lng: 12.9987,
    zoom: 15
}
const markerData = [	// Data för markörer som hör till knapparna
    { position: { lat: 55.6021, lng: 12.9971}, title: "Gamla Kyrkogården" },
    { position: { lat: 55.6048, lng: 12.9881}, title: "Malmöhus Slott" },
    { position: { lat: 55.6061, lng: 13.0005}, title: "Stortorget" },
    { position: { lat: 55.6026, lng: 13.0011}, title: "Gustav Adolfs torg" },
    { position: { lat: 55.5977, lng: 12.9876}, title: "Hösthagens Idrottsplats" }
];
// ----- Extrameriten med bilder från Flickr
const myApiKey = "DIN-API-KEY";	// Ersätt DIN-API-KEY med din egen Flickr API key
let flickrImgElem;		// Element där bilderna ska visas
// --------------------------------------------------
// Initiering av programmet
function init() {
    initMap("map");
    mapLocationElem = document.querySelector("#mapLocation");
    flickrImgElem = document.querySelector("#flickrImgs");
    addrBtns = document.querySelectorAll("#addrBtns button");
    for(let i = 0; i < addrBtns.length; i++){
        addrBtns[i].innerText = markerData[i].title;
        addrBtns[i].addEventListener("click", function() {showAddrMarker(i)});
    }
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------
// Skapa en karta och markeringar
function initMap(id) {
    document.querySelector("#place").innerText = place.name;
    myMap = L.map(id).setView([place.lat, place.lng], place.zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap);
    
    userMarker = L.marker();
    myMap.on('click', newUserMarker);

    for(let i = 0; i < markerData.length; i++){
        let marker = L.marker(markerData[i].position);
        addrMarkers.push(marker);
    }
} // Slut initMap

// Sätt markörens position där användaren klickade och lägg in den på kartan.
function newUserMarker(e) {
    hideMarkers();
    userMarker.setLatLng(e.latlng);
    userMarker.addTo(myMap);
    mapLocationElem.innerText =  "Latitud: " + e.latlng.lat + " Longitud: " + e.latlng.lng;
} // Slut newUserMarker

// Visa markör för den adressknapp som användaren klickat på
function showAddrMarker(index) { // Index för den markering som ska visas 
    hideMarkers();
    addrMarkers[index].addTo(myMap);
} // Slut showAddrMarker

// Dölj alla markörer
function hideMarkers() {
    for (let i = 0; i < addrMarkers.length; i++) {
        addrMarkers[i].remove();
    }
    userMarker.remove();
    mapLocationElem.innerText = "";
} // Slut hideMarkers

// ----- Foton från Flickr ----- Extramerit
// Ajax-begäran av nya bilder
async function fetchImgsByLocation(lat, lon) {
    
} // Slut fetchImgsByLocation

// Tolka svaret och visa upp bilderna.
function showMoreImgs(jsonData) {
    
} // Slut showMoreImgs