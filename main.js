console.log("script loaded");
const form = document.querySelector("form");
console.log("form => ", form.elements);

const info = document.createElement(`p`);

// import des regex et des fct de fct.js
import { regexEmail } from "./fct.js"
import { regexTel } from "./fct.js"
import { checker } from "./fct.js"
import { countChar } from "./fct.js"
import { validationUI } from "./fct.js"
import { checkPass } from "./fct.js"
import { isMAjor } from "./fct.js"
import { sanitizeInput } from "./fct.js"

// Ecout event
form.firstName.addEventListener(`keyup`, () => {
    countChar(form.firstName);
})

form.lastName.addEventListener(`keyup`, () => {
    countChar(form.lastName);
})

form.email.addEventListener(`keyup`, () => {
    validationUI(form.email, regexEmail);
})

form.pass1.addEventListener(`keyup`, () => {
    checkPass(form.pass1, form.pass2);
})

form.pass2.addEventListener(`keyup`, () => {
    checkPass(form.pass1, form.pass2);
})

form.majeur.addEventListener(`change`, () => {
    isMAjor(form.majeur);
})

form.contact.addEventListener(`keyup`, () => {
    validationUI(form.contact, regexTel);
})

// Soumission du form
form.addEventListener(`submit`, (e) => {
    // Test chaque champ
    // Enregistrer chaque rép dans un tab
    // Test si ts ls champs du tab === true pour submit le form
    e.preventDefault();
    console.log(`==============> form submitted`);
    let isValid = false;
    let verif = [];
    let field = form.elements
    for (let i = 0; i < field.length; i++) {
        console.log(`field[${i}]:`, field[i]);
        switch (field[i].id) {
            case "firstName":
            case "lastName":
                field[i].value = sanitizeInput(field[i].value);
                isValid = countChar(field[i]);
                verif.push(isValid);
                console.log(`verif:`, verif);
                break;
            case "email":
                isValid = validationUI(form.email, regexEmail);
                verif.push(isValid);
                console.log(`verif:`, verif);
                break;
            case "pass1":
            case "pass2":
                isValid = checkPass(form.pass1, form.pass2);
                verif.push(isValid);
                console.log(`verif:`, verif);
                break;
            case "contact":
                isValid = validationUI(form.contact, regexTel);
                verif.push(isValid);
                console.log(`verif:`, verif);
                break;
            case "majeur":
                isValid = isMAjor(form.majeur);
                verif.push(isValid);
                console.log(`verif:`, verif);
                break;
            default:
                break;
        }
    }
    if (checker(verif)) {
        console.log(`✅ form is submit`);
        setTimeout(() => form.submit(), 2000);
    } else {
        console.warn(`form is invalide`);
        alert(`❌ Votre inscription est invalide, veuillez changer les champs en rouge.`);
    }
})