import { account } from "@prisma/client";
import { IAccountRepository } from "../repository/contracts/IAccountRepository";
import { ICardRepository } from "../repository/contracts/ICardRepository";
import { CreateCardDTO } from "../types/Cards";

export class Account {


    constructor(
        private accountRepository: IAccountRepository,
        private cardRepository: ICardRepository,
    ) { }


    public async deposit(aid: string, value: number) {
        
        const account = await this.validateAccountById(aid)

        const newValue = this.addValue(account.balance, value)
        const response = await this.accountRepository.updateBalance(aid, newValue)

        return response

    }

    private async cashOut(aid: string, value: number) {
        
        const account = await this.validateAccountById(aid)

        const newValue = this.subtractValue(account.balance, value)

        const response = await this.accountRepository.updateBalance(aid, newValue)

        return response
    }

    private async createCard(account: number, data: CreateCardDTO) {
        try {

            const response = await this.cardRepository.createCard(account, data)
        } catch (error) {

        }

    }

    private async validateAccountById(aid: account["id"]) {
        try {

            const account = await this.accountRepository.getAvailableAccountById(aid)

            if (!account) throw Error("Conta não encontrada!")
            return account
        } catch (error) {
            console.log(error)
            return error
        }
    }
    private addValue(currentValue: number, value: number) {
        return currentValue + value
    }
    private subtractValue(currentValue: number, value: number) {
        return currentValue + value
    }
}