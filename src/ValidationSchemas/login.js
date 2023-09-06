import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Escribe un correo valido')
        .required('El correo es requerido'),
    password: yup
        .string()
        .min(5, 'Es muy corto')
        .max(1000, 'Es muy largo')
        .required('La constraseña es obligatoria')
})