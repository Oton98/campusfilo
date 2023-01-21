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

export function crearCheckbox (id, tipoDato, fila) {

  let td = document.createElement("td");
  let checkbox = document.createElement("input");
  checkbox.type = tipoDato;
  checkbox.className = tipoDato;
  checkbox.id = id;
  td.appendChild(checkbox);
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