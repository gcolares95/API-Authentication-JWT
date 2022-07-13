// Middlaware p/ verificar se o token é válido

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization; // Na requisição, passamos o token do Authorization

    // Se não tiver nenhum token informado
    if (!authToken) {
        return response.status(401).json({
            message: 'Unauthorized, token is missing'
        })
    }
    
    // Bearer aasdas7d8gf87gfdg8jasdj8sa2
    const [, token] = authToken.split(" "); // Obtendo apenas o token para validar

    try {
        verify(token, "143a9ddc-4879-438c-92ed-9330e047d212")
        
        return next()
    } catch (err) {
        return response.status(401).json({
            message: 'Token invalid'
        })
    }
}