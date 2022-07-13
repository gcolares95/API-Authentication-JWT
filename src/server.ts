import "express-async-errors"
import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';

const app = express();

app.use(express.json()); // recebe json dentro da aplicação

app.use(router)

// Criando um middleware responsável por verificar os errors, e retornar dentro de um response, para execução do app não ficar parada
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(400).json({
        status: "Error",
        message: error.message,
    })
})

app.listen(3001, () => console.log('server is running on port 3001'))