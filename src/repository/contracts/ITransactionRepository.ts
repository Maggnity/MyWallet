import { account, transactions } from "@prisma/client";

export interface ITransactionRepository {


    newTransaction: (aid: account["id"], data: NewTransactionDTO) => Promise<{
        id: string,
        status: string,
        type: string
    }>

    updateTransaction: (id: transactions["id"], data: NewTransactionDTO) => Promise<TransactionDAO>


    getTransactionById: (tid: transactions["id"]) => Promise<TransactionDAO | null>
}

export type TransactionDAO = {
    id: string,
    status: string,
    name: string | null,
    description: string | null,
    category: string | null,
    amount: number,
    created_at: Date | null,
    type: string
}

export type NewTransactionDTO = {
    amount: number,
    type: string
    category?: string,
    name?: string,
    status: string,
    description?: string
}