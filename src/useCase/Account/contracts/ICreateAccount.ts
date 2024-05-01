import { account } from "@prisma/client";
import { AccountDTO, CreateAccountDTO } from "../../../types/Account";

export interface ICreateAccount {


    execute: (userID: string, data: CreateAccountDTO) => Promise<account>
}