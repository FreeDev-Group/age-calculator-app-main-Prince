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
    let isValid = true;
    const currentYear = (new Date()).setFullYear(2026);

    // Day validation
    if (dayInput.value === "") {
        errorDay.textContent = "This field is required";
        daySection.classList.add("error");
        isValid = false;
    } else if (dayInput.value < 1 || dayInput.value > 31) {
        errorDay.textContent = "Must be a valid day";
        daySection.classList.add("error");
        isValid = false;
    } else {
        errorDay.textContent = "";
        daySection.classList.remove("error");
    }

    // Month validation
    if (monthInput.value === "") {
        errorMonth.textContent = "This field is required";
        monthSection.classList.add("error");
        isValid = false;
    } else if (monthInput.value < 1 || monthInput.value > 12) {
        errorMonth.textContent = "Must be a valid month";
        monthSection.classList.add("error");
        isValid = false;
    } else {
        errorMonth.textContent = "";
        monthSection.classList.remove("error");
    }

    // Year validation
    if (yearInput.value === "") {
        errorYear.textContent = "This field is required";
        yearSection.classList.add("error");
        isValid = false;
    } else if (yearInput.value > currentYear) {
        errorYear.textContent = "Must be in the past";
        yearSection.classList.add("error");
        isValid = false;
    } else {
        errorYear.textContent = "";
        yearSection.classList.remove("error");
    }

    if (isValid) {
        // Create a date object to check if the date exists
        // month is 0-indexed (Jan = 0, Feb = 1, etc.)
        const testDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);

        // 1. Check if the date "rolled over" (e.g., Feb 31 -> March 3)
        if (testDate.getFullYear() != yearInput.value || 
            testDate.getMonth() != monthInput.value - 1 || 
            testDate.getDate() != dayInput.value) {
            
            errorDay.textContent = "Must be a valid date";
            daySection.classList.add("error");
            monthSection.classList.add("error");
            yearSection.classList.add("error");
            isValid = false;
        } 
        // 2. Check if the date is in the future
        else if (testDate > new Date()) {
            errorYear.textContent = "Must be in the past";
            yearSection.classList.add("error");
            isValid = false;
        }

        if (isValid) {
            // calculateAge();
        }
    }
}

function animateNumber(element, target) {
    let current = 0;
    // Set a speed so the animation doesn't take too long (e.g., 20ms)
    const interval = setInterval(() => {
        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            current++;
            element.textContent = current;
        }
    }, 20);
}

function calculateAge() {
    const day = Number(dayInput.value);
    const month = Number(monthInput.value);
    const year = Number(yearInput.value);

    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Call the animation for each result element
    animateNumber(document.getElementById("years"), years);
    animateNumber(document.getElementById("months"), months);
    animateNumber(document.getElementById("days"), days);
}
