import { IUserRepository } from "../repository/IUserRepository";
import { User } from "../types/User";
import { IGetUser } from "./contracts/IGetUser";

export default class getUserUseCase implements IGetUser {

    constructor(
        private userRepository: IUserRepository
    ) { }


    async execute(token: string): Promise<User | null> {

        console.log(`Getting user with id ${token}`)
        
        const response = await this.userRepository.findUserWithToken(token)
        
        if(response)
        console.log(`User ${token}: ${response}`)

        return response
    }
};
