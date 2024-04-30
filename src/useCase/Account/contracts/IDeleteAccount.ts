export interface IDeleteAccount {

    execute: (userID: string, aid: string) => Promise<void>

}