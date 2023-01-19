import './materias.js';


export function limiteMaterias() {

    let valorSelect = document.getElementById("dropbox-carreras").value;
    let carrera = JSON.parse(localStorage.getItem(valorSelect));
    let limiteMaterias = carrera.nMaterias;
    limiteMaterias = parseInt(limiteMaterias);

    return limiteMaterias;

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
        cMaterias: "cantidad-materias",
        hs: "cantidad-hs",
        rCursada: "regimen-cursada",
        tRegimen : "cuatrimestre",
    } 

    return etiquetasMateria
    
}