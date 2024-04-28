import { Router } from "express"
import { userController } from "../controller/userController"
import getUserUseCase from "../useCase/GetUserByEmail"
import UserRepository from "../repository/UserRepository"
import CreateUser from "../useCase/CreateUser"

export const user = () => {


    const routes = Router()


    const repo = new UserRepository()
    const getUser = new getUserUseCase(repo)
    const createUser = new CreateUser(repo)

    const controller = new userController(getUser, createUser)

    routes.get('/user', (req, res) => controller.getUserById(req, res))

    routes.post('/user', (req, res) => controller.createNewUser(req, res))

    return routes

}