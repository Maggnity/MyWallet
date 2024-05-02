import { account } from "@prisma/client";
import { IAccountRepository } from "../repository/contracts/IAccountRepository";
import { ICardRepository } from "../repository/contracts/ICardRepository";
import { CreateCardDTO } from "../types/Cards";
import { ITransactionRepository } from "../repository/contracts/ITransactionRepository";

export class Account {


    constructor(
        private accountRepository: IAccountRepository,
        private cardRepository: ICardRepository,
        private transactionRepository: ITransactionRepository
    ) { }


    public async deposit(aid: string, value: number) {

        const account = await this.validateAccountById(aid)

        const newValue = this.addValue(account.balance, value)
        const transaction = await this.newTransaction(aid, value, "deposit")
        const response = await this.accountRepository.updateBalance(aid, newValue)

        return {
            id_transaction: transaction.id,
            status: transaction.status,
            balance: response.balance
        }

    }

    public async cashOut(aid: string, value: number) {

        const account = await this.validateAccountById(aid)

        const newValue = this.subtractValue(account.balance, value)
        const transaction = await this.newTransaction(aid, value, "deposit")

        const response = await this.accountRepository.updateBalance(aid, newValue)

        return {
            id_transaction: transaction.id,
            status: transaction.status,
            balance: response.balance
        }
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
        return currentValue - value
    }
    private async newTransaction(
        aid: account["id"],
        amount: number,
        type: "deposit" | "cashout"
    ) {

        const data = {
            amount,
            type,
            status: "pending"
        }

        const response = await this.transactionRepository.newTransaction(aid, data)

        return response

    }
}