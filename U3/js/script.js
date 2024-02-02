/* Uppgift U3 */
// --------------------------------------------------
// Globala variabler
let subjectInfoElem, courseListElem;	// Div-element där inläst data ska skrivas
// Inga andra globala variabler får införas i programmet!
// --------------------------------------------------
// Initiering av globala variabler och händelsehanterare
function init() {
    subjectInfoElem = document.querySelector("#subjectInfo");
    courseListElem = document.querySelector("#courseList");
    document.querySelector("#subjectMenu").addEventListener("change", selectSubject);
} // Slut init
window.addEventListener("load", init); // init aktiveras då sidan är inladdad
// --------------------------------------------------
// Avläs menyn för val av ämne
function selectSubject() {
    let subject = this.value;
    requestData(subject);
    this.selectedIndex = 0;
} // Slut selectSubject

function requestData (subject){
    let request = new XMLHttpRequest();
    request.onload = function () {
        if (request.status == 200) getData(request.responseXML, subject);
        else subjectInfoElem.innerText = "Fel vid hämtning: " + request.status;
    }
    request.open("GET", "data/subjects.xml", true);
    request.send()
}
function getData(XMLcode, subject) {
    let subjectElem = XMLcode.querySelectorAll("subject");
    let falseMessage = XMLcode.querySelector("not_awailable");
    let HTMLcode = "";
    let subjectFound = false;

    for (let j = 0; j < subjectElem.length; j++) {
        if (subjectElem[j].querySelector("name").textContent === subject) {
            let s = subjectElem[j];
            let name = s.querySelector("name").textContent;
            let info = s.querySelector("info").textContent;
            subjectFound = true;

            HTMLcode += "<h3>" + name + "</h3>";
            HTMLcode += "<p>" + info + "</p>";
            break;
        }
    }

    if (!subjectFound) {
        HTMLcode = "<p>" + falseMessage.textContent + "</p>";
    }
    subjectInfoElem.innerHTML = HTMLcode;
}
// --------------------------------------------------
