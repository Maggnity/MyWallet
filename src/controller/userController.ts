import express, { response } from 'express'
import { IUserRepository } from '../repository/IUserRepository'
import { IGetUser } from '../useCase/contracts/IGetUser'
import { ICreateUser } from '../useCase/contracts/ICreateUser'
import BaseController from './baseController'
import { IUpdateUser } from '../useCase/contracts/IUpdateUser'

export class userController extends BaseController {

    constructor(
        private getUser: IGetUser,
        private createUser: ICreateUser,
        private updateUserUseCase: IUpdateUser
    ) { super() }


    async getUserById(req: express.Request, res: express.Response) {

        try {

            const token = req.body.token

            const response = await this.getUser.execute(token)

            this.ok(res, response)

        } catch (error) {
            this.fail(res, error)
        }
    }

    async createNewUser(req: express.Request, res: express.Response) {

        try {
            const data = req.body

            await this.createUser.execute(data)
            this.ok(res, response)
        } catch (error) {
            this.fail(res, error)
        }
    }

    async updateUser(req: express.Request, res: express.Response) {

        try {
            const data = req.body

            await this.updateUserUseCase.execute(data)
            this.ok(res, response)
        } catch (error) {
            this.fail(res, error)
        }
    }
}