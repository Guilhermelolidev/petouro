import { Request, Response } from "express";
import handleError from "../../../shared/utils/errorHandling";
import { authService } from "../services/auth.service";
import { HttpStatus } from "../../../shared/utils/enums";
import { schemaCreateAccount } from "../schemas/account.schema";
import { mapToDto } from "../dtos/signupDto";
import { retSuccessBody } from "../../../shared/utils/response";

export class AuthController {

    async signup(req: Request, res: Response) {

        try {
            
            await schemaCreateAccount.validate(req.body)

            const account = await authService.signup(req.body)

            return res.status(HttpStatus.CREATED).json(retSuccessBody('Conta criada com sucesso!', mapToDto(account)))

        } catch (err) {
            handleError(err, req, res)
        }
    }

    async signin(req: Request, res: Response) {

        try {

            await schemaCreateAccount.validate(req.body)

            const result = await authService.signin(req.body)

            return res.status(HttpStatus.OK).json(retSuccessBody('Autenticado com sucesso', result))

        } catch (err) {
            handleError(err, req, res)
        }
    }
}