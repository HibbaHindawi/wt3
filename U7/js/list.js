/* Hantering av varukorgen och önskelistan i uppgift U7.
   Detta är förenklade listor, eftersom uppgiften inte handlar om listornas struktur och innehåll. Istället är det interaktionen för att hantera listorna (flytta varor mellan listorna och slänga varor i papperskorgen), som uppgiften går ut på, vilket är kod som du skriver i filen script2.js. */
// --------------------------------------------------
// Definition av en class för att skapa listor,
// som används för varukorg och önskelista.
class ShoppingList {
    constructor (elem, storageName) {
        // elem: element där listan ska visas, alternativt null, om listan ej ska visas på sidan
        // storageName: namn som ska användas då listan sparas i localStorage
        this.storageName = storageName;
        this.list = []; // Ny tom array för listan
        this.getList(); // Läs in listan från localStorage, ifall den finns sparad där
        this.listElem = elem;
        this.showList();
    } // Slut constructor
    // ----------------------
    // Om produkten inte redan finns i listan, läggs den in som en ny vara.
    addItem(anr) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].artnr == anr) return; // Produkten finns redan i listan
        }
        let newItem = {
            artnr: anr,
            quantity: 1
        };
        this.list.push(newItem);
        this.showList();
        this.saveList();
    } // Slut addItem
    // ----------------------
    // Ta bort varan med artikelnummer anr
    removeItem(anr) {
        let ix = -1;
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].artnr == anr) {
                ix = i;
                break;
            }
        }
        if (ix > -1) {
            this.list.splice(ix, 1);
            this.showList();
            this.saveList();
        }
    } // Slut removeItem
    // ----------------------
    // Skapa HTML-kod för visning av listan.
    showList() {
        if (this.listElem == null) return; // Det finns inget element att visa listan i
        this.listElem.innerHTML = "";
        for (let i = 0; i < this.list.length; i++) {
            let prod = this.getProduct(this.list[i].artnr);
            let divElem = document.createElement("div");
            let h4Elem = document.createElement("h4");
            let pElem = document.createElement("p");
            let spanElem = document.createElement("span");
            h4Elem.innerText = prod.name;
            pElem.innerText = prod.price + " kr";
            spanElem.innerText = prod.artnr; /* Artikelnumret behövs då varan flyttas eller slängs */
            spanElem.className = "artnr";    /* Elementet döljs med CSS-koden */
            divElem.appendChild(h4Elem);
            divElem.appendChild(pElem);
            divElem.appendChild(spanElem);
            this.listElem.appendChild(divElem);
            divElem.addEventListener("pointerdown", dragStart);
        }
    } // Slut showList
    // ----------------------
    // Returnera objekt för produkten med artikelnumret artnr.
    // Finns det ingen sådan produkt, returneras null.
    getProduct(anr) {
        let products;
        switch (anr[0]) { // Välj produktvariabel utifrån artikelnumrets första tecken
            case "c": products = chocolate.products; break;
            case "k": products = caramel.products; break;
            case "m": products = softcandy.products; break;
        }
        for (let i = 0; i < products.length; i++) {
            if (products[i].artnr == anr) return products[i]; // Produktens objekt
        }
        return null; // Produkten finns inte
    } // Slut getProduct
    // ----------------------
    // Konvertera listan till en sträng m.h.a. JSON och spara i localStorage
    saveList() {
        let data = JSON.stringify(this.list);
        localStorage.setItem(this.storageName, data);
    } // Slut saveList
    // ----------------------
    // Läs in från localStorage och konvertera till listans datatyp m.h.a. JSON
    getList() {
        let data = localStorage.getItem(this.storageName);
        if (data) {
            this.list = JSON.parse(data);
        }
    } // Slut getList
    // ----------------------
} // Slut class ShoppingList
// --------------------------------------------------
