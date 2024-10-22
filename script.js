let verbs = [];
let currentVerbIndex = -1;

// Cargar los verbos desde el archivo JSON
fetch('verbs.json')
    .then(response => response.json())
    .then(data => {
        verbs = data;
        nextVerb();
    });

function nextVerb() {
    currentVerbIndex = Math.floor(Math.random() * verbs.length);
    const verb = verbs[currentVerbIndex];
    document.getElementById('question').innerText = `¿Cómo se conjuga el verbo "${verb.base}"?`;
    document.getElementById('answer').value = '';
    document.getElementById('result').innerText = '';
}

function checkAnswer() {
    const answer = document.getElementById('answer').value;
    const correctAnswers = [verbs[currentVerbIndex].simple_past, verbs[currentVerbIndex].past_participle, verbs[currentVerbIndex].gerund].join(', ');
    const result = document.getElementById('result');

    if (answer.toLowerCase() === verbs[currentVerbIndex].base.toLowerCase()) {
        result.innerText = '¡Correcto!';
    } else {
        result.innerText = `Incorrecto. Las respuestas correctas son: ${correctAnswers}.`;
    }
}
