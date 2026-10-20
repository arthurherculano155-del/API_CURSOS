import * as DBCursos from '../../Repository/Curso/cursosRepository.js'
import * as validacaoCurso from '../../Validation/Curso/cursoValidation.js'
import * as validacaoUsuario from '../../Validation/Usuario/usuarioValidation.js'

export async function postarCursoService(curso) {
    await validacaoCurso.validarOferta(curso);
    const response = await DBCursos.postarCurso(curso);

    return response;
}

export async function getRegioesService(id_regiao) {
    const response = await DBCursos.getRegioes(id_regiao);

    return response;
}

export async function getCursoService() {
    const response = await DBCursos.getCursos();

    return response;
}

export async function getUnidadesService(regiao) {
    const response = await DBCursos.getUnidades(regiao);

    return response;
}

export async function getOfertasService(regiao) {
    const response = await DBCursos.getOfertas(regiao);

    return response;
}

export async function deleteOfertasService(regiao) {
    const response = await DBCursos.deleteOfertas(regiao);

    return response.insertId;
}

export async function InserirOfertaListaService(usuario, oferta) {
    await validacaoUsuario.validarEmailExistente(usuario);
    await validacaoCurso.validarOfertaPorID(oferta);
    await validacaoCurso.validarOfertaLista(oferta, usuario);


    const response = await DBCursos.InserirOfertaLista(
        usuario,
        oferta
    );

    return response;
}

export async function getOfertasLista(id_usuario) {
    const response = await DBCursos.getListaOfertas(id_usuario);

    return response;
}