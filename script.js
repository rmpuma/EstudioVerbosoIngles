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
    
    // Actualizar la pregunta para incluir si el verbo es regular o irregular
    document.getElementById('question').innerText = `¿Cómo se conjuga el verbo "${verb.base}"? (${verb.type.toUpperCase()})`;

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = ''; // Limpiar respuestas anteriores

    // Agregar un campo para el significado del verbo
    const meaningDiv = document.createElement('div');
    meaningDiv.className = 'answer';
    meaningDiv.innerHTML = `
        <label>MEANING (en español): 
            <input type="text" id="meaning">
        </label>
        <p id="correct-meaning" class="feedback"></p>`;
    answersContainer.appendChild(meaningDiv);

    // Agregar campos para los tiempos seleccionados
    selectedTenses.forEach(tense => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.innerHTML = `
            <label>${tense.replace(/_/g, ' ').toUpperCase()}: 
                <input type="text" id="${tense}">
            </label>
            <p id="correct-${tense}" class="feedback"></p>`;
        answersContainer.appendChild(answerDiv);
    });

    document.getElementById('result').innerText = '';
    document.getElementById('result').classList.remove('error-message', 'success-message');
}

function checkAnswer() {
    let hasError = false;

    // Verificar el significado
    const meaningAnswer = document.getElementById('meaning').value;
    const correctMeaning = verbs[currentVerbIndex].meaning;
    const meaningFeedback = document.getElementById('correct-meaning');

    if (meaningAnswer.toLowerCase() !== correctMeaning.toLowerCase()) {
        meaningFeedback.innerText = `Correcto: ${correctMeaning}`;
        meaningFeedback.style.display = 'block';
        hasError = true;
    } else {
        meaningFeedback.style.display = 'none';
    }

    // Verificar los tiempos verbales
    selectedTenses.forEach(tense => {
        const answer = document.getElementById(tense).value;
        const correctAnswer = verbs[currentVerbIndex][tense];
        const tenseFeedback = document.getElementById(`correct-${tense}`);

        if (answer.toLowerCase() !== correctAnswer.toLowerCase()) {
            tenseFeedback.innerText = `Correcto: ${correctAnswer}`;
            tenseFeedback.style.display = 'block';
            hasError = true;
        } else {
            tenseFeedback.style.display = 'none';
        }
    });

    const result = document.getElementById('result');
    
    // Mostrar mensaje de error o éxito según sea el caso
    if (hasError) {
        result.innerText = 'Algunas respuestas son incorrectas.';
        result.classList.remove('success-message');
        result.classList.add('error-message');
    } else {
        result.innerText = '¡Todas las respuestas son correctas!';
        result.classList.remove('error-message');
        result.classList.add('success-message');
    }

    // Mostrar botón "Siguiente Verbo" si ya se verificaron las respuestas
    document.getElementById('next-verb-button').style.display = 'inline';
}

function nextVerb() {
    // Ocultar el botón "Siguiente Verbo" cuando se cargue un nuevo verbo
    document.getElementById('next-verb-button').style.display = 'none';
    
    currentVerbIndex = Math.floor(Math.random() * verbs.length);
    const verb = verbs[currentVerbIndex];
    document.getElementById('question').innerText = `¿Cómo se conjuga el verbo "${verb.base}"? (${verb.type.toUpperCase()})`;

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = ''; // Limpiar respuestas anteriores

    // Agregar un campo para el significado del verbo
    const meaningDiv = document.createElement('div');
    meaningDiv.className = 'answer';
    meaningDiv.innerHTML = `
        <label>MEANING (en español): 
            <input type="text" id="meaning">
        </label>
        <p id="correct-meaning" class="feedback"></p>`;
    answersContainer.appendChild(meaningDiv);

    // Agregar campos para los tiempos seleccionados
    selectedTenses.forEach(tense => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.innerHTML = `
            <label>${tense.replace(/_/g, ' ').toUpperCase()}: 
                <input type="text" id="${tense}">
            </label>
            <p id="correct-${tense}" class="feedback"></p>`;
        answersContainer.appendChild(answerDiv);
    });

    document.getElementById('result').innerText = '';
    document.getElementById('result').classList.remove('error-message', 'success-message');
}
