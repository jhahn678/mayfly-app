import { nameSchema, passwordSchema, emailSchema } from "../../utils/yup-schemas";

export const formReducer = (state, action) => {
    if(action.type === 'EMAIL'){
        const { email } = state;
        email.value = action.value;
        email.isTouched = true;
        try{
            emailSchema.validateSync(action.value)
            email.isValid = true;
            email.error = null;
        }catch(err){
            email.isValid = false;
            email.error = err.message;
        }
        return{
            ...state,
            email
        }
    }else if(action.type === 'PASSWORD'){
        const { password } = state;
        password.value = action.value;
        password.isTouched = true;
        try{
            passwordSchema.validateSync(action.value)
            password.isValid = true;
            password.error = null;
        }catch(err){
            password.isValid = false;
            password.error = err.message;
        }
        return{
            ...state,
            password
        }
    }else if(action.type === 'PASSWORD_CONFIRM'){
        const { passwordConfirm, password} = state;
        passwordConfirm.value = action.value;
        passwordConfirm.isTouched = true;
        action.value === password.value ? passwordConfirm.isValid = true : passwordConfirm.isValid = false;
        action.value === password.value ? passwordConfirm.error = null : passwordConfirm.error = 'Passwords do not match'
        return{
            ...state,
            passwordConfirm
        }
    }else if(action.type === 'FIRSTNAME'){
        const { firstName } = state;
        firstName.value = action.value;
        firstName.isTouched = true;
        try{
            nameSchema.validateSync(action.value)
            firstName.isValid = true;
            firstName.error = null;
        }catch(err){
            firstName.isValid = false;
            firstName.error = err.message;
        }
        return{
            ...state,
            firstName
        }
    }else if(action.type === 'LASTNAME'){
        const { lastName } = state;
        lastName.value = action.value;
        lastName.isTouched = true;
        try{
            nameSchema.validateSync(action.value)
            lastName.isValid = true;
            lastName.error = null;
        }catch(err){
            lastName.isValid = false;
            lastName.error = err.message;
        }
        return{
            ...state,
            lastName
        }
    }else if(action.type === 'FORM_VALIDATE'){
        const { firstName, lastName, email, password, passwordConfirm, formStepOne } = state;
        if(
            firstName.isValid &&
            lastName.isValid && 
            email.isValid &&
            password.isValid && 
            passwordConfirm.isValid
        ){
            formStepOne.isValid = true;
        }else{
            formStepOne.isValid = false;
        }
        return {
            ...state,
            formStepOne
        }
    }else{
        return state;
    }
}