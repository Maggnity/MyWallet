import { Router } from "express"
import { userController } from "../controller/userController"
import getUserUseCase from "../useCase/User/GetUserByEmail"
import UserRepository from "../repository/UserRepository"
import CreateUser from "../useCase/User/CreateUser"
import { UpdateUser } from "../useCase/User/UpdateUser"

export const user = () => {


    const routes = Router()


    const repo = new UserRepository()
    const getUser = new getUserUseCase(repo)
    const createUser = new CreateUser(repo)
    const updateUser = new UpdateUser(repo)

    const controller = new userController(getUser, createUser, updateUser)

    routes.get('/user', (req, res) => controller.getUserById(req, res))

    routes.post('/user', (req, res) => controller.createNewUser(req, res))

    routes.put('/user', (req, res) => controller.updateUser(req, res))

    return routes

}