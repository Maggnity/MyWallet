import { User } from "../../types/User";

export interface IGetUser {


    execute: (token: string) => Promise<User | null>


}