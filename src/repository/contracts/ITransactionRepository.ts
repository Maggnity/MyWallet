import { account } from "@prisma/client";

export interface ITransactionRepository {


    newTransaction: (aid: account["id"], data: NewTransactionDTO) => Promise<{ id: string, status: string }>
}

export type NewTransactionDTO = {
    amount: number,
    type: string
}