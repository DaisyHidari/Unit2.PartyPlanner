const COHORT_ID = "2401-FTB-ET-WEB-AM";
const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-FTB-ET-WEB-AM/events";

const state = {
    events: [],
};

const eventsList = document.querySelector("#events");
const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        console.log(json.data);
        state.events = json.data;
    } catch (error) {
        console.error(error);
    }
}

async function render() {
    await getEvents();
    renderEvents();
}

render();

async function createEvent(name, description, location, date) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, location, date })
        });

        const json = await response.json();
        console.log("new event", json);

        if (json.error) {
            throw new Error(json.message);
        }
        render();
    } catch (error) {
        console.error(error);
    }
}

async function addEvent(event) {
    event.preventDefault();
    await createEvent(
        addEventForm.name.value,
        addEventForm.description.value,
        addEventForm.location.value,
        new Date(addEventForm.date.value)
    );
}

function renderEvents() {
    if (!state.events.length) {
        eventsList.innerHTML = `<li>No events found.</li>`;
        return;
    }
    // Iterate over state.events and generate HTML to display each event
    const eventsHTML = state.events.map(event => `
        <li>
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <p>Location: ${event.location}</p>
            <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
        </li>
    `).join("");
    eventsList.innerHTML = eventsHTML;
}

// Add content for DELETE function
async function deleteEvent(eventId) {
    try {
        const response = await fetch(`${API_URL}/${eventId}`, {
            method: "DELETE"
        });

        const json = await response.json();
        console.log("Deleted event:", json);

        if (json.error) {
            throw new Error(json.message);
        }

        // Remove the deleted event from state
        state.events = state.events.filter(event => event.id !== eventId);

        // Render the updated events list
        renderEvents();
    } catch (error) {
        console.error(error);
    }
}