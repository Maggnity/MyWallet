import { account } from "@prisma/client"
import { IAccountRepository } from "../../repository/contracts/IAccountRepository"
import { IUpdateAccount } from "./contracts/IUpdateAccount"

export class UpdateAcount implements IUpdateAccount {
    constructor(
        private accountRepository: IAccountRepository
    ) { }


    async execute(userID: string, aid: string, data): Promise<Partial<account>> {


        try {
            const accountExist = await this.accountRepository.getAvailableAccountById(aid)

            if (!accountExist) throw Error("Conta não existe!")

            const response = await this.accountRepository.updateAccount(userID, aid, data)

            console.log({response})
            return response

        } catch (error) {
            console.log(error)
            return error
        }
    }
};
