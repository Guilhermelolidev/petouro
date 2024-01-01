import {object,string} from 'yup'

export const shemaCreateClient = object().shape({
    fullname: string().required('Fullname é um campo obrigatório'),
    email: string().required('E-mail é um campo obrigatório').email(),
    cpf: string().required('CPF é um campo obrigatório').min(11).max(11),
    cep: string(),
    street: string().nullable(),
    house_number: string().nullable(),
    complement: string().nullable(),
    neighborhood: string().nullable(),
    city: string().nullable(),
    state: string().nullable(),
    obs: string().nullable(),
})