

const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //llamada a conectarDB
        this.conectarDB();
        //Midelware
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
        }

    //aqui se define el metodo middleware que publicara la carpeta public
    middlewares() {
        this.app.use(cors());
        //lectura y parseo del body recibe lo que se envia
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }
}
module.exports = Server;