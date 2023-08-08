import { check, validationResult } from 'express-validator'
import Usuario from "../models/Usuario.js";


const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    });
};

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    });
};

const registrar = async (req, res) => {
    // Validación
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacío').run(req);
    await check('email').isEmail().withMessage('Eso no parece un email').run(req);
    await check('password').isLength({min: 6}).withMessage('El password debe tener al menos 6 caracteres').run(req);
    await check('repetir_password').equals('password').withMessage('Los password no son iguales').run(req);

    let resultado = validationResult(req);

    // Verificar que el usuario esté vacío

    res.json(resultado.array());

    const usuario = await Usuario.create(req.body);
    res.json(usuario);
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu Acceso'
    });
};

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
}
