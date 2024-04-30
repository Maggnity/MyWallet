import { AccountDTO, AccountFilters } from "../types/Account";
import { IAccountRepository } from "./contracts/IAccountRepository";
import { v4 as uuidv4 } from 'uuid'

import { prisma } from "../app";
import { account } from "@prisma/client";
import { Query } from "../database/connectionManager";
import connection from "../database";

export default class AccountRepository implements IAccountRepository {

    constructor() { }

    async getAvailableAccountsByUserID(
        userID: string,
        filters?: AccountFilters
    ): Promise<{ data: Partial<account>[]; results: number; }> {

        const response = await prisma.account.findMany({
            where: {
                user_id: userID,
                bank: filters?.bank
            },

            select: {
                agency: true,
                account: true,
                bank: true,
                id: true,
                type: true,
                user_id: true
            }
        })
        const countQuery = await prisma.account.count({
            where: {
                user_id: userID
            }
        })


        return { data: response, results: countQuery }
    }

    async getAvailableAccount(
        userID: string,
        bank: number,
        account: number,
        agency: number
    ): Promise<Partial<account> | null> {

        const response = await prisma.account.findFirst({
            where: {
                user_id: userID,
                account,
                bank,
                agency
            },
            select: {
                account: true,
                agency: true,
                bank: true,
            }

        })
        return response
    }

    async getAvailableAccountById(
        aid: string,
    ): Promise<Partial<account> | null> {

        const response = await prisma.account.findUnique({
            where: {
                id: aid
            },
            select: {
                account: true,
                agency: true,
                bank: true,
            }

        })
        return response
    }
    async createAccount(userID: string, data: AccountDTO): Promise<account> {


        const response = await prisma.account.create({
            data: {
                id: uuidv4(),
                account: data.number,
                agency: data.agency,
                bank: data.bank,
                type: data.type,
                user_id: userID,
                created_at: new Date()
            },
        })

        return response
    }



    async updateAccount(userID: string, aid: string, data: AccountDTO): Promise<account> {


        const response = await prisma.account.update({
            data: {
                account: data.number,
                agency: data.agency,
                bank: data.bank,
                type: data.type,
                updated_at: new Date()
            },
            where: {
                id: aid,
                user_id: userID
            }
        })

        return response
    }

    async deleteAccount(userID: string, aid: string): Promise<void> {

        await prisma.account.delete({
            where: {
                id: aid,
                user_id: userID
            }
        })
        return
    }
};
