import { recuperarCarreras, crearFila, crearData, modificarTabla, recuperarObjetoCarrera } from './utils.js';
import { limiteMaterias, checkCantidad, creadorEtiquetas } from './materias-utils.js'
import { Materia } from './constructor-clases.js'

let materias = [];

//cargar carreras

function cargarMaterias(materiasCarga) {

    let valorRecuperado = JSON.parse(localStorage.getItem(materiasCarga));

    const { materias } = valorRecuperado;

    try {

        for (let x = 0; x < materias.length; x++) {

                let { idMateria, nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre } = materias[x];

                let fila = crearFila(idMateria);

                let { id, tipo, cMaterias, hs, rCursada, tRegimen } = creadorEtiquetas();

                crearData(idMateria, id, idMateria, fila);
                crearData(idMateria, tipo, nombreMateria, fila);
                crearData(idMateria, cMaterias, cantidadProfesores, fila);
                crearData(idMateria, hs, cantidadHs, fila);
                crearData(idMateria, rCursada, regimenCursada, fila);
                crearData(idMateria, tRegimen, cuatrimestre, fila);

                modificarTabla(fila);
            }

    } catch (error) {

        alert("No se han ingresado materias para la carrera " + valorRecuperado);

    }

}

//clase

let idMateria = 0;
export let cantidadMaterias = [];

let carreras = recuperarCarreras();
let caracteristicasCarrera = []

//1 recuperar array de carreras,

recuperarCaracteristicasCarreras();
guardarDropbox(carreras);

//2 recuperar objetos carreras y desempaquetarlo

function recuperarCaracteristicasCarreras() {
    let carrerasRecuperadas = recuperarCarreras();
    for (let carrera of carrerasRecuperadas) {
        let objetoCarrera = JSON.parse(localStorage.getItem(carrera))
        caracteristicasCarrera.push(objetoCarrera);

    }

}

//3 sumarselos al select

function guardarDropbox(carreras) {

    for (let i = 0; i < carreras.length; i++) {
        let carrera = carreras[i];
        let option = document.createElement("option");
        option.id = "option-" + carrera;
        option.innerText = carrera;
        let dropbox = document.getElementById("dropbox-carreras");
        dropbox.appendChild(option);
    }

    document.getElementById('cantidad-carreras').value = limiteMaterias();
}


//cambiar valor del output 

const select = document.getElementById("dropbox-carreras");
let valorSeleccionado;

select.addEventListener("change", function () {
    valorSeleccionado = this.value;
    cambiarOutputMaterias(valorSeleccionado);
    //Borrar y crear el tbody para que no me duplique la tabla
    cargarMaterias(valorSeleccionado);
    
});

function cambiarOutputMaterias(valorSeleccionado) {
    let nombreCarrera = JSON.parse(localStorage.getItem(valorSeleccionado));
    cantidadMaterias = nombreCarrera.nMaterias;
    document.getElementById('cantidad-carreras').value = parseInt(cantidadMaterias);
}


//cargar materias

let btnAgregarMateria = document.getElementById("btnagregar-materia");
btnAgregarMateria.addEventListener("click", e => { e.preventDefault(); agregarMateria() });

function agregarMateria() {

    let materiaCreada = pedirDatosInputs();
    let { idMateria, nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre } = materiaCreada;
    let fila = crearFila(idMateria);

    let { id, tipo, cMaterias, hs, rCursada, tRegimen } = creadorEtiquetas();

    crearData(idMateria, id, idMateria, fila);
    crearData(idMateria, tipo, nombreMateria, fila);
    crearData(idMateria, cMaterias, cantidadProfesores, fila);
    crearData(idMateria, hs, cantidadHs, fila);
    crearData(idMateria, rCursada, regimenCursada, fila);
    crearData(idMateria, tRegimen, cuatrimestre, fila);

    modificarTabla(fila);

    materias.push(materiaCreada);

    actualizarMaterias(materias);


}

function pedirDatosInputs() {

    let nombreMateria = document.getElementById("nombreMateria").value;
    let cantidadProfesores = document.getElementById("cantidadProfesores").value;
    let cantidadHs = document.getElementById("cantidadHs").value;
    let regimenCursada = document.getElementById("regimenCursada").value;
    let cuatrimestre = document.getElementById("cuatrimestre").value;

    const nuevaMateria = crearMateria(nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre);

    return nuevaMateria;

}


function crearMateria(nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre) {

    idMateria += 1;
    let nuevaMateria = new Materia(idMateria, nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre);
    return nuevaMateria;

}

function actualizarMaterias(materiasArray) {

    let carreraSeleccionada = document.getElementById('dropbox-carreras').value;
    let objetoCarrera = recuperarObjetoCarrera(carreraSeleccionada);
    objetoCarrera.materias = materiasArray;

    localStorage.setItem(carreraSeleccionada, JSON.stringify(objetoCarrera));

}

