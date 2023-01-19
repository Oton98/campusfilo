export function crearFila(id) {

  let fila = document.createElement("tr");
  fila.id = "fila-" + id;
  return fila

}

export function crearData(id, tipoDato, valorDato, fila) {

  let td = document.createElement("td");
  td.innerText = valorDato;
  td.id = tipoDato + "-" + valorDato;
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