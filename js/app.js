let totalScores = [];
let roundCount = 0; // Contador de partidas
let playerCount = 0;
let playerNames = [];

// Seleccionar pantallas
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const screen3 = document.getElementById('screen3');
const screen4 = document.getElementById('screen4');

// Función para generar inputs de nombres basados en la cantidad de jugadores seleccionados
document.getElementById('playerCountForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const playerCountSelect = document.getElementById('playerCount');
    playerCount = parseInt(playerCountSelect.value);
    const nameInputsDiv = document.getElementById('nameInputs');
    nameInputsDiv.innerHTML = ''; // Limpiar cualquier input anterior

    for (let i = 0; i < playerCount; i++) {
        const label = document.createElement('label');
        label.textContent = `Jugador ${i + 1}:`;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `name${i + 1}`;
        input.value = `Jugador ${i + 1}`;
        nameInputsDiv.appendChild(label);
        nameInputsDiv.appendChild(input);
        nameInputsDiv.appendChild(document.createElement('br'));
    }

    // Añadir botón para validar nombres y avanzar a la siguiente pantalla
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Validar noms';
    nextButton.addEventListener('click', validateNames);
    nameInputsDiv.appendChild(nextButton);
});

function validateNames() {
    playerNames = [];
    for (let i = 0; i < playerCount; i++) {
        const playerName = document.getElementById(`name${i + 1}`).value;
        playerNames.push(playerName);
    }

    totalScores = Array(playerCount).fill(0); // Iniciar puntuaciones en 0
    setupScoreForm();
    screen1.style.display = 'none';
    screen2.style.display = 'block';
}

// Configurar el formulario de puntuaciones basado en el número de jugadores
function setupScoreForm() {
    const playerScoresDiv = document.getElementById('playerScores');
    playerScoresDiv.innerHTML = '';
    
    for (let i = 0; i < playerCount; i++) {
        const label = document.createElement('label');
        label.textContent = playerNames[i];
        const input = document.createElement('input');
        input.type = 'number';
        input.id = `playerScore${i + 1}`;
        input.value = 0;
        playerScoresDiv.appendChild(label);
        playerScoresDiv.appendChild(input);
        playerScoresDiv.appendChild(document.createElement('br'));
    }
}

// Añadir puntuaciones por ronda
document.getElementById('scoreForm').addEventListener('submit', function (e) {
    e.preventDefault();

    for (let i = 0; i < playerCount; i++) {
        const score = parseInt(document.getElementById(`playerScore${i + 1}`).value) || 0;
        totalScores[i] += score;
    }

    roundCount++;

    // Limpiar los inputs para la siguiente ronda
    setupScoreForm();
});

// Ver la puntuación total
document.getElementById('viewTotalScores').addEventListener('click', function () {
    const scoreTableHeaders = document.getElementById('scoreTableHeaders');
    const scoreTableBody = document.getElementById('scoreTableBody');

    scoreTableHeaders.innerHTML = '';
    scoreTableBody.innerHTML = '';

    playerNames.forEach((name, index) => {
        const th = document.createElement('th');
        th.textContent = name;
        scoreTableHeaders.appendChild(th);

        const td = document.createElement('td');
        td.textContent = totalScores[index];
        scoreTableBody.appendChild(td);
    });

    screen2.style.display = 'none';
    screen3.style.display = 'block';
});

// Volver a la pantalla de puntuaciones
document.getElementById('backToScores').addEventListener('click', function () {
    screen3.style.display = 'none';
    screen2.style.display = 'block';
});

// Mostrar la pantalla de información sobre la partida actual
document.getElementById('viewRoundInfo').addEventListener('click', function () {
    document.getElementById('roundCount').textContent = roundCount;

    // Comienza con 1 carta en la primera ronda
    document.getElementById('cardsToDeal').textContent = roundCount + 1;

    // Jugador que reparte las cartas en la partida actual
    const dealerIndex = roundCount % playerCount; // Rotación entre jugadores
    document.getElementById('dealerName').textContent = playerNames[dealerIndex];

    screen2.style.display = 'none';
    screen4.style.display = 'block';
});

// Volver a la pantalla de puntuaciones desde la pantalla de información
document.getElementById('backToRounds').addEventListener('click', function () {
    screen4.style.display = 'none';
    screen2.style.display = 'block';
});

// Reiniciar la partida
document.getElementById('resetGame').addEventListener('click', function () {
    totalScores = Array(playerCount).fill(0);
    roundCount = 0;

    screen4.style.display = 'none';
    screen1.style.display = 'block';
});
