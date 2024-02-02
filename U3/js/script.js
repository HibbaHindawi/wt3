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
    
} // Slut selectSubject
// --------------------------------------------------
