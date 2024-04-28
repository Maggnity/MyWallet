import { Router } from "express"

export const home = () => {

    const routes = Router()

    routes.get('/', (req, res) =>  res.send("Olá senhor"))

    return routes
}