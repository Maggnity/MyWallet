import { IAccountRepository } from "../../repository/contracts/IAccountRepository";
import { AccountFilters } from "../../types/Account";

export class GetAvailableAccountsByUserID {

    constructor(
        private accountRepository: IAccountRepository
    ) { }

    async execute(userID: string, filters?: AccountFilters) {

        const response = await this.accountRepository.getAvailableAccountsByUserID(userID, filters)

        return response

    }
}