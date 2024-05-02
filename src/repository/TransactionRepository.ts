import { account, transactions } from "@prisma/client";
import { prisma } from "../app";
import { v4 as uuidv4 } from 'uuid'
import { ITransactionRepository, NewTransactionDTO } from "./contracts/ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {


    constructor() { }


async newTransaction(aid: account["id"], data: NewTransactionDTO): Promise<{id: transactions["id"], status: transactions["status"]}> {


        const response = await prisma.transactions.create({
            data: {
                id: uuidv4(),
                amount: data.amount,
                aid,
                type: data.type,
                status: "pending", 
                created_at: new Date()
            },
            select: {
                id: true,
                status: true
            }
        })
        return response
    }
}