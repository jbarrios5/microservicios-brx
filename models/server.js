const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app  = express();
        this.port = 4000

        this.paths = {
            auth:       '/api/auth',
            usuarios:   '/api/user',
            roles:   '/api/roles',

        }


       

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

  

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

      

    }

    routes() {
        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuarios, require('../routes/users'));
        this.app.use( this.paths.roles, require('../routes/roles'));

        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
