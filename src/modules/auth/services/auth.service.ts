import { prisma } from "../../../configs/database/prisma-client";
import AppError from "../../../shared/errors/app.error";
import { generateToken, hashPassword, verifyPassword } from "../../../shared/utils/auth";
import { HttpStatus } from "../../../shared/utils/enums";
import { Account } from "../types/account";

export class AuthService {

    query() {
        return prisma.account
    }

    async signup({ email, password }: Account): Promise<Account> {

        const accountExists = await this.findByAccountEmail(email)

        if(accountExists) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Esse e-mail já está vinculado a uma conta')
        }
        
        return await this.query().create({
            data: {
                email,
                password: hashPassword(password)
            }
        })
    }

    async signin({ email, password }: Account) {

        const accountExists = await this.findByAccountEmail(email)

        if(!accountExists) {
            throw new AppError(HttpStatus.NOT_FOUND, 'Esse e-mail não está cadastrado')
        }

        const result = verifyPassword(password, accountExists.password)

        if(!result) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Senha inválida')
        }

        const token = generateToken({ id: accountExists.id })

        const {password: ps, ...rest} = accountExists

        return {
            ...rest,
            token
        }

    }

    async findByAccountEmail(email: string) {
        
        const account = await this.query().findFirst({
            where: {email}
        })  

        return account as Account
    }

    async findById(id: number) {
        
        const account = await this.query().findUnique({
            where: {id}
        })  

        return account as Account
    }

}

export const authService = new AuthService()