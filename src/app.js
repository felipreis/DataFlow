import express from 'express';
import 'dotenv/config'
import router from './routes/routes.js';
import webhookRouter from './routes/webhookRoutes.js';
import sequelize from './config/dataBaseConfig.js'
import Lead from './models/lead/Lead.js';
import JourneyEvent from './models/lead/JourneyEvent.js';
import Organization from './models/organization/Organization.js';
import ConversionEvent from './models/conversion/ConversionEvent.js';
import conversionRouter from './routes/conversionRoutes.js';


const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(router);
app.use(webhookRouter);
app.use(conversionRouter)


async function startServer(){
    try {
        app.listen(PORT, () => {console.log(`Servidor online at PORT ${PORT}`)})

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        Lead.sync();
        JourneyEvent.sync();
        Organization.sync()
        ConversionEvent.sync()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();