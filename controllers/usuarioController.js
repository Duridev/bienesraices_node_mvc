import { check, validationResult } from 'express-validator'
import Usuario from "../models/Usuario.js";
import { generarId } from '../helper/token.js';
import { emailRegistro } from "../helper/emails.js";


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
    await check('password').isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres').run(req);
    await check('repetir_password').equals(req.body.password).withMessage('Los password no son iguales').run(req);

    let resultado = validationResult(req);

    // Verificar que el usuario esté vacío
    if (!resultado.isEmpty()) {
        // Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }
    // Extraer los datos
    const {nombre, email, password } = req.body;

    // Verificar si el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({ where : {email : req.body.email} });
    if(existeUsuario) {
        return res.render('auth/registro', {
            pagina:'Crear Cuenta',
            errores: [{msg: 'El Usuario ya está Registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // Almacenar usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    });

    // Envio email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })


    // Mostrar mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un Email de Confirmación, presiona el enlace'
    })
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
