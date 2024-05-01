import { account, cards } from "@prisma/client";
import { prisma } from "../app";
import { CreateCardDTO } from "../types/Cards";
import { ICardRepository } from "./contracts/ICardRepository";

export class CardRepository implements ICardRepository {


    constructor() {

    }


    async getCardsByAccount(accountNumber: number) {

        const response = await prisma.cards.findMany({
            where: {
                account: accountNumber
            },
            select: {
                name: true,
                number: true,
                type: true
            }
        })

        const results = await prisma.cards.count({
            where: {
                account: accountNumber
            }
        })

        return { data: response, results }

    }

    async createCard(account: account["account"], data: CreateCardDTO): Promise<Partial<cards>> {
        const response = await prisma.cards.create({
            data: {
                created_at: new Date(),
                account,
                ...data
            },
            select: { id: true }
        })

        return response
    }


}