//Plantilla de Carrera (Creacion, Modificación, Eliminación)

let btnAgregarMateria = document.getElementById("btnagregar-carreras");
btnAgregarMateria.addEventListener("click", sumarCarrera);

let idCarrera = 0
let agregarCarrera = [];

class Carrera {
    constructor(idCarrera, nCarrera, nMaterias) {
        this.idCarrera = idCarrera
        this.nCarrera = nCarrera;
        this.nMaterias = nMaterias
    }
}

let tablaCarrera = document.getElementById("tableCareer");
let cuerpo = document.getElementById("cuerpotabla")

function sumarCarrera() {

    let nombreCarrera = document.getElementById("nombreCarrera").value;
    let cantidadMaterias = document.getElementById("cantidadMaterias").value;


    idCarrera += 1

    let nuevaCarrera = new Carrera(idCarrera, nombreCarrera, cantidadMaterias);
    agregarCarrera.push(nuevaCarrera);

    console.log(agregarCarrera);

    let fila = document.createElement("tr");

    fila.id = "fila-" + idCarrera;
    fila.className = "form-notes-table-tr";

    let td = document.createElement("td");
    td.innerText = nuevaCarrera.idCarrera;
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerText = nuevaCarrera.nCarrera;
    td.id = `carrera-${idCarrera}`
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerText = nuevaCarrera.nMaterias;
    td.id = `materias-${idCarrera}`
    fila.appendChild(td);

    td = document.createElement("td");
    let checkbox = document.createElement('input');
    checkbox.className = "checkbox"
    checkbox.type = "checkbox";
    checkbox.id = idCarrera;
    td.appendChild(checkbox);

    fila.appendChild(td);

    cuerpo.appendChild(fila);

}


let btnBorrarCarrera = document.getElementById("btnborrar-carrera");
btnBorrarCarrera.addEventListener("click", borrarCarrera);

const inputs = document.getElementsByClassName('checkbox');

function borrarCarrera() {


    const tamanoInputs = inputs.length;

    console.log("inputs", inputs);

    for (let i = 0; i < tamanoInputs; i++) {
        let checkbox = inputs[0];
        console.log("inputs", inputs[0]);
        if (checkbox.checked) {
            let fila = document.getElementById("fila-" + checkbox.id);
            cuerpo.removeChild(fila);

        }
    }

}

let btnModificarCarrera = document.getElementById("btnmodificar-carrera");
btnModificarCarrera.addEventListener("click", modificarCarrera);

function modificarCarrera() {
    let carrera;
    let materias;
    let contadorCheckbox = 0;
    for (let input of inputs) {
        if (input.checked) {
            contadorCheckbox++;
            carrera = document.getElementById(`carrera-${input.id}`);
            materias = document.getElementById(`materias-${input.id}`);
        }
    }

    if (contadorCheckbox != 1) {
        alert("Seleccione un solo elemento");
    } else {
        const nombreCarrera = document.getElementById("nombreCarrera").value;
        const cantidadMaterias = document.getElementById("cantidadMaterias").value;
        carrera.innerText = nombreCarrera;
        materias.innerText = cantidadMaterias;
    }

    console.log(contadorCheckbox);

}


//Creación de materias

function agregarMateria() {

}

function borrarMateria() {

}

function modificarMateria() {

}

//Agregar profesores a plantilla

let numeroProfesores = 0
let Profesoresingresados = 0



function agregarProfesor() {
    numeroProfesores = parseInt(prompt("Ingrese numero de profesores que tendrá la cátedra"));
    if (isNaN(numeroProfesores)) {
        alert("el valor indicado no es un número");
    } else {
        for (Profesoresingresados = 0; Profesoresingresados < numeroProfesores; Profesoresingresados++)
            nombreProfesor = prompt("Ingrese nombre del profesor");
        Profesoresingresados = Profesoresingresados++;
        alert("hay un total de " + Profesoresingresados) + "asignados a la cátedra";
    }
}

function borrarProfesor() {

}

function modificarProfesor() {

}

//Regularizar Alumnos - Carga de Notas por profesores al sistema

let promedio = 0;

function agregarAlumno() {
    nombreAlumno = prompt("Ingrese nombre del alumno.");
    dniAlumno = parseInt(prompt("Ingrese DNI del alumno sin puntos."));
}

function agregarNotas() {
    instanciasEvaluatorias = parseFloat(prompt("¿Cuantas examenes se han realizado en la cursada?"));
    if (instanciasEvaluatorias === 1) {
        notaPrimerParcial = parseFloat(prompt("Ingrese nota del primer parcial del alumno."));
        notaPrimerParcial = 0;
    } else if (instanciasEvaluatorias === 2) {
        notaPrimerParcial = parseFloat(prompt("Ingrese nota del primer parcial del alumno."));
        notaSegundoParcial = parseFloat(prompt("Ingrese nota del segundo parcial del alumno."));
    } else {
        alert("Cantidad de situaciones evaluatorias no correspoden.");
    }
}

function regularizarAlumno() {
    condicionAlumno = ""
    if (notaPrimerParcial === 0 || notaSegundoParcial === 0) {
        alert("Faltan datos para indicar el estado del alumno");
    } else {
        promedio = (notaPrimerParcial + notaSegundoParcial) / 2;
        console.log("el promedio es " + (promedio).toString());
        if (promedio >= 4) {
            condicionAlumno = "regularizado";
            alert("El alumno se encuentra " + condicionAlumno + " para rendir el parcial")
        } else {
            condicionAlumno = "libre";
            alert("El alumno se encuentra " + condicionAlumno + " y no puede rendir final ya que no alcanzó la nota mínima")
        }
    }

}

//Crear acta de cursada de una materia

//Crear eventos en el calendario

//Crear nuevas secciones en el subindice
