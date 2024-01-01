export type TClient = {
    id?: number
    fullname: string
    cpf:string
    email:string
    cep?:string
    street?:string
    house_number?:number
    complement?:string
    neighborhood?:string
    city?:string
    state?:string
    obs?:string
    active?: boolean
    created_at?: Date
}

export interface IQuery {
    fullname?: string
    active?: string
    limit?: number
    page?: number
}