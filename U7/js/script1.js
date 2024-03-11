/* Uppgift U7 */
/* I stort sett samma JavaScript-kod som i exempel F7-ex8, del a. Koden behöver modifieras och utökas enligt instruktioner i uppgiften. */
// --------------------------------------------------
// Globala variabler
let cart;               // Varukorg
const minDrag = 100;    // Antal pixlar som man minst måste svepa för att bläddra
let viewerElem;         // Element som omger koden för hela bildspelet
let wrapperElem;        // Element som omger alla "slides"
let slideWidth;         // Bredd på en "slide" (ändras då skärmstorleken ändras)
let nrOfSlides;         // Hur många slides som visas samtidigt
let clickCounter = 0; //räknare för antal klick, för att detektera
// --------------------------------------------------
// Initiering då webbsidan är inläst
function init() {
    viewerElem = document.querySelector("#imgViewer");
    wrapperElem = viewerElem.querySelector(".slideshow > div");
    initCategories();
    cart = new ShoppingList(null, "cart4738");
    window.addEventListener("orientationchange", showSlide);
    window.addEventListener("resize", showSlide);
    document.addEventListener("keydown", checkKey);
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------
// Förskjut wrapperElem (dvs alla slides) i x-led, för att visa aktuell slide
// Förskjutningen blir åt vänster (negativt värde) i förhållande till ursprungsläget
function showSlide() {
    slideWidth = wrapperElem.querySelector("div").offsetWidth; // Aktuell bredd på en slide
    wrapperElem.style.transitionDuration = "0.2s"; // Glidande övergång
    wrapperElem.style.transform = "translateX(" + -(currentIx * slideWidth) + "px)";
    nrOfSlides = Math.floor(wrapperElem.offsetWidth / slideWidth);
} // Slut showSlide
// --------------------------------------------------
// Påbörja en drag-operation
function dragStart(e) {
    if (!e.isPrimary) return; // Endast en pekare i detta program
    e.preventDefault();
    let dragElem = this;  // Den "slide" (div-element) som dras
    let startX = e.pageX; // Position där pekaren trycktes ner, för justering i dragMove
    wrapperElem.style.transitionDuration = "0s"; // Ingen transition medan man drar
    document.addEventListener("pointerup", dragEnd);
    document.addEventListener("pointercancel", dragEnd);
    dragElem.addEventListener("pointermove", dragMove);
    // ----------
    // Avsluta en drag-operation
    function dragEnd(e) {
        if (!e.isPrimary) return;
        e.preventDefault();
        document.removeEventListener("pointerup", dragEnd);
        document.removeEventListener("pointercancel", dragEnd);
        dragElem.removeEventListener("pointermove", dragMove);
        if (e.pageX - startX > minDrag) { // Svep åt höger - skifta till föregående
            shiftToPrevious();
        }
        else if (e.pageX - startX < -minDrag) { // Svep åt vänster - skifta till nästa
            shiftToNext();
        }
        showSlide();
    } // Slut dragEnd
    // ----------
    // Elementet dras och förskjuts i x-led
    function dragMove(e) {
        if (!e.isPrimary) return;
        e.preventDefault();
        let x = e.pageX - startX - currentIx * slideWidth;
        wrapperElem.style.transform = "translateX(" + x + "px)";
    } // Slut dragMove
    // ----------
} // Slut dragStart
// --------------------------------------------------
// Kontrollera tangenter och byt bild
function checkKey(e) {
    switch (e.key) {
        case "ArrowLeft": // Skifta till föregående
            e.preventDefault();
            shiftToPrevious();
            showSlide();
            break;
        case "ArrowRight": // Skifta till nästa
            e.preventDefault();
            shiftToNext();
            showSlide();
            break;
    } // Slut switch
} // Slut checkKey
// --------------------------------------------------

//Kontrollerar antal klick
function checkClick(){
    clickCounter++;
    setTimeout(() => clickCounter = 0, 400); //nollställ räknaren efter 400mx och nollställ clickCounter
    if(clickCounter == 2){
        this.style.backgroundColor = "#eeaa33";
        setTimeout(() => this.style.backgroundColor = "", 500);

        let product = this;
        let slideNumber = Array.from(product.parentNode.children).indexOf(product); //hämtar ut index från arrayen med produkter
        let parameter = [chocolate, caramel, softcandy]; //sparar namn på parametrarna i en array
        if(slideNumber < 3){
            showProducts(parameter[slideNumber]); //skickar med korrekt parameter med hjälp av indexet
        }
        else{
            noProducts();
        }
    }
}
// Skifta till föregående slide
function shiftToPrevious() {
    if (currentIx > nrOfSlides) {
        currentIx -= nrOfSlides;
    }
    else {
        currentIx = 0;
    }
} // Slut shiftToPrevious
// --------------------------------------------------
// Skifta till nästa slide
function shiftToNext() {
    if (currentIx + nrOfSlides < maxIx - nrOfSlides + 1) {
        currentIx += nrOfSlides;
    }
    else {
        currentIx = maxIx - nrOfSlides + 1;
    }
} // Slut shiftToNext
// --------------------------------------------------
