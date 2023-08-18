import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos

    // Enviar el mail
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject:'Bienvenido a Bienes Raíces',
        html:`<p>Hola ${nombre}</p>

        <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:
        <a href="http://localhost:3000/api/v1/auth/${token}">Activar cuenta</a></p>

        <p>Si tu no creaste esta cuenta, puedes ignnorar el mensaje.</p>
        `


    })

};


export {
    emailRegistro
};