//Plantilla de Carrera (Creacion, Modificación, Eliminación)
class Carrera {
    constructor(idCarrera, nCarrera, nMaterias) {
        this.idCarrera = idCarrera
        this.nCarrera = nCarrera;
        this.nMaterias = nMaterias
    }
}

let idCarrera = 0
let agregarCarrera = [];

let tablaCarrera = document.getElementById("tableCareer");
let cuerpo = document.getElementById("cuerpotabla");

//Recuperacion del localStorage

for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    let valorRecuperado = localStorage.getItem(clave);
    let valorParseado = JSON.parse(valorRecuperado);
    //cambio de nombre de idParse para que no se rompa el programa
    let { idCarrera: idParsed, nCarrera, nMaterias } = valorParseado;

    let nuevaCarrera = new Carrera(idParsed, nCarrera, nMaterias);
    agregarCarrera.push(nuevaCarrera)

    let fila = document.createElement("tr");
    fila.id = "fila-" + idParsed;

    let th = document.createElement("th");
    th.innerText = nuevaCarrera.idCarrera;
    th.scope = "row";
    fila.appendChild(th);

    td = document.createElement("td");
    td.innerText = nuevaCarrera.nCarrera;
    td.id = `carrera-${idParsed}`
    fila.appendChild(td);

    td = document.createElement("td");
    td.innerText = nuevaCarrera.nMaterias;
    td.id = `materias-${idParsed}`
    fila.appendChild(td);

    td = document.createElement("td");
    let checkbox = document.createElement('input');
    checkbox.className = "checkbox"
    checkbox.type = "checkbox";
    checkbox.id = idParsed;
    td.appendChild(checkbox);

    fila.appendChild(td);
    cuerpo.appendChild(fila);
    idCarrera = Math.max(idCarrera, idParsed);

}

//Creacion de Carrera

let btnAgregarCarrera = document.getElementById("btnagregar-carreras");
btnAgregarCarrera.addEventListener("click", e => { e.preventDefault(); sumarCarrera() });

function sumarCarrera() {

    let nombreCarrera = document.getElementById("nombreCarrera").value;

    let cantidadMaterias = document.getElementById("cantidadMaterias").value;
    chequeoNumerosMaterias = parseInt(cantidadMaterias);
    chequeoNombreMaterias = parseInt(nombreCarrera);

    if (Number.isInteger(chequeoNumerosMaterias) && (isNaN(chequeoNombreMaterias))) {

        idCarrera += 1

        let nuevaCarrera = new Carrera(idCarrera, nombreCarrera, cantidadMaterias);
        agregarCarrera.push(nuevaCarrera);

        console.log(agregarCarrera);

        //creo la fila

        let fila = document.createElement("tr");
        fila.id = "fila-" + idCarrera;

        //creo la celda de datos

        let th = document.createElement("th");
        //le paso a la celda de datos el id
        th.innerText = nuevaCarrera.idCarrera;
        th.scope = "row";
        fila.appendChild(th);

        td = document.createElement("td");
        //le paso a la celda de datos Nombre de Carrera
        td.innerText = nuevaCarrera.nCarrera;
        td.id = `carrera-${idCarrera}`
        fila.appendChild(td);

        td = document.createElement("td");
        //le paso a la celda de datos Numero de Materias
        td.innerText = nuevaCarrera.nMaterias;
        td.id = `materias-${idCarrera}`
        fila.appendChild(td);

        td = document.createElement("td");
        //le paso a la celda de datos el Checkbox
        let checkbox = document.createElement('input');
        checkbox.className = "checkbox"
        checkbox.type = "checkbox";
        checkbox.id = idCarrera;
        td.appendChild(checkbox);

        //le paso a la fila los td
        fila.appendChild(td);
        //le paso la fila a la tabla
        cuerpo.appendChild(fila);

        let nuevoRegistro = JSON.stringify(nuevaCarrera);
        localStorage.setItem("materia_" + idCarrera, nuevoRegistro);

        // Swal.fire({
        //     position: 'center',
        //     icon: 'success',
        //     title: 'Materia agregada satisfactoriamente',
        //     showConfirmButton: false,
        //     timer: 1000
        // })

    } else {

        alert("Valores Ingresados Erróneos");

    }
}

//Eliminar de Carrera

let btnBorrarCarrera = document.getElementById("btnborrar-carrera");
btnBorrarCarrera.addEventListener("click", e => {
    e.preventDefault()
    borrarCarrera()
});


function borrarCarrera() {
    
    const inputs = document.getElementsByClassName('checkbox');
    const tamanoInputs = inputs.length;

    for (let i = 0; i < tamanoInputs; i++) {
        let checkbox = inputs[i];
        console.log(checkbox);
        if (checkbox.checked) {
            let fila = document.getElementById("fila-" + checkbox.id);
            console.log(fila);
            cuerpo.removeChild(fila);
            localStorage.removeItem('materia_' + checkbox.id)
            
        }
    }
}


let btnModificarCarrera = document.getElementById("btnmodificar-carrera");
btnModificarCarrera.addEventListener("click", e => {
    e.preventDefault()
    modificarCarrera()
});

//Modificar de Carrera    

function modificarCarrera() {
    let carrera;
    let materias;
    let contadorCheckbox = 0;
    const inputs = document.getElementsByClassName('checkbox');

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

// let btnAgregarMateria = document.getElementById("btnagregar-carreras");
// btnAgregarCarrera.addEventListener("click", agregarMateria);

// let idCarrera = 0
// let agregarMateria = [];

// class Materia {
//     constructor(idMateria, nMateria, cantidadhoras, nprofesores, modalidadcursada, cuatrimestre) {
//         this.idMateria = idMateria;
//         this.nMateria = nMateria;
//         this.cantidadhoras = cantidadhoras;
//         this.nprofesores = nprofesores;
//         this.modalidadcursada = modalidadcursada;
//         this.cuatrimestre = cuatrimestre;
//     }
// }


// function agregarMateria() {
//     let nombreMateria = document.getElementById("nombreMateria").value;
//     let cantidadMaterias = document.getElementById("cantidadProfesores").value;
//     let cantidadMaterias = document.getElementById("cantidadHs").value;
//     let cantidadMaterias = document.getElementById("regimenCursada").value;
//     let cantidadMaterias = document.getElementById("cuatrimestre").value;
// }

// let btnBorrarMateria = document.getElementById("btnborrar-materia");
// btnAgregarCarrera.addEventListener("click", borrarMateria);

// function borrarMateria() {



// }

// let btnModificarMateria = document.getElementById("btnmodificar-carreras");
// btnModificarMateria.addEventListener("click", modificarMateria);

// function modificarMateria() {

// }

// //Agregar profesores a plantilla

// let numeroProfesores = 0
// let Profesoresingresados = 0



// function agregarProfesor() {
//     numeroProfesores = parseInt(prompt("Ingrese numero de profesores que tendrá la cátedra"));
//     if (isNaN(numeroProfesores)) {
//         alert("el valor indicado no es un número");
//     } else {
//         for (Profesoresingresados = 0; Profesoresingresados < numeroProfesores; Profesoresingresados++)
//             nombreProfesor = prompt("Ingrese nombre del profesor");
//         Profesoresingresados = Profesoresingresados++;
//         alert("hay un total de " + Profesoresingresados) + "asignados a la cátedra";
//     }
// }

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
