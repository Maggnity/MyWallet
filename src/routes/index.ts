import { Router } from "express"
import { home } from "./home"
import { user } from "./user"

export const apiRouter = () => {
    
    const routes = Router()

    routes.use(home())
    routes.use(user())


    return routes
}

