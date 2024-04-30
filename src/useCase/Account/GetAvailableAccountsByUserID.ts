import { account } from "@prisma/client";
import { IAccountRepository } from "../../repository/contracts/IAccountRepository";
import { AccountFilters } from "../../types/Account";
import { IGetAvailableAccountsByUserID } from "./contracts/IGetAvailableAccountsByUserID";

export class GetAvailableAccountsByUserID implements IGetAvailableAccountsByUserID {

    constructor(
        private accountRepository: IAccountRepository
    ) { }

    async execute(userID: string, filters?: AccountFilters): Promise<{ data: Partial<account>[], results: number }> {

        const response = await this.accountRepository.getAvailableAccountsByUserID(userID, filters)

        return response

    }
}