import {  Request, Response } from "express"
import AppError from "../errors/app.error"
import { ValidationError } from "yup"
import { HttpStatus } from "./enums"
import { JsonWebTokenError } from "jsonwebtoken"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

const handleError = (err: unknown, req: Request, res: Response) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    if(err instanceof ValidationError) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            message: err.errors[0]
        })
    }

    if(err instanceof JsonWebTokenError) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            message: 'Token inválido'
        })
    }

    if(err instanceof PrismaClientKnownRequestError) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            message: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: `Internal server error`
    })
}

export default handleError