import { user } from "@prisma/client";
import { CreateUserDTO, User } from "../../types/User";

export interface IUserRepository {


    findUserWithToken: (token: string) => Promise<Partial<user> | null>
    findUserWithEmail: (email: string) => Promise<user | null>

    createUser: (data: CreateUserDTO) => Promise<{
        id: string,
        email: string,
        name: string
    }>;
    updateUser: (data: user) => Promise<{
        id: string,
        email: string,
        name: string
    }>;
}