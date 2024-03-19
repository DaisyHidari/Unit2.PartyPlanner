// Name the necessary elements
const COHORT = 2401-FTB-ET-WEB-AM;
const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-FTB-ET-WEB-AM/recipes:"
const state = {
    events: [],
};

const eventsList = document.querySelector("#events");
const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

//Fetch

async function getEvents() {
    try {
        const response = await fetch(API_URL)
        const json = await response.json();
        console.log(json.data); x3 Array(8) [ { id: , }]
        state.events = json.data;
    } catch (error) {
        console.error(error);
    }

}

getEvents()

