import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

// Crear la app
const app = express();

// Habilitar conexion a la base de datos
app.use( express.urlencoded({extended: true}) );


// Conexión a la base de datos
try {
    await db.authenticate(); // Promesa que se resuelve cuando conectamos con la BD
    db.sync();
    console.log('Conexión correcta a la base de datos');
} catch (error) {
    console.log(error);
};


// Habilitar PUG
app.set('view engine', 'pug');
app.set('views', './views');

// Carpeta Póublica
app.use(express.static('public'));

// Routing
app.use('/auth', usuarioRoutes);

// Definir un puerto y arrancar nuestro proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


