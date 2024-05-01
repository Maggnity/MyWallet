import { string } from "zod"

export interface AccountDTO {

    bank: number,
    agency: number,
    number: number,
    type: "current" | "savings"
}

export type CreateAccountDTO = {
    id: string | null
    bank: number,
    agency: number,
    number: number,
    type: "current" | "savings"

}

export type AccountFilters = {
    bank?: number,
    agency?: number,
    account?: number
}