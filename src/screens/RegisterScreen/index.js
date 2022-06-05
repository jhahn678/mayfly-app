import { StyleSheet, View } from 'react-native'
import { Input, FAB } from '@rneui/themed'
import { useEffect, useReducer } from 'react'
import { formReducer } from './formReducer'

const initialState = {
    firstName: { value: '', isTouched: false, isValid: false, error: null },
    lastName: { value: '', isTouched: false, isValid: false, error: null },
    email: { value: '', isTouched: false, isValid: false, error: null },
    password: { value: '', isTouched: false, isValid: false, error: null },
    passwordConfirm: { value: '', isTouched: false, isValid: false, error: null },
    form: { isValid: false }
}

const RegisterScreen = ({ navigation }) => {

    const [formState, dispatch] = useReducer(formReducer, initialState)

    useEffect(() => {
        dispatch({ type: 'FORM_VALIDATE' })
    }, [
        formState.firstName.isValid, 
        formState.lastName.isValid, 
        formState.email.isValid, 
        formState.password.isValid, 
        formState.passwordConfirm.isValid
    ])
    

    const handleRegister = async () => {
        const { email, password, firstName, lastName } = formState;
        console.log(email, password, firstName, lastName)
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Input placeholder='First name' value={formState.firstName.value} onChangeText={value => dispatch({ type: 'FIRSTNAME', value: value})}/>
                <Input placeholder='Last name' value={formState.lastName.value} onChangeText={value => dispatch({ type: 'LASTNAME', value: value})}/>
                <Input placeholder='Email' value={formState.email.value} onChangeText={value => dispatch({ type: 'EMAIL', value: value})} errorMessage={formState.email.error}/>
                <Input placeholder='Password' value={formState.password.value} onChangeText={value => dispatch({ type: 'PASSWORD', value: value})} errorMessage={formState.password.error}/>
                <Input placeholder='Password Confirmation' value={formState.passwordConfirm.value} onChangeText={value => dispatch({ type: 'PASSWORD_CONFIRM', value: value})} errorMessage={formState.passwordConfirm.error}/>
                <FAB title='Get started' onPress={handleRegister} disabled={!formState.form.isValid}/>
            </View>
        </View>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffef3',
        height: '100%'
    },
    form: {
        width: '80%',
        display: 'flex',
        alignSelf: 'center',
        marginTop: '20%'
    }
})