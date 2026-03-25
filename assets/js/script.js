const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const errorDay = document.getElementById("error-day");
const errorMonth = document.getElementById("error-month");
const errorYear = document.getElementById("error-year");

const daySection = document.getElementById("day-section");
const monthSection = document.getElementById("month-section");
const yearSection = document.getElementById("year-section");

// events listeners
// input event
dayInput.addEventListener("input", errorHandler);
monthInput.addEventListener("input", errorHandler);
yearInput.addEventListener("input", errorHandler);

function errorHandler() {
    /*  Les erreur a afficher:
    - Un champ est vide.
    - Le jour n'est pas entre 1 et 31.
    - Le mois n'est pas entre 1 et 12.
    - La date est dans le futur.
    - La date est invalide (par exemple, le 31 avril, car avril n'a que 30 jours).
    */
   const currentYear = (new Date()).getFullYear();

    if (dayInput.value === "") {
        errorDay.textContent = "This field is required";
        daySection.classList.add("error");
    }
    else {
        errorDay.textContent = "";
        daySection.classList.remove("error");
    }

    if (monthInput.value === "") {
        errorMonth.textContent = "This field is required";
        monthSection.classList.add("error");
    }
    else {
        errorMonth.textContent = "";
        monthSection.classList.remove("error");
    }

    if (yearInput.value === "") {
        errorYear.textContent = "This field is required";
        yearSection.classList.add("error");
    }
    else {
        errorYear.textContent = "";
        yearSection.classList.remove("error");
    }

    // day validation
    if (dayInput.value < 1 || dayInput.value > 31) {
        errorDay.textContent = "Must be a valid day";
        daySection.classList.add("error");
    }
    else {
        errorDay.textContent = "";
        daySection.classList.remove("error");
    }

    if (monthInput.value < 1 || monthInput.value > 12) {
        errorMonth.textContent = "Must be a valid month";
        monthSection.classList.add("error");
    }
    else {
        errorMonth.textContent = "";
        monthSection.classList.remove("error");
    }

    if (yearInput.value < 1 || yearInput.value > currentYear) {
        errorYear.textContent = "Must be a valid year";
        yearSection.classList.add("error");
    }
    else {
        errorYear.textContent = "";
        yearSection.classList.remove("error");
    }
}

function calculateAge() {
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;

    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    const age = today - birthDate;
    const ageDate = new Date(age);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;

    console.log(years, months, days);
}
