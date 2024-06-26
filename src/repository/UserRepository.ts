import { user } from "@prisma/client";
import { prisma } from "../app";
import { IUserRepository } from "./contracts/IUserRepository";
import { v4 as uuidv4 } from 'uuid'
import { CreateUserDTO } from "../types/User";

export default class UserRepository implements IUserRepository {

    constructor() { }

    async createUser(data: CreateUserDTO): Promise<{
        email: string,
        id: string,
        name: string
    }> {

        const response = await prisma.user.create({
            data: {
                id:  uuidv4(),
                email: data.email,
                name: data.name,
                password: data.password,
                created_date: data.created_date
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return response

    }

    async findUserWithToken(token: string): Promise<Partial<user> | null> {

        const response = await prisma.user.findUnique({
            where: {
                id: token
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })

        return response
    }

    async findUserWithEmail(email: string): Promise<user | null> {


        const response = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        return response
    }

    async updateUser(data: user) {


        const response = await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                email: data.email,
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return response
    }
};
