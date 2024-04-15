import 'reflect-metadata';
import express from 'express';
import { AllRouter } from './routes';
import 'dotenv/config';
import swaggerDocs from './swagger.json';
import swaggerUi from 'swagger-ui-express';

const router = new AllRouter().getRouter();

export const App = express();

App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
App.use(express.json());
App.use(router);


