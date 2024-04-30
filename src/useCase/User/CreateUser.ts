import { IUserRepository } from "../../repository/contracts/IUserRepository";
import { User } from "../../types/User";
import { v4 as uuidv4 } from 'uuid'
import { ICreateUser } from "./contracts/ICreateUser";

export default class CreateUser implements ICreateUser {

    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: User): Promise<{
        name: string,
        id: string,
        email: string
    }> {
        const emailAlreadyRegistered = await this.userRepository.findUserWithEmail(data.email)

        if (emailAlreadyRegistered) throw Error("Email já registrado!")

        data.id = uuidv4();

        this.createdDate(data);
        this.generateId(data)

        if (!data.id) throw Error("Falha ao criar ID")

        //@ts-ignore
        const response = await this.userRepository.createUser(data)

        return response
    }

    private generateId(data) {
        data.id = uuidv4()
    }
    private createdDate(data) {
        data.created_date = new Date()
    }
};
