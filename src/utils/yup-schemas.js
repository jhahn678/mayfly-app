import { string } from 'yup'

export const nameSchema = string().required('Field is required').trim().min(2, 'Minimum length of two characters')

export const emailSchema = string().email('Valid email required')

export const passwordSchema = string().min(8, 'Minimum 8 characters required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'At least one uppercase and number required')