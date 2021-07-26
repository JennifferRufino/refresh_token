import {sign} from "jsonwebtoken";

class GenerateToken {
    async execute(userId: string){
        //Gerar token do usuário
        const token = sign({}, "3d21bd65-a093-4528-9a8a-92501ca3e546", {
            subject: userId,
            expiresIn: "1d"
        })

        return token;
    }
}

export {GenerateToken}