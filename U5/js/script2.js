/* Uppgift U5 */

// Initiering då webbsidan laddats in
function init(){
    let largeViewer = new ImageViewer(document.querySelector("#largeViewer"));
    for(let i = 1; i < 5; i++){
        let svElem = document.querySelector("#viewer" + i);
        let sv = new ImageViewer(svElem);
        sv.openViewer("data/images" + i + ".json", false);
        svElem.addEventListener("mouseenter", () => sv.autoStart(300));
        svElem.addEventListener("mouseleave", () => sv.autoStop());
        svElem.addEventListener("click", (e) => {
            largeViewer.openViewer("data/images" + i + ".json", true);
        });
    }
    document.querySelector("#categoryMenu").addEventListener("change", (e) => {
        largeViewer.openViewer("data/images" + e.currentTarget.selectedIndex + ".json", true);
        e.currentTarget.selectedIndex = 0;
    });
}// Slut init
window.addEventListener("load", init);

class ImageViewer{
    constructor(elem){
        //Tilldelning av globala variabler
        this.elem = elem;
        this.titleElem = elem.querySelector("h4");
        this.captionElem = elem.querySelector("p");
        this.imgElem = elem.querySelector("img");
        this.imgList = [];
        this.imgIx = 0;
        this.timer = null;
        this.autoBtn = elem.querySelector(".autoBtn");

        // Händelselyssnare
        if (this.elem.querySelector(".leftBtn")) {
            this.elem.querySelector(".leftBtn").addEventListener("click", () => this.prevImg());
        }
        if (this.elem.querySelector(".rightBtn")) {
            this.elem.querySelector(".rightBtn").addEventListener("click", () => this.nextImg());
        }
        if (this.elem.querySelector(".autoBtn")) {
            this.elem.querySelector(".autoBtn").addEventListener("click", () => this.autoImg(3000));
        }
        if (this.elem.querySelector(".closeBtn")) {
            this.elem.querySelector(".closeBtn").addEventListener("click", () => this.closeViewer());
        }
    }

    // Om modal är true, öppnas dialogen för modal visning.
    async openViewer(url, modal) {
        this.autoStop();
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json()
            this.getImages(data);
        }
        else this.titleElem.innerText = "Fel vid hämtning: " + response.status;
        if (modal) this.elem.showModal();
    }// Slut openViewer

    // Avsluta automatisk visning och stäng sedan dialogen med bildspelet.
    closeViewer() {
        this.autoStop();
        this.elem.close();
    } // Slut close

    // Tolka JSON-koden och lägga in innehållet i variablerna för bilderna i bildspelet
    getImages(json) { // Parametern XMLcode är hela den inlästa XML-koden
        this.titleElem.innerText = json.category;
        this.imgList = json.image;
        this.imgIx = 0;
        this.showImg(); // Visa första bilden
    } // Slut getImages

    // Ta fram föregående bild
    prevImg() {
        if (this.imgIx > 0) this.imgIx--;
        else this.imgIx = this.imgList.length - 1; // Gå runt till sista bilden
        this.showImg();
    } // Slut prevImg

    // Ta fram nästa bild
    nextImg() {
        if (this.imgIx < this.imgList.length - 1) this.imgIx++;
        else this.imgIx = 0; // Gå runt till första bilden
        this.showImg();
    } // Slut nextImg

    // Visa bilden som bestäms av imgList indexerat av imgIx
    showImg() {
        this.imgElem.src = this.imgList[this.imgIx].url;
        if (this.captionElem) {
            this.captionElem.innerText = (this.imgIx + 1) + ". " + this.imgList[this.imgIx].caption;
        }
    } // Slut showImg

    // Starta/stoppa automatisk bildvisning
    autoImg(interval) {
        if (this.timer == null) this.autoStart(interval);
        else this.autoStop();
    } // Slut autoImg

    // Starta automatisk bildvisning
    autoStart(interval) {
        this.timer = setInterval(() => this.nextImg(), interval);
        if (this.autoBtn) this.autoBtn.style.backgroundColor = "green";
    } // Slut autoStart
    
    // Stoppa automatisk bildvisning
    autoStop() {
        if (this.timer != null) clearInterval(this.timer);
        this.timer = null;
        if (this.autoBtn) this.autoBtn.style.backgroundColor = "";
    } // Slut autoStop   
}