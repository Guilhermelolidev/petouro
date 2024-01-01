import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export interface PayloadJwt {
    id: number
    iat?: number;
    exp?: number
}

export const hashPassword = (possword: string) => {
    
    const salt = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(possword, salt)

    return hash
}

export const verifyPassword = (possword: string, currentPassword: string) => {
    return bcrypt.compareSync(possword, currentPassword)
}

export const generateToken = (payload: PayloadJwt) => {
    return jwt.sign(payload, process.env.SECRET ?? '', {
        expiresIn: '10s'
    })
}