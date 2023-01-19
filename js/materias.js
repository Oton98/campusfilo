import {recuperarCarreras, crearFila, crearData, modificarTabla, recuperarObjetoCarrera} from './utils.js';
import {limiteMaterias, checkCantidad, creadorEtiquetas} from './materias-utils.js'
import {Materia} from './constructor-clases.js'

let materias = [];

//cargar carreras

//Recuperar del storage y hacer tabla
/*1-buscar el json y parsearlo
2-desempaquetar el objeto
3-pasarle los valores del objeto a las funciones para crear la tabla
4-hacer chequeos
*/


function cargarMaterias(materiasCarga) {
    /*tengo que cuando cambia el valor del select, guardar el valor del nombre
    del nuevo valor, con el nuevo valor, lo tengo que buscar en el storage
    , traigo del objeto.materias toda la información. */
    let carrerasRecuperadas = recuperarCarreras();
    for (let i = 0; i < carrerasRecuperadas.length; i++) {

        let valorRecuperado = JSON.parse(localStorage.getItem(carrerasRecuperadas[i]));
        const { materias } = valorRecuperado;

        for (let x = 0; x < materias.length; x++) {

            let { idMateria, nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre } = materias[x];
            
            let fila = crearFila(idMateria);

            let {id, tipo, cMaterias, hs, rCursada, tRegimen} = creadorEtiquetas();

            crearData(idMateria, id, idMateria, fila);
            crearData(idMateria, tipo, nombreMateria, fila);
            crearData(idMateria, cMaterias, cantidadProfesores, fila);
            crearData(idMateria, hs, cantidadHs, fila);
            crearData(idMateria, rCursada, regimenCursada, fila);
            crearData(idMateria, tRegimen, cuatrimestre, fila);

            modificarTabla(fila);
        }

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
    cargarMaterias(valorSeleccionado);
});

function cambiarOutputMaterias(valorSeleccionado) {
    let nombreCarrera = JSON.parse(localStorage.getItem(valorSeleccionado));
    cantidadMaterias = nombreCarrera.nMaterias;
    document.getElementById('cantidad-carreras').value = parseInt(cantidadMaterias);
}


//cargar materias

let btnAgregarMateria = document.getElementById("btnagregar-materia");
btnAgregarMateria.addEventListener("click", e => { e.preventDefault(); agergarMateria() });

function agergarMateria() {

    let materiaCreada = pedirDatosInputs();
    let { idMateria, nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre } = materiaCreada;
    let fila = crearFila(idMateria);

    let {id, tipo, cMaterias, hs, rCursada, tRegimen} = creadorEtiquetas();

    crearData(idMateria, id, idMateria, fila);
    crearData(idMateria, tipo, nombreMateria, fila);
    crearData(idMateria, cMaterias, cantidadProfesores, fila);
    crearData(idMateria, hs, cantidadHs, fila);
    crearData(idMateria, rCursada, regimenCursada, fila);
    crearData(idMateria, tRegimen, cuatrimestre, fila);

    modificarTabla(fila);

    materias.push(materiaCreada);

    let objetoActualizado = actualizarMaterias(materias);

    let valorSelect = document.getElementById('dropbox-carreras').value
    actualizarStorage(valorSelect, objetoActualizado);

}

//1 tomar datos de los inputs
function pedirDatosInputs() {

    let nombreMateria = document.getElementById("nombreMateria").value;
    let cantidadProfesores = document.getElementById("cantidadProfesores").value;
    let cantidadHs = document.getElementById("cantidadHs").value;
    let regimenCursada = document.getElementById("regimenCursada").value;
    let cuatrimestre = document.getElementById("cuatrimestre").value;

    const nuevaMateria = crearMateria(nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre);

    return nuevaMateria;

}

// 1.5 crear nuevo objeto 

function crearMateria(nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre) {

    idMateria += 1;
    let nuevaMateria = new Materia(idMateria, nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre);
    return nuevaMateria;

}

//5 crear un objeto con los datos de la materia
// el valor del objeto creado lo empujo al array de materias
// tengo la propiedad objetocarrera.materias, le tengo que actualizar el array
// crear en el objeto carrera, un campo "materias", "profesores". "alumnos"

function actualizarMaterias(materiasArray) {

    let valorSelect = document.getElementById('dropbox-carreras').value;
    let objetoCarrera = recuperarObjetoCarrera(valorSelect);
    objetoCarrera.materias = materiasArray;
    return objetoCarrera;

}

//7 meter los datos el objeto de materia y guardarlo en el storage

//intento eliminar la referencia circular

function actualizarStorage(valorSelect, objetoActualizado) {
    let objetoSinReferencias = JSON.stringify(objetoActualizado, (key, value) => {
        if (key === "objetoCarrera") return;
        return value;
    });
    localStorage.setItem(valorSelect, objetoSinReferencias);
}


//funcion borrar materia
//funcion modificar materia