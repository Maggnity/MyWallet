import { account } from "@prisma/client";

export interface IUpdateAccount {
    execute: (userID: string, aid: string, data) => Promise<Partial<account>> 
}