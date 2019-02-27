if (!window.localStorage.getItem('session')) {
    window.localStorage.setItem('session', 1);
    window.localStorage.setItem('Juegos', 0);
}

function escogePuzzle(nombrePuzzle) {
    window.localStorage.setItem('escogido', nombrePuzzle);
}