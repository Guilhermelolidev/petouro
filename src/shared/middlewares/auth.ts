import { NextFunction, Request, Response, response } from "express";
import * as jwt from 'jsonwebtoken'
import AppError from "../errors/app.error";
import { HttpStatus } from "../utils/enums";
import { AuthService } from "../../modules/auth/services/auth.service";
import { PayloadJwt } from "../utils/auth";
import handleError from "../utils/errorHandling";
import { secret } from "../../configs/environment/environment.config";

export const ensureAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        const authService = new AuthService()

        const result = jwt.verify(getToken(req), secret) as PayloadJwt

        const account = await authService.findById(result.id)

        if(!account) {
            throw new AppError(HttpStatus.UNAUTHORIZED, 'Usuário não cadastrado')
        }

        req.account = result.id

        next()
    } catch (err) {
        handleError(err, req,res)
    }
} 

const getToken = (req: Request) => {

    const { authorization } = req.headers

    if(!authorization) {
        throw new AppError(HttpStatus.UNAUTHORIZED, 'Acesso negado. Nenhum token encontrado')
    }

    const token = authorization.split(" ")[1]

    return token
}