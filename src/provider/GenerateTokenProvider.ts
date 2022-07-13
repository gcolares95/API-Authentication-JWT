import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
    async execute(user_id: string) {
        const token = sign({}, "143a9ddc-4879-438c-92ed-9330e047d212", {
            subject: user_id,   // id do usuário para gerar nosso token
            expiresIn: "20s"
        });

        return token
    }
}

export { GenerateTokenProvider }