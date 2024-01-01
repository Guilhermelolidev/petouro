import { prisma } from "../../../configs/database/prisma-client";
import AppError from "../../../shared/errors/app.error";
import { convertData } from "../../../shared/utils/convertData";
import { HttpStatus } from "../../../shared/utils/enums";
import { clientService } from "../../client/services/client.service";
import { AnimalDto, AnimalResponse, Gender, Query } from "../types/animal";

class AnimalService {

    query() {
        return prisma.animal
    }

    async create(animalDto: AnimalDto, account: number): Promise<AnimalResponse> {

        const { date_birth, vaccines, ...rest } = animalDto

        await clientService.findById(animalDto.id_tutor, account)

        if (!this.verifyGender(animalDto.gender)) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'O valor do campo Gender não existe no enum!')
        }

        const newAnimal = {
            ...rest,
            id_account: account,
            date_birth: convertData(date_birth)
        }

        const animal = await this.query().create({
            data: newAnimal
        })

        if (vaccines && vaccines.length > 0) {
            await prisma.vaccine.createMany({
                data: vaccines.map(item => ({
                    ...item,
                    id_animal: animal.id,
                    application_date: convertData(item.application_date),
                    next_date: convertData(item.next_date),
                }))
            })
        }

        return animal

    }

    async list(query: Query, account: number): Promise<AnimalResponse[]> {

        const limit = Number(query.limit) || 10

        const page = Number(query.page) || 1

        return await this.query().findMany({
            where: {
                id_account: account,
                petname: {
                    mode: 'insensitive',
                    contains: query.petname
                }
            },
            include: {
                vaccines: true
            },
            take: limit,
            skip: (page - 1) * limit
        })

    }

    async update(id: number, animalDto: AnimalDto, account: number) {

        await this.findById(id, account)

        await clientService.findById(animalDto.id_tutor, account)

        if (!this.verifyGender(animalDto.gender)) {
            throw new AppError(HttpStatus.BAD_REQUEST, 'O valor do campo Gender não existe no enum!')
        }

        const { date_birth, vaccines, ...rest } = animalDto

        const animal = {
            ...rest,
            date_birth: new Date(date_birth),
        }

        const animalUpdated = await this.query().update({
            where: { id },
            data: animal
        })

        if (vaccines && vaccines.length > 0) {
            for (let i = 0; i < vaccines.length; i++) {
                const { id, application_date, next_date, ...rest } = vaccines[i]

                await this.findById(vaccines[i].id_animal, account)

                const newData = {
                    ...rest,
                    application_date: convertData(application_date),
                    next_date: convertData(next_date),
                }

                await prisma.vaccine.update({
                    where: { id },
                    data: newData
                })
            }
        }

        return animalUpdated

    }

    async remove(id: number, account: number): Promise<void> {

        await this.findById(id, account)

        await this.query().delete({
            where: { id, id_account: account }
        })

    }

    async findById(id: number, account: number): Promise<AnimalResponse> {

        const animal = await this.query().findUnique({
            where: { id, id_account: account },
            include: {
                tutor: true,
                vaccines: true
            }
        })

        if (!animal) {
            throw new AppError(HttpStatus.NOT_FOUND, `Animal de id: ${id} não foi encontrado`)
        }

        return animal

    }

    verifyGender(value: string): boolean {
        return Object.values(Gender).includes(value as Gender)
    }
}

export const animalService = new AnimalService()