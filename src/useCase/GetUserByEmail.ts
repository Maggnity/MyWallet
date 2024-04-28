import { IUserRepository } from "../repository/IUserRepository";
import { User } from "../types/User";
import { IGetUser } from "./contracts/IGetUser";

export default class getUserByEmail implements IGetUser {

    constructor(
        private userRepository: IUserRepository
    ) { }


    async execute(email: string): Promise<User | null> {

        console.log(`Getting user with email '${email}'`)

        const response = await this.userRepository.findUserWithEmail(email)

        if (response)
            console.log(`User '${email}': ${response}`)

        return response
    }
};
