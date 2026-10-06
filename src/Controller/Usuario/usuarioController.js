import { Router } from 'express';
import * as Service from '../../Service/Usuario/usuarioService.js';
import * as middleware from '../../Middleware/autenticar.js';

const endpoints = Router();

endpoints.post('/usuario/cadastrar', async (req, resp) => {
    try {
        const user = req.body;
        const resposta = await Service.cadastrarUsuarioService(user);

        resp.send({
            ID: resposta
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.post('/usuario/entrar', async (req, resp) => {
    try {
        const user = req.body;

        const entrar = await Service.entrarUsuarioService(user);

        resp.send({
            resultado: "Login realizado com sucesso!",
            usuario: {
                id: entrar.id_usuario,
                nome: entrar.nome,
                email: entrar.email,
                cargo: entrar.cargo,
                primeiro_nome: entrar.primeiro_nome,
                imagem_url: entrar.imagem_url
            },
            token: entrar.token
        });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/usuario', async (req, resp) => {
    try {
        const email = req.query.email;
        const resposta = await Service.getUsuarioService(email);

        resp.send(resposta)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/usuario', 
    middleware.autenticar,
    middleware.apenasAdmin,
    async (req, resp) => {
    try {
        const email = req.body.email;
        const resposta = await Service.atualizarCargoService(email);

        resp.send({
            Linhas_Alteradas: resposta
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.put('/usuario/personalizar', async (req, resp) => {
    try {
        const user = req.body;
        const resposta = await Service.personalizarUsuarioService(user);

        resp.send({
            Linhas_Alteradas: resposta
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.delete('usuario/deletar/:id', 
    middleware.autenticar,
    middleware.apenasAdmin,
    async (req, resp) => {
    try {
        const id = req.params.id;

        const resposta = await Service.deleteUsuarioService(id);

        resp.send({
            Linhas_Alteradas: resposta
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoints;