import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

class RefreshTokenUserController {
    async handle(request: Request, response: Response) {
        const { refresh_token } = request.body; // recebe refreshToken no body (nosso refreshToken é o próprio id do refreshToken)

        const refreshTokenUserUseCase = new RefreshTokenUserUseCase();
        const token = await refreshTokenUserUseCase.execute(refresh_token);

        return response.json(token);
    }
}

export { RefreshTokenUserController }