import { recuperarCarreras, crearFila, crearData, modificarTabla, recuperarObjetoCarrera, eliminarFilasTablas, crearCheckbox } from './utils.js';
import { limiteMaterias, checkCantidad, creadorEtiquetas, buscarCheckboxSeleccionado } from './materias-utils.js'
import { Materia } from './constructor-clases.js'

let materias = [];

let idMateria = 0;
export let cantidadMaterias = [];

let carreras = recuperarCarreras();
let caracteristicasCarrera = []

recuperarCaracteristicasCarreras();
guardarDropbox(carreras);

let btnAgregarMateria = document.getElementById("btnagregar-materia");
btnAgregarMateria.addEventListener("click", e => { e.preventDefault(); agregarMateria() });

function cargarMaterias(materiasCarga) {

    let valorRecuperado = JSON.parse(localStorage.getItem(materiasCarga));

    const { materias } = valorRecuperado;

    try {

        for (let x = 0; x < materias.length; x++) {

            let { idMateria, nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre } = materias[x];

            let fila = crearFila(idMateria);

            let { id, tipo, cMaterias, hs, rCursada, tRegimen, checkbox } = creadorEtiquetas();

            crearData(idMateria, id, idMateria, fila);
            crearData(idMateria, tipo, nombreMateria, fila);
            crearData(idMateria, cMaterias, cantidadProfesores, fila);
            crearData(idMateria, hs, cantidadHs, fila);
            crearData(idMateria, rCursada, regimenCursada, fila);
            crearData(idMateria, tRegimen, cuatrimestre, fila);
            crearCheckbox(idMateria, checkbox, fila)

            modificarTabla(fila);
        }

    } catch (error) {

        alert("No se han ingresado materias para la carrera " + valorRecuperado);

    }

}

function recuperarCaracteristicasCarreras() {
    let carrerasRecuperadas = recuperarCarreras();
    for (let carrera of carrerasRecuperadas) {
        let objetoCarrera = JSON.parse(localStorage.getItem(carrera))
        caracteristicasCarrera.push(objetoCarrera);

    }

}

//Crea en el select las options de las carreras

function guardarDropbox(carreras) {

    let option = document.createElement("option");
    let valorDropboxDefault = "Seleccione una Carrera";
    option.innerText = valorDropboxDefault;
    let dropbox = document.getElementById("dropbox-carreras");
    dropbox.appendChild(option);

    for (let i = 0; i < carreras.length; i++) {
        let carrera = carreras[i];
        let option = document.createElement("option");
        option.id = "option-" + carrera;
        option.innerText = carrera;
        let dropbox = document.getElementById("dropbox-carreras");
        dropbox.appendChild(option);
    }

}

//Evento: cambia el valor del select y carga las materias y el limite maximo de materias

const select = document.getElementById("dropbox-carreras");
let valorSeleccionado;

select.addEventListener("change", function () {

    valorSeleccionado = this.value;
    let carreraSeleccionada = cambiarOutputMaterias(valorSeleccionado);
    let tabla = document.getElementById('cuerpotabla');
    eliminarFilasTablas(tabla);
    if (carreraSeleccionada !== null) {
        cargarMaterias(valorSeleccionado);
        document.getElementById('cantidad-carreras').value = limiteMaterias(carreras, valorSeleccionado);
    }
});

function cambiarOutputMaterias(valorSeleccionado) {
    let nombreCarrera = JSON.parse(localStorage.getItem(valorSeleccionado));
    if (nombreCarrera !== null) {
        cantidadMaterias = nombreCarrera.nMaterias;
        document.getElementById('cantidad-carreras').value = parseInt(cantidadMaterias);
    }
    return nombreCarrera
}

//Le pasa una materia a la tabla y las guarda en el localstorage.

function agregarMateria() {



    let materiaCreada = pedirDatosInputs();
    let { idMateria, nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre } = materiaCreada;
    let fila = crearFila(idMateria);

    let { id, tipo, cMaterias, hs, rCursada, tRegimen, checkbox } = creadorEtiquetas();

    crearData(idMateria, id, idMateria, fila);
    crearData(idMateria, tipo, nombreMateria, fila);
    crearData(idMateria, cMaterias, cantidadProfesores, fila);
    crearData(idMateria, hs, cantidadHs, fila);
    crearData(idMateria, rCursada, regimenCursada, fila);
    crearData(idMateria, tRegimen, cuatrimestre, fila);
    crearCheckbox(idMateria, checkbox, fila);

    modificarTabla(fila);

    actualizarMaterias(materiaCreada);


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

function actualizarMaterias(MateriaNueva) {
    let carreraSeleccionada = document.getElementById('dropbox-carreras').value;
    let objetoCarrera = recuperarObjetoCarrera(carreraSeleccionada);
    if (!objetoCarrera.materias) {
        objetoCarrera.materias = [];
    }
    objetoCarrera.materias.push(MateriaNueva);
    localStorage.setItem(carreraSeleccionada, JSON.stringify(objetoCarrera));
}

let btnBorrarMateria = document.getElementById("btnborrar-materia");
btnBorrarMateria.addEventListener("click", e => {
    e.preventDefault()
    borrarMateria()
});

function borrarMateria() {

    const inputs = document.getElementsByClassName('checkbox');

    buscarCheckboxSeleccionado(inputs);

}

let btnModificarMateria = document.getElementById("btnmodificar-materias");
btnModificarMateria.addEventListener("click", e => {
    e.preventDefault()
    ModificarMateria()
});


function modificarMateria() {

    const inputs = document.getElementsByClassName('checkbox');

    sinNombre(inputs);

}

function sinNombre(inputs) {

    let cuerpo = document.getElementById("cuerpotabla");

    for (let i = 0; i < inputs.length; i++) {
        let checkbox = inputs[i];

        if (checkbox.checked) {
            
            //1- buscar en el localstorage la carrera,
            //2- buscar en el objeto la propiedad materia,
            //3- buscar en la propiedad materia, dentro del array el objeto 
            //   con el nombre de la materia del checkbox (con un .find)
            //4- pisar los valores del objeto con los de los inputs nuevos,
            //5- stringlifearlos y guardalos,
            //6- pisar la tabla con los valores nuevos,
            
        }
    }
}








