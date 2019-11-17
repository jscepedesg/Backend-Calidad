'use strict'
//Conexion a la base de datos MongoDB
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
//mongodb://127.0.0.1:27017
mongoose.connect('mongodb://localhost:27017/nutritional')
        .then(() => {
            console.log("Conexión a la base de datos establecida satisfactoriamente...");

            //Creacion del servidor
            app.listen(port, () => {
                console.log("Servidor corriendo correctamente en la url: http://191.234.175.200/");
            });
        })
        .catch(err => console.log(err));
