import { IAccountRepository } from "../../repository/contracts/IAccountRepository";
import { CreateAccountDTO } from "../../types/Account";
import { IGetUser } from "../User/contracts/IGetUser";
import { ICreateAccount } from "./contracts/ICreateAccount";

export default class CreateAccountUseCase implements ICreateAccount {

    constructor(
        private accountRepository: IAccountRepository,
        private getUser: IGetUser
    ) {
    }


    async execute(userID: string, data: CreateAccountDTO) {
        try {

            const user = await this.getUser.execute(userID)
            if (!user) throw Error("Usuário não encontrado!")

            const accountExist = await this.accountRepository.getAvailableAccount(userID, data.bank, data.number, data.agency)

            if (accountExist) throw Error("Esta conta já está cadastrada nesta agência")

            const response = await this.accountRepository.createAccount(userID, data)
            return response
        } catch (error) {
            console.log(error)
            return error
        }
    }
};
