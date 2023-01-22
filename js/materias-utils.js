import './materias.js';
import './utils.js';

export function limiteMaterias(carreras, valorSeleccionado) {
    
    let cantidadMaterias = 0

    for (let i = 0; i < carreras.length; i++) {

        

        if (valorSeleccionado = carreras[i]) {
            let carrera = JSON.parse(localStorage.getItem(valorSeleccionado));
            cantidadMaterias = carrera.nMaterias;
            cantidadMaterias = parseInt(cantidadMaterias);
            break
        }

    }

   return cantidadMaterias;

}

//Usado para chequear si a la hora de crear materias me estoy pasando de la cantidad seteada

export function checkCantidad(cantidadMaterias) {
    let totalmaterias = cantidadMaterias.length;
    if (totalmaterias > limiteMaterias()) {
        alert("Limite de materias ingresadas alcanzado")
        let resultado = false;
        return resultado;
    }
}

export function creadorEtiquetas() {
    let etiquetasMateria = {
        id: "id",
        tipo: "materia",
        cProfesores: "cantidad-profesores",
        hs: "cantidad-hs",
        rCursada: "regimen-cursada",
        tRegimen: "cuatrimestre",
        checkboxNuevo: "checkbox",
    }

    return etiquetasMateria

}



