import { user } from "@prisma/client";
import { User } from "../../types/User";
import { IUpdateUser } from "./contracts/IUpdateUser";
import { IUserRepository } from "../../repository/contracts/IUserRepository";

export class UpdateUser implements IUpdateUser {

    constructor(
        private userRepository: IUserRepository
    ) { }


    async execute(data: User): Promise<{
        name: string,
        id: string,
        email: string
    }> {
        try {
            
            this.updatedDate(data)
            
            
            if (!data.id) throw Error("Falha ao obter ID")
                const userExist = await this.userRepository.findUserWithToken(data.id)
            if (!userExist) throw Error("Usuário não existe!")
                
                const response = await this.userRepository.updateUser(data as user)
                
                return response
            } catch (error: any) {
                console.log(error)
                return error
            }

    }
    private updatedDate(data: any) {
        data.updated_date = new Date()
    }
} 