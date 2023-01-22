import { recuperarCarreras, crearFila, crearData, modificarTabla, recuperarObjetoCarrera, eliminarFilasTablas, crearCheckbox } from './utils.js';
import { limiteMaterias, checkCantidad, creadorEtiquetas} from './materias-utils.js'
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

            let { id, tipo, cProfesores, hs, rCursada, tRegimen, checkboxNuevo } = creadorEtiquetas();

            crearData(idMateria, id, idMateria, fila);
            crearData(idMateria, tipo, nombreMateria, fila);
            crearData(idMateria, hs, cantidadHs, fila);
            crearData(idMateria, cProfesores, cantidadProfesores, fila);
            crearData(idMateria, rCursada, regimenCursada, fila);
            crearData(idMateria, tRegimen, cuatrimestre, fila);
            crearCheckbox(idMateria, checkboxNuevo, fila)

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

    

    let datosInput = pedirDatosInputs();
    const materia = crearMateria(datosInput.nombreMateria, datosInput.cantidadProfesores, datosInput.cantidadHs, datosInput.regimenCursada, datosInput.cuatrimestre);
    let { idMateria, nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre } = materia;
    let fila = crearFila(idMateria);

    let { id, tipo, cProfesores, hs, rCursada, tRegimen, checkboxNuevo } = creadorEtiquetas();

    crearData(idMateria, id, idMateria, fila);
    crearData(idMateria, tipo, nombreMateria, fila);
    crearData(idMateria, hs, cantidadHs, fila);
    crearData(idMateria, cProfesores, cantidadProfesores, fila);
    crearData(idMateria, rCursada, regimenCursada, fila);
    crearData(idMateria, tRegimen, cuatrimestre, fila);
    crearCheckbox(idMateria, checkboxNuevo, fila);

    modificarTabla(fila);

    actualizarMaterias(materia);


}

function pedirDatosInputs() {

    let nombreMateria = document.getElementById("nombreMateria").value;
    let cantidadProfesores = document.getElementById("cantidadProfesores").value;
    let cantidadHs = document.getElementById("cantidadHs").value;
    let regimenCursada = document.getElementById("regimenCursada").value;
    let cuatrimestre = document.getElementById("cuatrimestre").value;


    return {nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre};

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

    const inputs = document.getElementsByClassName('checkboxNuevo');

    let cuerpo = document.getElementById("cuerpotabla");

    for (let i = 0; i < inputs.length; i++) {
        let checkbox = inputs[i];

        if (checkbox.checked) {

            let fila = document.getElementById("fila-" + checkbox.id);
            let nombreMateria = document.getElementById(`materia-${checkbox.id}`);
            nombreMateria = nombreMateria.innerText;
            cuerpo.removeChild(fila);
            const carrera = recuperarObjetoCarrera(valorSeleccionado);
            carrera.materias = carrera.materias.filter(materia => materia.nombreMateria !== nombreMateria);
            localStorage.setItem(carrera.nCarrera, JSON.stringify(carrera))

        }
    }

}

let btnModificarMateria = document.getElementById("btnmodificar-materias");
btnModificarMateria.addEventListener("click", e => {
    e.preventDefault()
    modificarMateria()
});


function modificarMateria() {

    const inputs = document.getElementsByClassName('checkboxNuevo');

    for (let i = 0; i < inputs.length; i++) {
        let checkbox = inputs[i];

        if (checkbox.checked) {

            let elementoMateria = document.getElementById(`materia-${checkbox.id}`);
            let id = checkbox.id;
            elementoMateria = elementoMateria.innerText;
            const carrera = recuperarObjetoCarrera(valorSeleccionado);
            let materia = carrera.materias.find(materia => materia.nombreMateria == elementoMateria);
            let datosInputs = pedirDatosInputs();

            materia.nombreMateria = datosInputs.nombreMateria;
            materia.cantidadProfesores = datosInputs.cantidadProfesores;
            materia.cantidadHs = datosInputs.cantidadHs;
            materia.regimenCursada = datosInputs.regimenCursada;
            materia.cuatrimestre = datosInputs.cuatrimestre;

            localStorage.setItem(carrera.nCarrera, JSON.stringify(carrera));

            //pisar campos

            document.getElementById(`materia-${id}`).innerText = materia.nombreMateria;
            document.getElementById(`cantidad-profesores-${id}`).innerText = materia.cantidadProfesores;
            document.getElementById(`cantidad-hs-${id}`).innerText = materia.cantidadHs;
            document.getElementById(`regimen-cursada-${id}`).innerText = materia.regimenCursada;
            document.getElementById(`cuatrimestre-${id}`).innerText = materia.cuatrimestre;


        }
    }
}








