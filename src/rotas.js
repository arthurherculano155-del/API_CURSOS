import cursos from './Controller/cursoController.js'

export default function Rotear(api){
    api.use(cursos)
}