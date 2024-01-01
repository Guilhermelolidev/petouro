import { object, string, date, number } from 'yup'

export const schemaAnimal = object().shape({
    petname: string().required('petname é um campo obrigatório').max(100),
    specie: string().required('specie é um campo obrigatório').max(50),
    breed: string().required('breed é um campo obrigatório').max(50),
    gender: string().required('gender é um campo obrigatório'),
    date_birth: date().required('date_birth é um campo obrigatório'),
    id_tutor: number().required('id_tutor é um campo obrigatório')
})