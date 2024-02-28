/* Uppgift U4 */
// --------------------------------------------------
// Globala variabler
// Inga globala variabler behövs
// --------------------------------------------------
// Initiering av globala variabler och händelsehanterare.
function init() {
    document.querySelector("#linkBtn").addEventListener("click", listLinks);
    const courseElems = document.querySelectorAll("#courses2 li");
    for (let i = 0; i < courseElems.length; i++) {
        courseElems[i].addEventListener("click", addCourse);
    }
    document.querySelector("#teacherBtn").addEventListener("click", addTeachers); // Används i extramerit
} // Slut init
window.addEventListener("load", init); // init aktiveras då sidan är inladdad

// Kopiera alla länkar ur huvudtexten och lägg upp dem i en lista.
function listLinks() {
    let links = document.querySelectorAll("#courses1 a");
    let ulElem = document.querySelector("#linkList");
    if(ulElem.innerHTML === ""){
        for (let i = 0; i < links.length; i++) {
            let liElem = document.createElement("li");
            let aElem = document.createElement("a");
            aElem.href = links[i].getAttribute("href");
            aElem.target = "_blank";
            let textNode = document.createTextNode(links[i].textContent);

            aElem.appendChild(textNode);
            liElem.appendChild(aElem);

            ulElem.appendChild(liElem);
        }
    }
} // Slut listLinks

// Den kurs användaren klickat på, läggs in överst i kurslistan.
function addCourse() {
    let currentCourse = this;
    let divElem = document.querySelector("#courseList");
    let existingCourses = [];
    for (let i = 0; i < divElem.children.length; i++) {
        existingCourses.push(divElem.children[i].textContent);
    }
    if (existingCourses.includes(currentCourse.textContent)) {
        return;
    }
    let listItem = document.createElement("p");
    let textNode = document.createTextNode(currentCourse.textContent);
    listItem.appendChild(textNode);
    listItem.addEventListener("click", removeCourse);
    divElem.insertBefore(listItem, divElem.firstChild);
} // Slut addCourse

// Den kurs användaren klickat på i kurslistan, tas bort.
function removeCourse() {
    let currentCourse = this;
    currentCourse.remove();
} // Slut removeCourse

// ----- Extramerit -----
// Funktion som lägger till lärare i kurslistan
async function addTeachers() {
    let response = await fetch("data/teachers.xml");
    let data = await response.text();
    const parser = new DOMParser();
    const XMLcode = parser.parseFromString(data, "application/xml");

    let courseListElem = document.querySelectorAll("#courses3 li");
    let courses = XMLcode.querySelectorAll("teachers course");

    for (let i = 0; i < courseListElem.length; i++) {
        let courseListCode = courseListElem[i].textContent.substring(0, 5);
        for (let j = 0; j < courses.length; j++) {
            let coursesCode = courses[j].getAttribute("code");
            if (coursesCode === courseListCode) {
                let teacher = courses[j].querySelector("teacher").textContent;
                let url = courses[j].querySelector("link").getAttribute("url");
                let linkElem = document.createElement("a");
                linkElem.href = url;
                linkElem.target = "_blank";
                linkElem.textContent = teacher;
                courseListElem[i].appendChild(document.createElement("br"));
                courseListElem[i].appendChild(linkElem);
            }
        }
    }
} // Slut addTeachers
// --------------------------------------------------
