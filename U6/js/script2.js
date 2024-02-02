/* Uppgift U6-2 */
// --------------------------------------------------
// Globala variabler och konstanter
let mapLocationElem;	// Element för utskrift av koordinater
let myMap;				// Objekt för kartan
let addrMarkers = [];	// Array med objekt för knapparnas markörer
let userMarker;			// Objekt för markering där användaren klickar
const place = {         // Plats som kartan visar
    name: "Växjö",      // Ersätt detta med den plats du själv väljer
    lat: 56.877170,
    lng: 14.806807,
    zoom: 15
}
const markerData = [	// Data för markörer som hör till knapparna
        // Ersätt dessa koordinater och titlar med platser som du själv väljer
    { position: { lat: 56.877450, lng: 14.811846 }, title: "Domkyrkan" },
    { position: { lat: 56.877113, lng: 14.804652 }, title: "Kommunhuset" },
    { position: { lat: 56.880457, lng: 14.802994 }, title: "Konserthuset" },
    { position: { lat: 56.876922, lng: 14.806900 }, title: "Resecentrum" },
    { position: { lat: 56.880463, lng: 14.800870 }, title: "Stadsbiblioteket" }
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
} // Slut initMap
// --------------------------------------------------
// Sätt markörens position där användaren klickade och lägg in den på kartan.
function newUserMarker(e) {
    hideMarkers();
    userMarker.setLatLng(e.latlng);
    userMarker.addTo(myMap);
    
} // Slut newUserMarker
// --------------------------------------------------
// Visa markör för den adressknapp som användaren klickat på
function showAddrMarker(index) { // Index för den markering som ska visas
    
} // Slut showAddrMarker
// --------------------------------------------------
// Dölj alla markörer
function hideMarkers() {
    for (let i = 0; i < addrMarkers.length; i++) {
        addrMarkers[i].remove();
    }
    userMarker.remove();
    mapLocationElem.innerText = "";
} // Slut hideMarkers
// --------------------------------------------------
// ----- Foton från Flickr ----- Extramerit
// Ajax-begäran av nya bilder
async function fetchImgsByLocation(lat, lon) {
    
} // Slut fetchImgsByLocation
// --------------------------------------------------
// Tolka svaret och visa upp bilderna.
function showMoreImgs(jsonData) {
    
} // Slut showMoreImgs
// --------------------------------------------------
