import dayjs from "dayjs";
import { client } from "../../prisma/client"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

class RefreshTokenUserUseCase {
    async execute(refresh_token: string) {
        // Verificar se é um refreshToken válido
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token
            }
        });

        // Se não existir refresh Token
        if (!refreshToken) {
            throw new Error("Refresh token invalid");
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

        // Gerar novamente token
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.userId);

        if (refreshTokenExpired) {
            await client.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            })

            const generateRefreshTokenProvider = new GenerateRefreshToken();
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId);

            return { token, refreshToken: newRefreshToken }
        }

        return { token };
    }
}

export { RefreshTokenUserUseCase }