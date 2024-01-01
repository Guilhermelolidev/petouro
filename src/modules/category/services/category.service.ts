import { prisma } from "../../../configs/database/prisma-client";
import AppError from "../../../shared/errors/app.error";
import { HttpStatus } from "../../../shared/utils/enums";
import { Category } from "../types/category";

class CategoryService  {

    private query() {
        return prisma.category
    }

    async create({ name }: Category, account: number): Promise<Category> {

        const category = await this.findByName(name, account)

        if(category) {
            throw new AppError(HttpStatus.BAD_REQUEST, `Categoria: ${name} já está cadastrada`)
        }

        const newCategory = await this.query().create({
            data: {
                name,
                id_account: account
            }
        })

        return newCategory
    }

    async list(account: number): Promise<Category[]> {
        return await this.query().findMany({
            where: { id_account: account }
        })
    }

    async remove(id: number, account: number): Promise<void> {

        const categoryExists = await this.findById(id, account)

        if(!categoryExists) {
            throw new AppError(HttpStatus.NOT_FOUND, 'Categoria não encontrada')
        }

        await this.query().delete({
            where: { id, id_account: account }
        })

    }

    async update(id: number, { name }: Category, account: number): Promise<Category> {

        const categoryExists = await this.findById(id, account)

        if(!categoryExists) {
            throw new AppError(HttpStatus.NOT_FOUND, 'Categoria não encontrada')
        }
        
        return await this.query().update({
            where: { id, id_account: account },
            data: { name }
        })

    }

    async findById(id: number, account: number): Promise<Category> {
        
        const category = await this.query().findFirst({
            where: { id, id_account: account }
        })

        if(!category) {
            throw new AppError(HttpStatus.NOT_FOUND, `Categoria de id: ${id} não foi encontrada`)
        }

        return category as Category

    }

    private async findByName(name: string, account: number) {

        const category = await this.query().findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                },
                id_account: account
            }
        })

        return category
    }

}

export const categoryService = new CategoryService()