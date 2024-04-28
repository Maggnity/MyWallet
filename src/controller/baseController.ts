import express from 'express'
import { ZodIssue } from 'zod'

abstract class BaseController {
    constructor() { }

    ok(response: express.Response, data: any) {

        return response.status(200).json(data);
    }

    fail(response: express.Response, error: any) {

        if (error.name === 'ZodError') {

            const message = error.issues.map((error: ZodIssue) => `${error.path.toString()}: ${error.message}`).toString()
            return response.status(500).json({ message: message });
        } else {
            console.log(error);
            
            return response.status(500).json({ 
                ok: false,
                error: {
                    message:error.message
                } 
            });
        }
    }

    required(value: any, error: any) {
        if (value) {
            return value;
        } else {
            throw new Error(error);
        }
    }
}

export default BaseController