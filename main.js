console.log("script loaded");
const form = document.querySelector("form");
console.log("form => ", form.elements);
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexTel = /^(\+33\s?|0)\s?[1-9]\s?(\d{2}\s?){3}\d{2}$/;
const info = document.createElement(`p`);

email.addEventListener("keyup", () => validationUI(email, regexEmail));
contact.addEventListener("keyup", () => validationUI(contact, regexTel));

// compte le nb de caract
function countChar(input) {
    if (input.value.length > 4 && input.value.length <= 20) {
        input.classList.remove("danger");
        input.classList.add("success");
        input.parentElement.classList.add("success-checked");
        return true;
    } else {
        input.classList.remove("success");
        input.parentElement.classList.remove("success-checked");
        input.classList.add("danger");
        return false;
    }
}

// Vérif prés d'1 mail val et d'1 num de tel val
function validationUI(input, regex) {
    if (regex.test(input.value)) {
        input.classList.remove("danger");
        input.classList.add("success");
        input.parentElement.classList.add("success-checked")
        console.info(`✅ ${input.id} is valid`);
        return true;
    } else {
        input.classList.remove("success");
        input.parentElement.classList.remove("success-checked")
        input.classList.add("danger");
        console.warn("input is invalid");
        return false;
    }
}

// Test mdps ===
function checkPass(pass1, pass2) {
    if (pass1.value === pass2.value && pass1.value.length > 4) {
        pass1.classList.remove("danger");
        pass1.classList.add("success");
        pass2.classList.remove("danger");
        pass2.classList.add("success");
        console.info("✅ passwords are same");
        return true;
    } else {
        pass1.classList.remove("success");
        pass1.classList.add("danger");
        pass2.classList.remove("success");
        pass2.classList.add("danger");
        console.warn("passwords aren't same");
        return false;
    }
}

// Test si user est 18+
function isMAjor(input) {
    if (input.checked === true) {
        input.parentElement.classList.remove("danger");
        input.parentElement.classList.add("success");
        console.info("✅ user is major");
        return true;
    } else {
        input.parentElement.classList.remove("success")
        input.parentElement.classList.add("danger")
        console.warn("User is minor");
        return false;
    }
}

// Empêche injection de code ou caract spé
function sanitizeInput(input) {
    // Enlever les balises HTML
    input = input.replace(/<[^>]*>/g, "");
    // Enlever les caractères spéciaux dangereux
    input = input.replace(/[^a-zA-Z0-9 ]/g, "");
    // Enlever les espaces multiples
    input = input.replace(/\s\s+/g, " ");
    console.log("input 4 => ", input);
    // Enlever les espaces en début et fin de chaîne
    input = input.trim();
    console.log("input 5 => ", input);
    return input;
}