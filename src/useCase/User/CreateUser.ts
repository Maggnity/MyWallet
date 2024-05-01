import { IUserRepository } from "../../repository/contracts/IUserRepository";
import { CreateUserDTO, User } from "../../types/User";
import { v4 as uuidv4 } from 'uuid'
import { ICreateUser } from "./contracts/ICreateUser";

export default class CreateUser implements ICreateUser {

    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: CreateUserDTO): Promise<{
        name: string,
        id: string,
        email: string
    }> {
        try {

            const emailAlreadyRegistered = await this.userRepository.findUserWithEmail(data.email)

            if (emailAlreadyRegistered) throw Error("Email já registrado!")


            this.createdDate(data);
            this.generateId(data)


            const response = await this.userRepository.createUser(data)

            return response
        } catch (error: any) {
            console.log(error)
            return error
        }
    }

    private generateId(data: any) {
        data.id = uuidv4()
    }
    private createdDate(data: any) {
        data.created_date = new Date()
    }
};
