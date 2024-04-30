import { account } from "@prisma/client";
import { AccountFilters } from "../../../types/Account";

export interface IGetAvailableAccountsByUserID {

    execute: (userID: string, filters?: AccountFilters) => Promise<{data:Partial<account>[], results: number}>

}