import * as yup from 'yup'
import { validarRUT } from './validarRUT'

export const loginValidationSchema = yup.object().shape({
    correo: yup
        .string()
        .email('Escribe un correo valido')
        .required('Es obligatorio el correo para registrarse'),
    contrasena: yup
        .string()
        .min(4, 'La contraseña es muy corta')
        .max(1000, 'Contraseña demasiado larga')
        .required('La constraseña es obligatoria'),
    rut: yup
        .string()
        .matches(/^[0-9]{7,8}-[0-9kK]$/, 'El rut debe tener el formato xxxxxxxx-x')
        .test('validar-rut','Rut no valido',validarRUT)
        .required('El rut es obligatorio')
})

