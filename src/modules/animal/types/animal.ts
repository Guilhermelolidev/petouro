export interface AnimalDto {
    petname: string
    specie: string
    breed: string
    gender: Gender
    id_tutor: number
    date_birth: Date
    general_registration?: number
    fathername?: string
    mothername?: string
    preferred_food?: string
    vaccines: Vaccine[]
}

interface Vaccine {
    id?: number
    vaccine: string
    doses: string
    period: string
    application_date: Date
    next_date: Date
    comments?: string
    id_account: number
    id_animal: number
}

export interface Query {
    petname?: string
    limit?: number
    page?: number
}

export interface AnimalResponse {
    id: number;
    petname: string;
    specie: string;
    breed: string;
    gender: string;
    date_birth: Date;
    general_registration: number | null;
    fathername: string | null;
    mothername: string | null;
    preferred_food: string | null;
    id_tutor: number;
    id_account: number;
}

export enum Gender {
    Male = 'Male',
    Female = 'Female'
}