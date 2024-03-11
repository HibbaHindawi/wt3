/* Kod för att visa kategorier och produkter i uppgift U7.
   Delvis lik koden i uppgift U2, fast här skriven på ett annat sätt. */
// --------------------------------------------------
// Globala variabler och konstanter
let maxIx;      // Index för sista "slide"
let currentIx;  // Index för den "slide" som visas
// --------------------------------------------------
// Skapa HTML-kod för "slides" och lägg på händelselyssnare.
// Funktionen förutsätter att den globala variabeln viewerElem har initierats
function initCategories() {
    let wrapperElem = viewerElem.querySelector(".slideshow div");
    wrapperElem.innerHTML = ""; // Ta bort föregående "slides"
    for (let i = 0; i < categories.group.length; i++) { // Skapa nya "slides"
        let cat = categories.group[i]; // Aktuell kategori
        let divElem = document.createElement("div");
        let imgElem = document.createElement("img");
        let h4Elem = document.createElement("h4");
        imgElem.src = cat.img;
        imgElem.alt = "produktbild";
        h4Elem.innerText = cat.name;
        divElem.appendChild(imgElem);
        divElem.appendChild(h4Elem);
        wrapperElem.appendChild(divElem);
        divElem.addEventListener("pointerdown", dragStart);
        divElem.addEventListener("click", checkClick);

    }
    maxIx = categories.group.length - 1;
    currentIx = 0;
    showSlide(); // Visa första "slide"
} // Slut initCategories
// --------------------------------------------------
// Skapa HTML-kod för visning av produkterna i parametern jsonCode.
// Lägg händelselyssnare på knapparna.
function showProducts(jsonCode) {
    document.querySelector("#products h3").innerText = jsonCode.category;
    let wrapperElem = document.querySelector("#products div");
    wrapperElem.innerHTML = "";
    for (let i = 0; i < jsonCode.products.length; i++) {
        let prod = jsonCode.products[i]; // Aktuell produkt
        let divElem = document.createElement("div");
        let imgElem = document.createElement("img");
        let h4Elem = document.createElement("h4");
        let pElem = document.createElement("p");
        let buttonElem = document.createElement("button");
        imgElem.src = prod.img;
        imgElem.alt = "produkt";
        h4Elem.innerText = prod.name;
        pElem.innerText = "Pris: " + prod.price.toFixed(2) + " kr.";
        buttonElem.type = "button";
        buttonElem.className = "order";
        buttonElem.innerText = "Lägg i korg";
        divElem.appendChild(imgElem);
        divElem.appendChild(h4Elem);
        divElem.appendChild(pElem);
        divElem.appendChild(buttonElem);
        wrapperElem.appendChild(divElem);
        buttonElem.addEventListener("click", () => cart.addItem(prod.artnr) );
    }
} // Slut showProducts
// --------------------------------------------------
// Visa meddelande för produktkategori som ej finns.
function noProducts() {
    document.querySelector("#products h3").innerText = "";
    document.querySelector("#products div").innerText = "Tyvärr finns inte dessa varor i lager ännu.";
} // Slut noProducts
// --------------------------------------------------
