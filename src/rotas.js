import cursos from './Controller/Curso/cursoController.js'
import usuarios from './Controller/Usuario/usuarioController.js'

export default function Rotear(api){
    api.use(cursos)
    api.use(usuarios)
}