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
let totalCarreras = [];

let tablaCarrera = document.getElementById("tableCareer");
let cuerpo = document.getElementById("cuerpotabla");

//Recuperacion del localStorage

//agarra el valor de parse, si no es undefined o null, sino agarra lo segundo 
const carreras = JSON.parse(localStorage.getItem("carreras")) || []; 

//recorro el array de carreras ya parseado y voy tirando las claves 1x1 para recuperar
for (let i = 0; i < carreras.length; i++) {
    let valorRecuperado = localStorage.getItem(carreras[i]);
    try {
        let valorParseado = JSON.parse(valorRecuperado);
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
    } catch (error) {
        console.log("Valor no es un JSON válido: " + valorRecuperado);
    }
}

//Creacion de Carrera

let btnAgregarCarrera = document.getElementById("btnagregar-carreras");
btnAgregarCarrera.addEventListener("click", e => { e.preventDefault(); sumarCarrera() });

function sumarCarrera() {

    let nombreCarrera = document.getElementById("nombreCarrera").value;
    let cantidadMaterias = document.getElementById("cantidadMaterias").value;

    chequeoNumerosMaterias = parseInt(cantidadMaterias);
    chequeoNombreMaterias = parseInt(nombreCarrera);

    let recuperacionCarerras = JSON.parse(localStorage.getItem("carreras"))

    if (recuperacionCarerras !== null) {
        //chequea que si esta creada la carrera en el array
        let repetido = false;
        for (let i = 0; i < recuperacionCarerras.length; i++) {
            let comprobacioncarrera = recuperacionCarerras[i];
            if (nombreCarrera == comprobacioncarrera) {
                repetido = true
                alert("la carrera ya se encuentra creada y almacenda");
                break;
            }

        } if (!repetido) {

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
                localStorage.setItem(nombreCarrera, nuevoRegistro);
                /*tengo que agarrar la key de carrera, reconvertirla al array, 
                sumar la nueva carrera, volver a convertirlo a stringlify y guardar
                en el localstorage
                */
                recuperacionCarerras = JSON.parse(localStorage.getItem("carreras"));
                recuperacionCarerras.push(nombreCarrera);
                let enviarLocalstorage = JSON.stringify(recuperacionCarerras);
                localStorage.setItem("carreras", enviarLocalstorage);


            } else {

                alert("Valores Ingresados Erróneos");

            }

        }


    } else if (Number.isInteger(chequeoNumerosMaterias) && (isNaN(chequeoNombreMaterias)) && recuperacionCarerras == null) {

        idCarrera += 1

        let nuevaCarrera = new Carrera(idCarrera, nombreCarrera, cantidadMaterias);
        agregarCarrera.push(nuevaCarrera);

        console.log(nuevaCarrera);

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

        /*hago json al objeto de nuevaCarrera y 
        creo un localstorage con el nombre de la carrera y los datos*/

        let nuevoRegistro = JSON.stringify(nuevaCarrera);
        localStorage.setItem(nombreCarrera, nuevoRegistro);

        /* le paso el nombre de la carrera al array, lo convierto a json
        y creo un al localstorage con la clave carreras y el valor json.array   */

        totalCarreras.unshift(nombreCarrera)
        let carrerasJson = JSON.stringify(totalCarreras);
        localStorage.setItem("carreras", carrerasJson);

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
            let nombreCarrera = document.getElementById(`carrera-${checkbox.id}`);
            nombreCarrera = nombreCarrera.innerText
            cuerpo.removeChild(fila);
            localStorage.removeItem(nombreCarrera)
            //tengo que parsearlo sino jamas me va a devolver un array, que genio
            let carreras = JSON.parse(localStorage.getItem("carreras"));
            let index = carreras.indexOf(nombreCarrera);
            if (index !== -1) {
                carreras.splice(index, 1);
                localStorage.setItem("carreras", JSON.stringify(carreras));
            }

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
    let nombreCarreraSeleccionada;
    let materiaCarreraSeleccionada;
    let elementoNombreCarreraSeleccionada;
    let elementoMateriasCarreraSeleccionada;
    let contadorCheckbox = 0;
    const inputs = document.getElementsByClassName('checkbox');

    for (let input of inputs) {
        if (input.checked) {
            contadorCheckbox++;
            nombreCarreraSeleccionada = document.getElementById(`carrera-${input.id}`).innerText;
            materiaCarreraSeleccionada = document.getElementById(`materias-${input.id}`).innerText;
            elementoNombreCarreraSeleccionada = document.getElementById(`carrera-${input.id}`);
            elementoMateriasCarreraSeleccionada = document.getElementById(`materias-${input.id}`)
        }
    }

    if (contadorCheckbox != 1) {

        alert("Seleccione un solo elemento");
        
    } else {
        const nuevoNombreCarrera = document.getElementById("nombreCarrera").value;
        const nuevaCantidadMaterias = document.getElementById("cantidadMaterias").value;
        let carreraStorage = JSON.parse(localStorage.getItem("carreras"));
        let carreraSeleccionada = JSON.parse(localStorage.getItem(nombreCarreraSeleccionada));

        if (carreraStorage.includes(nuevoNombreCarrera)) {
            alert("Ya está el el nombre de la carrera utilizado")
        
            return
        } 
        /*buscar en el array los elementos que coincidan con nombrecarrera
        compararlo, elminarlo del array, pushearlo y volverlo a stringlifear para guardarlo
        en el localstorage.

            Remover
        */
        //piso el valor del nombre y las materias en el objeto y paso al localstorage
        carreraSeleccionada.nCarrera = nuevoNombreCarrera;
        carreraSeleccionada.nMaterias = nuevaCantidadMaterias;
        localStorage.removeItem(nombreCarreraSeleccionada);
        localStorage.setItem(nuevoNombreCarrera, JSON.stringify(carreraSeleccionada));

        carreraStorage = carreraStorage.filter(carrera => carrera !== nombreCarreraSeleccionada);
        carreraStorage.push(nuevoNombreCarrera);
        localStorage.setItem("carreras", JSON.stringify(carreraStorage));
        
        //pisan visualmente la tabla

        elementoNombreCarreraSeleccionada.innerText = nuevoNombreCarrera;
        elementoMateriasCarreraSeleccionada.innerText = nuevaCantidadMaterias;

    }



    console.log(contadorCheckbox);
    localStorage.setItem(nombreCarrera,);
}


//funcion crear fila


//Creación de materias



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
