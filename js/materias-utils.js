import './materias.js';

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
        cMaterias: "cantidad-materias",
        hs: "cantidad-hs",
        rCursada: "regimen-cursada",
        tRegimen: "cuatrimestre",
        checkbox: "checkbox",
    }

    return etiquetasMateria

}



export function buscarCheckboxSeleccionado(inputs) {

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