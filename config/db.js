import Sequelize from "sequelize";

const db = new Sequelize('bienesraices_node_mvc', 'postgres', 'sql', {
    host: 'localhost',
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

export default db;