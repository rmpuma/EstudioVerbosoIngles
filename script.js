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
    currentVerbIndex = Math.floor(Math.random() * verbs.length);
    const verb = verbs[currentVerbIndex];
    document.getElementById('question').innerText = `¿Cómo se conjuga el verbo "${verb.base}"? (${verb.meaning}) - Tipo: ${verb.type}`;

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = ''; // Limpiar respuestas anteriores

    selectedTenses.forEach(tense => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.innerHTML = `<label>${tense.replace(/_/g, ' ').toUpperCase()}: <input type="text" id="${tense}"></label>`;
        answersContainer.appendChild(answerDiv);
    });
    
    document.getElementById('result').innerText = '';
}

function checkAnswer() {
    let resultText = 'Respuestas incorrectas para: ';
    let hasError = false;

    selectedTenses.forEach(tense => {
        const answer = document.getElementById(tense).value;
        const correctAnswer = verbs[currentVerbIndex][tense];

        if (answer.toLowerCase() !== correctAnswer.toLowerCase()) {
            resultText += `${tense.replace(/_/g, ' ')} (correcto: ${correctAnswer}), `;
            hasError = true;
        }
    });

    const result = document.getElementById('result');
    result.innerText = hasError ? resultText.slice(0, -2) : '¡Todas las respuestas son correctas!';
}
