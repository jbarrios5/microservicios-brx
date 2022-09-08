const mongoose = require('mongoose');



const dbConnection = async() => {

    try {

        await mongoose.connect( "mongodb+srv://juan:nUV84aAXEr19tYvK@cluster0.paxck.mongodb.net/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}



module.exports = {
    dbConnection
}
