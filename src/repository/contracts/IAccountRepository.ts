import { account } from "@prisma/client";
import { AccountDTO } from "../../types/Account";

export interface IAccountRepository {


    getAvailableAccountsByUserID: (
        userID: string,
        filters?: {
            bank?: number,
            agency?: number,
            account?: number
        }
    ) => Promise<{ data: Partial<account>[], results: number }>

    getAvailableAccount: (
        userID: string,
        bank: number,
        account: number,
        agency: number
    ) => Promise<Partial<account> | null>

    updateBalance: (aid: account["id"], amount: number) => Promise<{ balance: account["balance"]}>
    getAvailableAccountById: (
        id: account["id"],
    ) => Promise<Partial<account> | null>

    createAccount: (userID: string, data: AccountDTO) => Promise<account>

    updateAccount: (userID: string, aid: account["id"], data: AccountDTO) => Promise<Partial<account>>

    deleteAccount: (userID: string, aid: account["id"]) => Promise<void>

}