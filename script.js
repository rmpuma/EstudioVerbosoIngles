let verbs = [];
let currentVerbIndex = -1;
let selectedTenses = [];

// Cargar los verbos desde el archivo JSON
fetch('verbs.json')
    .then(response => response.json())
    .then(data => {
        verbs = data;
    });

function startStudy() {
    const selectedCheckboxes = document.querySelectorAll('#time-selection input[type="checkbox"]:checked');
    selectedTenses = Array.from(selectedCheckboxes).map(cb => cb.value);

    if (selectedTenses.length === 0) {
        alert('Por favor selecciona al menos un tiempo verbal.');
        return;
    }

    document.getElementById('time-selection').style.display = 'none';
    document.getElementById('verb-container').style.display = 'block';
    nextVerb();
}

function nextVerb() {
    currentVerbIndex = Math.floor(Ma

