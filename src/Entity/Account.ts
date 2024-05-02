import { account } from "@prisma/client";
import { IAccountRepository } from "../repository/contracts/IAccountRepository";
import { ICardRepository } from "../repository/contracts/ICardRepository";
import { CreateCardDTO } from "../types/Cards";
import { ITransactionRepository, NewTransactionDTO } from "../repository/contracts/ITransactionRepository";


type DepositData = {
    value: number,
    category: string,
    name: string,
    description: string
}

export class Account {


    constructor(
        private accountRepository: IAccountRepository,
        private cardRepository: ICardRepository,
        private transactionRepository: ITransactionRepository
    ) { }


    public async deposit(aid: string, data: DepositData) {

        const account = await this.validateAccountById(aid)

        const newValue = this.addValue(account.balance, data.value)
        const transaction = await this.newTransaction(aid, data.value, "deposit", data.category, data.description, data.name)
        const response = await this.accountRepository.updateBalance(aid, newValue)

        return {
            id_transaction: transaction.id,
            status: transaction.status,
            balance: response.balance,
            type: transaction.type
        }

    }

    public async cashOut(aid: string, data: DepositData) {

        const account = await this.validateAccountById(aid)

        const newValue = this.subtractValue(account.balance, data.value)
        const transaction = await this.newTransaction(aid, data.value, "cashout", data.category, data.description, data.name)

        const response = await this.accountRepository.updateBalance(aid, newValue)

        return {
            id_transaction: transaction.id,
            status: transaction.status,
            balance: response.balance,
            type: transaction.type
        }
    }

    public async updateTransaction(tid: string, data: NewTransactionDTO) {

        const response = await this.transactionRepository.updateTransaction(tid, data)

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
        return currentValue - value
    }
    private async newTransaction(
        aid: account["id"],
        amount: number,
        type: "deposit" | "cashout",
        category?: string,
        description?: string,
        name?: string
    ) {

        const data: NewTransactionDTO = {
            amount,
            type,
            status: "pending",
            category,
            description,
            name

        }

        const response = await this.transactionRepository.newTransaction(aid, data)

        return response

    }
}