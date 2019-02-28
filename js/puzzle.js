var todos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var posiciones = new Array(16).fill(0).map(() => {
    let max = todos.length -1;
    let randomNumber = Math.round(Math.random() * (max));
    let removed = todos.splice(randomNumber, 1);

    return removed[0];
});

class Puzzle {

    constructor(tablero) {
        this.tablero = tablero;
        this.inicializar();
    }

    inicializar() {
        this.construirTablero();
    }

    /**
     * Ordena las fichas con base a el arreglo posiciones
     * que tiene lo nùmeros de 0 a 15 aleatorios
     */
    construirTablero() {
        const fichas = document.getElementsByClassName('foto');

        for (let i=0; i<posiciones.length; i++) {
            fichas[i].setAttribute("src", "../img/" + this.tablero + "/pieza" + posiciones[i] + ".png");
        }
    }
}

/**
 * Comienza el tablero
 * 
 * @param {string} nombreTablero 
 */
function comenzarPuzzle(nombreTablero) {
    var miTablero = new Puzzle(nombreTablero);
}

comenzarPuzzle(window.localStorage.getItem("escogido"));