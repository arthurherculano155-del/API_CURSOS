import { Router } from "express";
import * as Service from "../../Service/Curso/cursoService.js";
const endpoints = Router();

endpoints.post('/cursos', async (req, resp) => {
    try{
        const cursos = req.body;
        let curso = await Service.postarCursoService(cursos);

        resp.send({
            id_oferta: curso
        })
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.get('/regiao/:id_regiao', async (req, resp) => {
    try{
        const id_regiao = req.params.id_regiao;
        const lista = await Service.getRegioesService(id_regiao);

        resp.send(lista);
    } 
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/cursos', async (req, resp) => {
    try{
        const lista = await Service.getCursoService();

        resp.send(lista);
    } 
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/unidades/:regiao', async (req, resp) => {
    try{
        const regiao = req.params.regiao;
        const resposta = await Service.getUnidadesService(regiao);

        resp.send(resposta);
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.get('/ofertas', async (req, resp) => {
    try{
        const regiao = req.query.regiao;
        const lista = await Service.getOfertasService(regiao);

        resp.send(lista)
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.delete('/ofertas/:id', async (req, resp) => {
    const id = req.params.id;
    const resposta = await Service.deleteOfertasService(id);

    resp.send({
        ID: resposta
    })
})

export default endpoints;