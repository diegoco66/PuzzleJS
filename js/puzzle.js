var todos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var posiciones = new Array(16).fill(0).map(() => {
    let max = todos.length -1;
    let randomNumber = Math.round(Math.random() * (max));
    let removed = todos.splice(randomNumber, 1);

    return removed[0];
});
var miTablero;
const CRONOMETRO = document.getElementById('cronometro');

class Puzzle {

    constructor(tablero) {
        this.mostrarTiempo = this.mostrarTiempo.bind(this);
        this.tablero = tablero;
        this.inicializar();
        this.time = '00:00:00';
    }

    inicializar() {
        this.construirTablero();
        setInterval(this.mostrarTiempo, 1000);
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

    /**
     * Aumentar y mostrar tiempo de cronometro
     */
    mostrarTiempo() {
        let tiempo = this.time.split(":");
        let horas = parseInt(tiempo[0]);
        let minutos = parseInt(tiempo[1]);
        let segundos = parseInt(tiempo[2]);

        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }
        if (minutos === 60) {
            minutos = 0;
            horas++;
        }

        let nuevoTiempo = `${(horas < 10) ? '0' + horas : horas}:${(minutos < 10) ? '0' + minutos : minutos}:${(segundos < 10) ? '0' + segundos : segundos }`;

        CRONOMETRO.innerHTML = nuevoTiempo;
        this.time = nuevoTiempo;
    }
}

/**
 * Comienza el tablero
 * 
 * @param {string} nombreTablero 
 */
function comenzarPuzzle(nombreTablero) {
    miTablero = new Puzzle(nombreTablero);
}

comenzarPuzzle(window.localStorage.getItem("escogido"));