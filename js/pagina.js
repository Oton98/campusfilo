//Creacion de Carrera

function agregarCarrera() {

}

function borrarCarrera() {

}

function modificarCarrera() {

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
