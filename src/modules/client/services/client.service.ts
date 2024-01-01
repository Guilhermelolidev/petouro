import { prisma } from "../../../configs/database/prisma-client";
import AppError from "../../../shared/errors/app.error";
import { HttpStatus } from "../../../shared/utils/enums";
import { IQuery, TClient } from "../types/client";

class Service {

    query() {
        return prisma.client
    }

    async create({
        cpf,
        email,
        fullname,
        cep,
        city,
        complement,
        house_number,
        neighborhood,
        obs,
        state,
        street
    }: TClient, account: number): Promise<TClient> {

        const clientEmail = await this.findByEmailOrCpf(email, undefined, account)

        if (clientEmail) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Esse e-mail já está cadastrado')
        }

        const clientCpf = await this.findByEmailOrCpf(undefined, cpf, account)

        if (clientCpf) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Esse CPF já está cadastrado')
        }

        const newClient = await this.query().create({
            data: {
                cpf,
                email,
                fullname,
                cep,
                city,
                complement,
                house_number,
                neighborhood,
                obs,
                state,
                street,
                id_account: account
            }
        })

        return newClient as TClient
    }

    async findAll(
        query: IQuery,
        account: number
    ): Promise<TClient[]> {

        const limit = Number(query.limit) || 10

        const page = Number(query.page) || 1

        const convertActive = query.active === 'true' ? true : false

        return await this.query().findMany({
            where: {
                active: query.active === undefined ? undefined : convertActive,
                fullname: {
                    contains: query.fullname,
                    mode: 'insensitive'
                },
                id_account: account
            },
            select: {
                id: true,
                fullname: true,
                email: true,
                cpf: true,
                active: true
            },
            take: limit,
            skip: (page - 1) * limit
        }) as TClient[]
    }

    async update(
        id: number,
        {
            cpf,
            email,
            fullname,
            cep,
            city,
            complement,
            house_number,
            neighborhood,
            obs,
            state,
            street
        }: TClient,
        account: number
    ) {

        const clientExists = await this.query().findUnique({
            where: {
                id,
                id_account: account
            }
        })

        if (!clientExists) {
            throw new AppError(HttpStatus.NOT_FOUND, `Cliente de id: ${id} não foi encontrado`)
        }

        const clientCpf = await this.findByEmailOrCpf(undefined, cpf, account)

        if (clientCpf && id !== clientCpf.id) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Esse CPF já está cadastrado')
        }

        const clientEmail = await this.findByEmailOrCpf(email, undefined, account)

        if (clientEmail && id !== clientEmail.id) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'Esse e-mail já está cadastrado')
        }

        const client = await this.query().update({
            where: {
                id,
                id_account: account
            },
            data: {
                cpf,
                email,
                fullname,
                cep,
                city,
                complement,
                house_number,
                neighborhood,
                obs,
                state,
                street
            }
        })

        return client as TClient
    }

    async findById(id: number, account: number): Promise<TClient> {

        const client = await this.query().findUnique({
            where: { id, id_account: account }
        }) as TClient

        if (!client) {
            throw new AppError(HttpStatus.NOT_FOUND, `Cliente de id: ${id} não foi encontrado`)
        }

        return client
    }

    async remove(id: number, account: number): Promise<void> {

        const client = await this.query().findUnique({
            where: { id, id_account: account }
        })

        if (!client) {
            throw new AppError(HttpStatus.NOT_FOUND, `Cliente de id: ${id} não foi encontrado`)
        }

        await this.query().delete({
            where: { id, id_account: account }
        })
    }

    async activeClient(id: number, account: number): Promise<void> {

        const client = await this.query().findUnique({
            where: { id, id_account: account }
        })

        if (!client) {
            throw new AppError(HttpStatus.NOT_FOUND, `Cliente de id: ${id} não foi encontrado`)
        }

        await this.query().update({
            where: { id, id_account: account },
            data: {
                active: !client.active
            }
        })
    }

    async findByEmailOrCpf(email?: string, cpf?: string, account?: number): Promise<TClient> {

        const client = await this.query().findFirst({
            where: { email, cpf, id_account: account }
        })

        return client as TClient
    }

}

export const clientService = new Service()