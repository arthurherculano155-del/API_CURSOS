import { Router } from 'express';
import { upload } from '../../Middleware/multer.js';
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
                id: entrar.conta.id_usuario,
                nome: entrar.conta.nome,
                email: entrar.conta.email,
                primeiro_nome: entrar.conta.primeiro_nome,
                imagem_url: entrar.conta.imagem_url
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

endpoints.put(
    '/usuario/personalizar',
    middleware.autenticar,
    async (req, resp) => {
    try {
        const email = req.usuario.email;
        const imagem_url = req.body.imagem_url;
        const primeiro_nome = req.body.primeiro_nome;

        const resposta = await Service.personalizarUsuarioService(imagem_url, primeiro_nome, email);

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

endpoints.delete('/usuario/deletar/:id',
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
endpoints.post("/usuario/enviar-codigo", async (req, resp) => {
    try {
        const email = req.body.email;

        await Service.enviarCodigoService(email);

        resp.send({
            resultado: "Se o e-mail estiver cadastrado, enviaremos um código de recuperação."
        });
    }
    catch (err) {
        resp.status(500).send({
            erro: "Não foi possível enviar o código."
        });
    }
});

endpoints.post('/usuario/verificar-codigo', async (req, resp) => {
    try {
        const email = req.body.email;
        const codigo = req.body.codigo;

        const token = await Service.verificarCodigoService(email, codigo);

        resp.send({
            resultado: "Código verificado com sucesso",
            token: token
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put("/usuario/redefinir-senha", async (req, resp) => {
    try {
        const token = req.body.token;
        const novaSenha = req.body.novaSenha;

        await Service.atualizarSenhaService(token, novaSenha);

        resp.send({
            resultado: "Senha atualizada com sucesso!"
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put(
    '/usuario/foto',
    middleware.autenticar,
    upload.single('foto'),
    async (req, resp) => {
        try {
            if (!req.file) {
                return resp.status(400).send({
                    erro: 'Nenhuma foto foi enviada.'
                });
            }

            const imagem_url =
                await Service.atualizarFotoPerfilService(
                    req.usuario.id,
                    req.file.path
                );

            resp.send({
                resultado: 'Foto de perfil atualizada!',
                imagem_url
            });
        }
        catch (err) {
            resp.status(500).send({
                erro: err.message
            });
        }
    }
);

export default endpoints;