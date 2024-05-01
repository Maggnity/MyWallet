import { User } from "../../../types/User";

export class ICreateUser {
    execute: (data: User) => Promise<{
        name: string,
        id: string,
        email: string
    }>;
}