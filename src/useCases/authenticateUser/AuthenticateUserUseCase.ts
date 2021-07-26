import {client} from "../../prisma/client";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateToken } from "../../provider/GenerateToken";

interface IRequest {
    username: string
    password: string
}

class AuthenticateUserUseCase {
    async execute({username, password}: IRequest) {

        //Verificar se o usuário existe
        const userAlreadyExist = await client.user.findFirst({
            where: {
                username
            }
        })

        if(!userAlreadyExist) {
            throw new Error("User or password incorrect!");
        }

        //Verificar se a senha está correta
        const matchPassword = await compare(password, userAlreadyExist.password);

        if(!matchPassword) {
            throw new Error("User or password incorrect!");
        }

        //Gerar token do usuário
        const generateTokenProvider = new GenerateToken();

        const token = generateTokenProvider.execute(userAlreadyExist.id);

        await client.refreshToken.deleteMany({
            where: {
                userId: userAlreadyExist.id
            }
        })

        const generateRefreshToken = new GenerateRefreshToken();

        const refreshToken = await generateRefreshToken.execute(userAlreadyExist.id);

        return {token, refreshToken};
    }
}

export {AuthenticateUserUseCase}