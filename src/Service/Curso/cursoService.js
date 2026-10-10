import * as DBCursos from '../../Repository/Curso/cursosRepository.js'
import * as validacao from '../../Validation/Curso/cursoValidation.js'

export async function postarCursoService(curso){
    await validacao.validarOferta(curso);
    const response = await DBCursos.postarCurso(curso);

    return response;
}

export async function getRegioesService(id_regiao){
    const response = await DBCursos.getRegioes(id_regiao);

    return response;
}

export async function getCursoService(){
    const response = await DBCursos.getCursos();

    return response;
}

export async function getUnidadesService(regiao){
    const response = await DBCursos.getUnidades(regiao);

    return response;
}

export async function getOfertasService(regiao) {
    const response = await DBCursos.getOfertas(regiao);

    return response;
}

export async function deleteOfertasService(regiao){
    const response = await DBCursos.deleteOfertas(regiao);

    return response.insertId;
}