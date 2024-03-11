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

function dragStart(e) {
    if (!e.isPrimary) return; // Endast en pekare i detta program
    e.preventDefault();
    let dragElem = this;
    let dragElemRect = dragElem.getBoundingClientRect(); // Storlek och position inom "client"
    let dx = e.clientX - dragElemRect.x; // Avstånd mellan pekaren och ...
    let dy = e.clientY - dragElemRect.y; // ... elementets övre vänstra hörn
    // Skapa en klon, som ska dras
    let dragClone = dragElem.cloneNode(true);
    dragClone.classList.add("dragItemClone");
    dragClone.style.left = (e.pageX - dx) + "px";
    dragClone.style.top = (e.pageY - dy) + "px";
    document.body.appendChild(dragClone);
    dragElem.style.opacity = 0.5;
    document.addEventListener("pointerup", dragEnd);
    document.addEventListener("pointermove", dragMove);
    let dropElems = Array.from(document.querySelectorAll(".dropZone")); // Alla drop zones
    let dropElem = null; // Det element man släppt på, till att börja med inget
// Avsluta en drag-operation
    function dragEnd(e) {
        if (!e.isPrimary) return;
        e.preventDefault();
        dragClone.remove(); // Ta bort klonen
        document.removeEventListener("pointerup", dragEnd);
        document.removeEventListener("pointermove", dragMove);
        if (dropElem) { // Släppt på en drop zone
            dropElem.classList.remove("hiliteDropZone");

            let h4Element = dragElem.querySelector("h4"); //Sparar h4 elementet
            let pElement = dragElem.querySelector("p"); //Sparar p elementet, används för att exkludera span elementet
            let newElement = document.createElement("div"); //skapar ett nytt div
            newElement.appendChild(h4Element);
            newElement.append(pElement);
            let listDiv = dropElem.querySelector(".list"); //anropar div med klassen .list
            if(dropElem.id == "shoppingcart"){
                dragElem.remove();
                listDiv.appendChild(newElement);
                newElement.addEventListener("pointerdown", dragStart);
                dropElem.classList.remove("hiliteDropZone");
            }
            else if(dropElem.id == "favorites"){
                dragElem.remove();
                listDiv.appendChild(newElement);
                newElement.addEventListener("pointerdown", dragStart);
                dropElem.classList.remove("hiliteDropZone");
            }
            else if(dropElem.id == "trashcan"){
                dragElem.remove();
            }
        }
    } // Slut dragEnd
    // ----------
    // Elementet dras
    function dragMove(e) {
        if (!e.isPrimary) return;
        e.preventDefault();
        dragClone.style.left = (e.pageX - dx) + "px";
        dragClone.style.top = (e.pageY - dy) + "px";
        let hoverElems = document.elementsFromPoint(e.clientX, e.clientY);
            // Array med de element som pekaren är över
            // clientX och clientY, eftersom funktionen kräver koordinater relativa till viewport
        let elem = overlapItem(dropElems, hoverElems);
            // Om något av elementen är en drop zone, returneras det, annars null
        if (elem != dropElem) { // Ej samma element som förra gången dragMove anropades
            // "enter" och "leave" ska endast utföras en gång, då man kommer in eller lämnar
            if (elem) { // Kommer in över en drop zone ("enter")
                dropElem = elem; // Används sedan i dragEnd
                dropElem.classList.add("hiliteDropZone");
            }
            else { // Lämnar en drop zone ("leave")
                dropElem.classList.remove("hiliteDropZone");
                dropElem = null;
            }
        }
    } // Slut dragMove
    // ----------
} // Slut dragStart
// --------------------------------------------------
// Returnera det första värdet i a1 som också finns i a2.
// Finns inga gemensamma värden, returneras null.
function overlapItem(a1, a2) { // a1 och a2 är två arrayer
    for (let i = 0; i < a1.length; i++) {
        if (a2.includes(a1[i])) return a1[i];
    }
    return null;
} // overlapItem
// --------------------------------------------------