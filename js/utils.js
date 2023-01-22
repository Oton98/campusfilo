export function crearFila(id) {

  let fila = document.createElement("tr");
  fila.id = "fila-" + id;
  return fila

}

export function crearData(id, tipoDato, valorDato, fila) {

  let td = document.createElement("td");
  td.innerText = valorDato;
  td.id = tipoDato + "-" + id;
  fila.appendChild(td);

}

export function crearCheckbox (id, checkboxNuevo, fila) {

  let td = document.createElement("td");
  checkboxNuevo = document.createElement("input");
  checkboxNuevo.type = "checkbox";
  checkboxNuevo.className = "checkboxNuevo";
  checkboxNuevo.id = id;
  td.appendChild(checkboxNuevo);
  fila.appendChild(td);
  
  }

//Empuja la fila creada a la tabla, 

export function modificarTabla(fila) {

  let cuerpo = document.getElementById("cuerpotabla");
  cuerpo.appendChild(fila)


}

//funciones para recuperar carreras y materias

export function recuperarCarreras() {

  let carrerasRecuperadas = JSON.parse(localStorage.getItem("carreras"));
  return carrerasRecuperadas;

}

export function recuperarObjetoCarrera(carrera) {

  let objetoCarrera = JSON.parse(localStorage.getItem(carrera))
  return objetoCarrera;

}

export function eliminarFilasTablas(tabla) {
    
  let filas = tabla.getElementsByTagName("tr");
  let cantidadFilas = filas.length;
  for (let i = 0; i < cantidadFilas; i++){
      tabla.removeChild(filas[0]);
      
  }
  
  
}