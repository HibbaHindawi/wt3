/* Uppgift U3 */
// Globala variabler
let subjectInfoElem, courseListElem;	// Div-element där inläst data ska skrivas

// Initiering av globala variabler och händelsehanterare
function init() {
    subjectInfoElem = document.querySelector("#subjectInfo");
    courseListElem = document.querySelector("#courseList");
    document.querySelector("#subjectMenu").addEventListener("change", selectSubject);
} // Slut init
window.addEventListener("load", init); // init aktiveras då sidan är inladdad

// Avläs menyn för val av ämne
function selectSubject() {
    let subject = this.value; //sparar värdet av det som valdes
    requestData(subject);
    this.selectedIndex = 0;
} // Slut selectSubject

//Hämtar data från xml filen och anropar getData
function requestData(subject){
    let request = new XMLHttpRequest(); // Objekt för Ajax Anrop
    request.onload = function () {
        if (request.status == 200) getData(request.responseXML, subject);
        else subjectInfoElem.innerText = "Fel vid hämtning: " + request.status;
    }
    request.open("GET", "data/subjects.xml", true);
    request.send()
}

//Hämtar data från den specifika json filen och returnerar det till anropningen
async function requestCourse(courseList){
    let response = await fetch("data/" + courseList); //objekt för fetch
    if(response.ok) {
        let data = await response.json(); //sparar det som blir returnerad av feth
        return data;
    }
    else rEL.innerText = "Fel: " + response.status;
}

//Hanterar datan och ändrar inre html för subjekt och kurser
function getData(XMLcode, subject) {
    let subjectElem = XMLcode.querySelectorAll("subject"); //anropar alla element med namnet subject i xml filen
    let falseMessage = XMLcode.querySelector("not_awailable"); //anropar elementet med namnet not_awailable i xml filen
    let subjectHTMLcode = ""; // html koden för subjectInfoElem
    let courseHTMLcode = ""; // html koden för courseListElem
    let subjectFound = false; // Kollar om ämnet hittades i xml filen

    for (let j = 0; j < subjectElem.length; j++) {
        if (subjectElem[j].querySelector("name").textContent === subject) {
            let s = subjectElem[j]; //sparar nuvarande subject
            let courselist = s.querySelector("courselist"); //anropar elementet med namnet courselist
            let name = s.querySelector("name").textContent; //anropar elementet med namnet name
            let info = s.querySelector("info").textContent; //anropar elementet med namnet info
            let JSONcodePromise = requestCourse(courselist.textContent); // anropar requestCourse och skickar över namnet på json filen
            
            JSONcodePromise.then(data => {
                let JSONcode = data; //sparar den konverterade JSON filen, konverterades från en promise till en vanlig objekt
                for(let i = 0; i < JSONcode.course.length; i++){
                    let c = JSONcode.course[i]; //sparar nuvarande kurs
                    courseHTMLcode += "<h4>" + c.code + ", " + c.title.swedish + ", " + c.credits + "hp</h4>";
                    courseHTMLcode += "<ul> <li>" + c.description + "</li>";
                    if (c.teacher){
                        courseHTMLcode += "<li>Lärare: " + c.teacher + "</li>";
                    }
                    courseHTMLcode += "</ul>";
                }
                courseListElem.innerHTML = courseHTMLcode;
            })
            subjectFound = true;
            subjectHTMLcode += "<h3>" + name + "</h3>";
            subjectHTMLcode += "<p>" + info + "</p>";
            break;
        }
    }
    if (!subjectFound) {
        subjectHTMLcode = "<p>" + falseMessage.textContent + "</p>";
        courseListElem.innerHTML = "";
    }
    subjectInfoElem.innerHTML = subjectHTMLcode;
}