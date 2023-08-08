import Sequelize from "sequelize";
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    dialect: 'postgres',
    port: 5432,
    define: {
        timestamps: true
    },
    pool: {
        max: 5, 
        min: 0,   
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
})

console.log(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, process.env.BD_HOST)


export default db;