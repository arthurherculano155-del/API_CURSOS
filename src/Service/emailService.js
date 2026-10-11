import nodemailer from 'nodemailer';
import "dotenv/config.js";

export async function enviarCodigo(destinatario, codigo) {
    const transporte = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const resposta = await transporte.sendMail({
        from: process.env.EMAIL_USER,
        to: destinatario,
        subject: `Sua senha ficou de recuperação!`,
        html: `
    <div style="
        max-width: 600px;
        margin: 0 auto;
        padding: 35px;
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        color: #333333;
        line-height: 1.8;
    ">

        <h1 style="
            color: #007bff;
            text-align: center;
            margin-bottom: 30px;
        ">
            🎓 CursinhoPertinho
        </h1>

        <h2 style="
            color: #222222;
            font-size: 23px;
        ">
            Opa, futuro(a) aprovado(a)! 👋💙
        </h2>

        <p>
            Parece que sua senha resolveu matar aula e saiu
            por aí sem avisar, né? 😂
        </p>

        <p>
            Mas relaxa! Aqui no
            <strong style="color: #007bff;">
                CursinhoPertinho
            </strong>,
            ninguém fica para trás, nem mesmo quem esqueceu a senha!
        </p>

        <p>
            Preparamos uma segunda chance especialmente pra você.
            Afinal, esquecer faz parte do aprendizado, e até os
            melhores alunos precisam de uma ajudinha de vez em
            quando! 📚✨
        </p>

        <div style="
            background-color: #eef6ff;
            border: 2px solid #007bff;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
        ">

            <p style="
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 10px;
            ">
                Seu código de recuperação é:
            </p>

            <h1 style="
                color: #007bff;
                font-size: 38px;
                letter-spacing: 8px;
                margin: 10px 0;
            ">
                ${codigo}
            </h1>

        </div>

        <p>
            ⏰ Só não vale esquecer do código também, hein?
            Ele é válido por apenas
            <strong>10 minutinhos</strong>,
            então aproveite para redefinir sua senha com
            tranquilidade! 💙
        </p>

        <p>
            Seu próximo aprendizado está pertinho de você.
            E a gente está aqui para ajudar em cada passo! 💙📚
        </p>

        <hr style="
            border: none;
            border-top: 1px solid #dddddd;
            margin: 30px 0;
        ">

        <p style="
            text-align: center;
            color: #007bff;
            font-weight: bold;
            font-size: 15px;
        ">
            As melhores oportunidades estão pertinho de você...
            só falta dar o próximo passo! 💙
        </p>

        <p style="
            text-align: center;
            color: #888888;
            font-size: 12px;
            margin-top: 25px;
        ">
            Se você não solicitou a recuperação de senha,
            pode ignorar este e-mail.
        </p>

        <p style="
            text-align: center;
            color: #aaaaaa;
            font-size: 12px;
        ">
            © 2026 CursinhoPertinho
        </p>

    </div>
`
    });

    return resposta;
}