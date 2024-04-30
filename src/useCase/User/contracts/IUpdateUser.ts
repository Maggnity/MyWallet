import { User } from "../../types/User";

export class IUpdateUser {
    execute: (data: User) => Promise<{
        name: string,
        id: string,
        email: string
    }>;
}