/* Uppgift U2 */
// Globala variabler och konstanter
let cart = [];  // Varukorg

// Initiering av programmet. Visa produkter och hämta varukorg.
function init() {
    switch (document.querySelector("body").className) {
        case "chocolate": showProducts(chocolate); break;
        case "caramel": showProducts(caramel); break;
        case "softcandy": showProducts(softcandy); break;
    }
    getCart();
} // Slut init
window.addEventListener("load", init);

//Konstruktion
function Product(artnr, quantity){
    this.artnr = artnr;
    this.quantity = quantity;
}
// Skapa HTML-kod för visning av produkterna i parametern products.
// Lägg händelselyssnare på knapparna.

function showProducts(products) {
    let htmlCode = ""; // HTML som visar varje produkt
    for (let i = 0; i < products.length; i++) {
        htmlCode +=
            "<div>" +
            "<img src='" + products[i].img + "' alt='produkt'>" +
            "<h4>" + products[i].name + "</h4>" +
            "<p>Pris: " + products[i].price.toFixed(2) + " kr.</p>" +
            "<button type='button' class='order'>Lägg i korg</button>" +
            "</div>";
    }
    document.querySelector("#products").innerHTML = htmlCode;
    let btns = document.querySelectorAll("#products .order");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () { addToCart(products[i].artnr) });
    }
} // Slut showProducts

// Returnera objekt för produkten med artikelnumret artnr.
// Finns det ingen sådan produkt, returneras null.
function getProduct(artnr) {
    let products;
    switch (artnr[0]) { // Välj produktvariabel utifrån artikelnumrets första tecken
        case "c": products = chocolate; break;
        case "k": products = caramel; break;
        case "m": products = softcandy; break;
    }
    for (let i = 0; i < products.length; i++) {
        if (products[i].artnr == artnr) return products[i]; // Produktens objekt
    }
    return null; // Produkten finns inte
} // Slut getProduct

// Om produkten redan finns i varukorgen, uppdateras mängden.
// Annars läggs produkten in som en ny vara i varukorgen.
function addToCart(artnr) {
    let cartItem = getCartItem(artnr) // Kollar om produkten redan finns i korgen
    if (cartItem){
        cartItem.quantity++;
    }
    else{
        let obj = new Product(artnr, 1); // Skapar ett nytt objekt
        cart.push(obj);
    }
    showCart();
} // Slut addToCart

// Ta bort den vara som indexeras av index.
function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
} // Slut increaseInCart

// Returnera objekt för varan med artikelnumret artnr.
// Finns det ingen sådan vara i varukorgen, returneras null.
function getCartItem(artnr) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].artnr == artnr) return cart[i]; // Objektet i varukorgen
    }
    return null; // Produkten finns inte i varukorgen
} // Slut getCartItem


// ----- Extramerit
// Uppdatera varans mängd med amount, som ska vara antingen -1 eller +1.
function changeQuantityInCart(index, amount) {
    cart[index].quantity += amount;
    if(cart[index].quantity > 0){
        showCart();
    }
    else(
        removeFromCart(index)
    )
} // Slut changeQuantityInCart

// Skapar HTML-kod av varukorgen, beräknar pris och lägger till händelselyssnare på knappar.
function showCart() {
    let product; // Sparar information om produkten
    let totPrice = 0; // Räknar ut totala pricet
    let htmlCode = ""; // Skriver ut produktinformation
    for (let i = 0; i < cart.length; i++) {
        product = getProduct(cart[i].artnr);
        htmlCode +=
            "<div>" +
            "<h4>" + product.name + "</h4>" +
            "<button type='button' class='del'></button>" +
            "<p> Antal: <button type='button' class='decr'>-</button> "+ cart[i].quantity + " <button type='button' class='incr'>+</button></p>" +
            "<p> Pris: " + product.price  + " kr.</p>" +
            "</div>";
        totPrice += (product.price * cart[i].quantity);
    }

    totPrice = totPrice.toFixed(2);
    document.querySelector("#cart").innerHTML = htmlCode;
    document.querySelector("#totPrice").innerHTML = totPrice;
    
    let btns = document.querySelectorAll("#cart .del"); //refererar till varje knapp med klassen .del
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () { removeFromCart([i])});
    }

    let decrBtns = document.querySelectorAll("#cart .decr"); //Refererar till varje knapp som minskar antalet
    for (let i = 0; i < decrBtns.length; i++) {
        decrBtns[i].addEventListener("click", function () { changeQuantityInCart([i], -1)});
    }
    
    let incrBtns = document.querySelectorAll("#cart .incr"); //Refererar till varje knapp som ökar antalet
    for (let i = 0; i < incrBtns.length; i++) {
        incrBtns[i].addEventListener("click", function () { changeQuantityInCart([i], 1)});
    }
    
    saveCart();
} // Slut showCart

// Konvertera varukorgen till en sträng m.h.a. JSON och spara i localStorage
function saveCart() {
    let savedCart = JSON.stringify(cart); // Sparar den konverterade värdet av cart
    localStorage.setItem("savedCart", savedCart);
} // Slut saveCart

// Läs in från localStorage och konvertera till varukorgens datatyp m.h.a. JSON
function getCart() {
    if (localStorage.getItem("savedCart") != null){
        cart = JSON.parse(localStorage.getItem("savedCart"));
        showCart();
    }
} // Slut getCart

