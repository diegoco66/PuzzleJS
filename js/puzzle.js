var todos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var posiciones = new Array(16).fill(0).map(() => {
    let max = todos.length - 1;
    let randomNumber = Math.round(Math.random() * (max));
    let removed = todos.splice(randomNumber, 1);

    return removed[0];
});
var miTablero;
var dragSrcEl = null;
var fichas;
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
        this.agregarMovible();
        this.agregarDrag();
    }

    /**
     * Ordena las fichas con base a el arreglo posiciones
     * que tiene lo nùmeros de 0 a 15 aleatorios
     */
    construirTablero() {
        const fichas = document.getElementsByClassName('foto');

        for (let i = 0; i < posiciones.length; i++) {
            fichas[i].setAttribute("src", "../img/" + this.tablero + "/pieza" + posiciones[i] + ".png");
            if (posiciones[i] === 15) {
                fichas[i].parentNode.classList.add("movible");
                fichas[i].classList.add("comodin");
            }
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

    /**
     * Eliminar los elementos con clase movible y llamar la función para
     * agregar el movible a los adyacentes.
     */
    async agregarMovible() {
        this.removeDrag();
        let comodin = document.querySelector('.comodin');
        let removerMovibles = await this.eliminarMovibles();
        this.agregarAdyacentes(parseInt(comodin.parentNode.parentNode.dataset.contenedor));
    }

    eliminarMovibles() {
        return new Promise((resolve, rej) => {
            let movibles = document.querySelectorAll('.movible');
            movibles.forEach.call(movibles, (movible) => {
                let comodines = movible.querySelectorAll('.comodin');
                if (comodines.length === 0) {
                    movible.classList.remove('movible');
                }
            });
            resolve(true);
        });
    }

    /**
     * Agrega los eventos listener a los objetos movibles
     */
    agregarDrag() {
        fichas = document.querySelectorAll('.movible');
        fichas.forEach.call(fichas, (ficha) => {
            ficha.addEventListener('dragstart', this.dragStart, false);
            ficha.addEventListener('dragenter', this.handleDragEnter, false);
            ficha.addEventListener('dragover', this.handleDragOver, false);
            ficha.addEventListener('dragleave', this.handleDragLeave, false);
            ficha.addEventListener('drop', this.handleDrop, false);
            ficha.addEventListener('dragend', this.handleDragEnd, false);
        });
    }

    /**
     * Remover los eventos listener a las fichas que lo tienen.
     */
    removeDrag() {
        fichas = document.querySelectorAll('.movible');
        fichas.forEach.call(fichas, (ficha) => {
            ficha.removeEventListener('dragstart', this.dragStart, false);
            ficha.removeEventListener('dragenter', this.handleDragEnter, false);
            ficha.removeEventListener('dragover', this.handleDragOver, false);
            ficha.removeEventListener('dragleave', this.handleDragLeave, false);
            ficha.removeEventListener('drop', this.handleDrop, false);
            ficha.removeEventListener('dragend', this.handleDragEnd, false);
        });
    }

    dragStart(e) {

        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
    }

    handleDragEnter(e) {
        this.classList.add('over');
    }

    handleDragLeave(e) {
        this.classList.remove('over');
    }

    handleDrop(e) {

        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl != this) {
            let com1 = dragSrcEl.querySelectorAll('.comodin');
            let com2 = this.querySelectorAll('.comodin');
            if (com1.length > 0 || com2.length > 0) {
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text/html');
                miTablero.agregarMovible();
            }
        }
        return false;
    }

    handleDragEnd(e) {
        fichas.forEach.call(fichas, function (ficha) {
            ficha.classList.remove('over');
        });
    }

    /**
     * Agregar la clase movible a los objetos adyacentes al comodin.
     * 
     * @param {number} numero 
     */
    agregarAdyacentes(numero) {
        if (numero !== 3 && numero !== 7 && numero !== 11 && numero !== 15) {
            let sig = numero + 1;
            let siguiente = document.querySelector('.ficha[data-numficha="' + sig + '"]');
            siguiente.classList.add('movible');
        }
        if (numero !== 0 && numero !== 4 && numero !== 8 && numero !== 12) {
            let ant = numero - 1;
            let anterior = document.querySelector('.ficha[data-numficha="' + ant + '"]');
            anterior.classList.add('movible');
        }
        if (numero > 3) {
            let up = numero - 4;
            let arriba = document.querySelector('.ficha[data-numficha="' + up + '"]');
            arriba.classList.add('movible');
        }
        if (numero < 12) {
            let down = numero + 4;
            let abajo = document.querySelector('.ficha[data-numficha="' + down + '"]');
            abajo.classList.add('movible');
        }
        this.agregarDrag();
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