import { cards } from "@prisma/client";

export interface CreateCardDTO {

    number: string;
    name: string;
    flag: string;
    cvv: string;
    type: string;
}
