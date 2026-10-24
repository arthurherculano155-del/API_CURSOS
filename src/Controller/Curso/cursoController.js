import { Router } from "express";
import * as Service from "../../Service/Curso/cursoService.js";
import * as middleware from '../../Middleware/autenticar.js';
const endpoints = Router();

endpoints.post('/cursos',
    middleware.autenticar,
    middleware.apenasAdmin,
    async (req, resp) => {
        try {
            const cursos = req.body;
            let curso = await Service.postarCursoService(cursos);

            resp.send({
                id_oferta: curso
            })
        }
        catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
    });

endpoints.get('/regiao/:id_regiao', async (req, resp) => {
    try {
        const id_regiao = req.params.id_regiao;
        const lista = await Service.getRegioesService(id_regiao);

        resp.send(lista);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/cursos', async (req, resp) => {
    try {
        const lista = await Service.getCursoService();

        resp.send(lista);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/unidades/:regiao', async (req, resp) => {
    try {
        const regiao = req.params.regiao;
        const resposta = await Service.getUnidadesService(regiao);

        resp.send(resposta);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.get('/ofertas', async (req, resp) => {
    try {
        const pesquisa = req.query;
        const lista = await Service.getOfertasService(pesquisa);

        resp.send(lista)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.delete('/ofertas/:id',
    middleware.autenticar,
    middleware.apenasAdmin,
    async (req, resp) => {
        const id = req.params.id;
        const resposta = await Service.deleteOfertasService(id);

        resp.send({
            ID: resposta
        }
        )
    })

endpoints.post(
    '/ofertas/cadastrar',
    middleware.autenticar,
    async (req, resp) => {
        try {
            const usuario = req.usuario.id;
            const oferta = req.body.oferta;

            const ID = await Service.InserirOfertaListaService(usuario, oferta);

            resp.send({
                ID: ID
            })
        }
        catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
    })

endpoints.get('/ofertas/lista/:id_usuario', async (req, resp) => {
    try {
        const id_usuario = req.params.id_usuario;

        const resposta = await Service.getOfertasLista(id_usuario);

        resp.send(
            resposta
        )
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete(
    '/usuario/ofertas/deletar',
    middleware.autenticar,
    async (req, resp) => {

        try {
            const usuario = req.usuario.id;
            const oferta = req.body.oferta;

            const deletar = await Service.DeletarOfertaUsuarioService(usuario, oferta)

            resp.send({
                Linhas_Alteradas: deletar
            })
        }
        catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
    })

export default endpoints;