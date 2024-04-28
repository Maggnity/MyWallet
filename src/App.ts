import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/index';
import { PrismaClient } from '@prisma/client';

export class App {
    
    async init(config: any) {

        const app = express()
        const routes = apiRouter()

        app.use(express.json({ limit: '100mb' }))

        app.use(express.urlencoded({ extended: true, limit: '50mb' }));
        app.use(cors());
        
        app.get('/', (req, res) => res.send("Hello world"))
        app.use('/api', routes);
        app.listen(4015, () => {
            console.log(`Listening at port ${4015}`);
        });
    }
}

export default App

export const prisma = new PrismaClient()
