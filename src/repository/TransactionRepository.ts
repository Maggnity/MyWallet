import { account, transactions } from "@prisma/client";
import { prisma } from "../app";
import { v4 as uuidv4 } from 'uuid'
import { ITransactionRepository, NewTransactionDTO, TransactionDAO } from "./contracts/ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {


    constructor() { }


    async newTransaction(aid: account["id"], data: NewTransactionDTO): Promise<{
        id: transactions["id"],
        status: transactions["status"],
        type: transactions["type"]
    }> {


        const response = await prisma.transactions.create({
            data: {
                id: uuidv4(),
                amount: data.amount,
                aid,
                type: data.type,
                category: data.category,
                name: data.name,
                description: data.description,
                status: "pending",
                created_at: new Date()
            },
            select: {
                id: true,
                status: true,
                type: true
            }
        })
        return response
    }

    async getTransactionById(tid: transactions["id"]): Promise<TransactionDAO | null> {


        const response = await prisma.transactions.findUnique({
            where: {
                id: tid
            },
            select: {
                id: true,
                amount: true,
                name: true,
                description: true,
                category: true,
                status: true,
                type: true,
                created_at: true
            }
        })

        return response
    }

    
    async updateTransaction(id: transactions["id"], data: NewTransactionDTO): Promise<TransactionDAO> {


        const response = await prisma.transactions.update({

            data: {
                amount: data.amount,
                category: data.category,
                description: data.description,
                name: data.name,
                updated_at: new Date()
            },
            where: {
                id
            },
            select: {
                id: true,
                status: true,
                name: true,
                description: true,
                category: true,
                amount: true,
                created_at: true,
                type: true
            }
        })
        return response
    }
}