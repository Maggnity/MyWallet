import { account, cards } from "@prisma/client";
import { CreateCardDTO } from "../../types/Cards";

export class ICardRepository {



    getCardsByAccount: (account: account["account"]) => Promise<{ data: Partial<cards>[], results: number }>


    createCard: (account: account["account"], data: CreateCardDTO) => Promise<Partial<cards>>
}