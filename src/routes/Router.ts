import { Router } from "express"

export const apiRouterZuado = () => {

    const routes = Router()

    routes.get('/', (req, res) => {
        
        console.log(req)
        res.send('Hello World!')})

    return routes
}