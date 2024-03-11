/* Uppgift U7 */
/* Kod för att hantera interaktionen med listorna. Man ska med drag and drop kunna flytta varor mellan listorna samt slänga dem i papperskorgen. Utgå från koden i exempel F7-ex4, del b. */
// --------------------------------------------------
// Globala variabler och konstanter
let cart;       // Varukorg
let wishlist;   // Önskelista
// --------------------------------------------------
// Initiering av programmet. Skapa objekt för varukorg och önskelista.
function init() {
    cart = new ShoppingList(document.querySelector("#shoppingcart > div.list"), "cart4738");
    wishlist = new ShoppingList(document.querySelector("#favorites > div.list"), "wish4738");
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------

// Kopiera koden från script-b.js i exempel F7-ex4 och modifera den till uppgiften

