/* Uppgift U5 */
/* Den funktionsbaserade koden som du ska utgå från. */
// --------------------------------------------------
// Globala variabler
let viewerElem;     // Element för bildspelet
let titleElem;      // Element för bildspelets titel
let captionElem;    // Element för bildtext
let imgElem;        // Elementet för bilden
let imgList;		// Array med bildobjekt (url och caption)
let imgIx;          // Index för aktuell bild, börja på 0
let timer;	        // Timer för autovisning i bildspelet
let autoBtn;        // Element för auto-knappen
// --------------------------------------------------
// Initiering då webbsidan laddats in
function init() {
    // Initiering av globala variablker
    viewerElem = document.querySelector("#largeViewer");
    titleElem = viewerElem.querySelector("h4");
    captionElem = viewerElem.querySelector("p");
    imgElem = viewerElem.querySelector("img");
    imgList = [];
    imgIx = 0;
    timer = null;
    autoBtn = viewerElem.querySelector(".autoBtn");
    // Händelselyssnare på knappar, om knapparna finns
    if (viewerElem.querySelector(".leftBtn"))
        viewerElem.querySelector(".leftBtn").addEventListener("click", prevImg);
    if (viewerElem.querySelector(".rightBtn"))
        viewerElem.querySelector(".rightBtn").addEventListener("click", nextImg);
    if (viewerElem.querySelector(".autoBtn"))
        viewerElem.querySelector(".autoBtn").addEventListener("click", () => autoImg(3000));
    if (viewerElem.querySelector(".closeBtn"))
        viewerElem.querySelector(".closeBtn").addEventListener("click", closeViewer);
    // Händelselyssnare på menyn, för att välja kategori av bilder
    document.querySelector("#categoryMenu").addEventListener("change", (e) => {
        openViewer("data/images" + e.currentTarget.selectedIndex + ".json", true);
        e.currentTarget.selectedIndex = 0;
    });
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------
// Stoppa autovisning, ifall den är igång. Läs sedan in en ny kategori av bilder.
// Om modal är true, öppnas dialogen för modal visning.
async function openViewer(url, modal) {
    autoStop();
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json()
        getImages(data);
    }
    else titleElem.innerText = "Fel vid hämtning: " + response.status;
    if (modal) viewerElem.showModal();
} // Slut openViewer
// --------------------------------------------------
// Avsluta automatisk visning och stäng sedan dialogen med bildspelet.
function closeViewer() {
    autoStop();
    viewerElem.close();
} // Slut close
// --------------------------------------------------
// Tolka JSON-koden och lägga in innehållet i variablerna för bilderna i bildspelet
function getImages(json) { // Parametern XMLcode är hela den inlästa XML-koden
    titleElem.innerText = json.category;
    imgList = json.image;
    imgIx = 0;
    showImg(); // Visa första bilden
} // Slut getImages
// --------------------------------------------------
// Ta fram föregående bild
function prevImg() {
    if (imgIx > 0) imgIx--;
    else imgIx = imgList.length - 1; // Gå runt till sista bilden
    showImg();
} // Slut prevImg
// --------------------------------------------------
// Ta fram nästa bild
function nextImg() {
    if (imgIx < imgList.length - 1) imgIx++;
    else imgIx = 0; // Gå runt till första bilden
    showImg();
} // Slut nextImg
// --------------------------------------------------
// Visa bilden som bestäms av imgList indexerat av imgIx
function showImg() {
    imgElem.src = imgList[imgIx].url;
    captionElem.innerText = (imgIx + 1) + ". " + imgList[imgIx].caption;
} // Slut showImg
// --------------------------------------------------
// Starta/stoppa automatisk bildvisning
function autoImg(interval) {
    if (timer == null) autoStart(interval);
    else autoStop();
} // Slut autoImg
// --------------------------------------------------
// Starta automatisk bildvisning
function autoStart(interval) {
    timer = setInterval(() => nextImg(), interval);
    if (autoBtn) autoBtn.style.backgroundColor = "green";
} // Slut autoStart
// --------------------------------------------------
// Stoppa automatisk bildvisning
function autoStop() {
    if (timer != null) clearInterval(timer);
    timer = null;
    if (autoBtn) autoBtn.style.backgroundColor = "";
} // Slut autoStop
// --------------------------------------------------
