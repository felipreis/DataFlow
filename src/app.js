import express from 'express';
import 'dotenv/config'
import router from './routes/routes.js';
import sequelize from './config/dataBaseConfig.js'


const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(router);


async function startServer(){
    try {
        app.listen(PORT, () => {console.log(`Servidor online at PORT ${PORT}`)})

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();