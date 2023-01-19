export class Materia {
    constructor(idMateria, nombreMateria, cantidadProfesores, cantidadHs, regimenCursada, cuatrimestre) {
        this.idMateria = idMateria
        this.nombreMateria = nombreMateria
        this.cantidadProfesores = cantidadProfesores
        this.cantidadHs = cantidadHs
        this.regimenCursada = regimenCursada
        this.cuatrimestre = cuatrimestre
        this.profesores= []
        this.alumnos = []

    }
}