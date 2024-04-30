import { IAccountRepository } from "../../repository/contracts/IAccountRepository";
import { IDeleteAccount } from "./IDeleteAccount";

export class DeleteAccount implements IDeleteAccount {


    constructor(
        private accountRepository: IAccountRepository,
    ) { }



    async execute(userID: string, aid: string) {


        try {

            const accountExist = await this.accountRepository.getAvailableAccountById(aid)

            if (!accountExist) throw Error("Conta não encontrada!")

            const response = await this.accountRepository.deleteAccount(userID, aid);

            return response;

        } catch (error) {
            console.log(error.message)
            return error
        }
    }
}