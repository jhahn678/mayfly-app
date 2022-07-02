import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Input, useTheme } from '@rneui/themed'
import AuthStackHeader from '../../../components/headers/AuthStackHeader';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useRegisterContext } from '../../../store/context/register'
import { useAuthContext } from '../../../store/context/auth';
import axios from '../../../utils/axios'
import { useNavigation } from '@react-navigation/core';
import AuthBackground from '../../../components/backgrounds/AuthBackground';

const RegisterScreenTwo = () => {

    const { theme } = useTheme()
    const { formState, dispatch } = useRegisterContext()
    const navigation = useNavigation()
    const { signIn } = useAuthContext()

    const handleRegister = async () => {
        try{
            const { firstName, lastName, email, username, password} = formState;
            const { data } = await axios.post('/auth/register', {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                username: username.value,
                password: password.value
            })
            await signIn(data.user, data.token)
        }catch(err){
            alert(err)
        }
        
    }

    return (
      <AuthBackground style={styles.container}>
           <AuthStackHeader title='Last Step' showBackArrow style={{ position: 'absolute', top: 0 }}/>
            <View style={styles.main}>
                <Input leftIcon={<IonIcon name='at' size={28} color='#0A3542'/>}  
                    onChangeText={value => dispatch({ type: 'USERNAME', value: value })} 
                    label='Choose a Username' inputStyle={styles.input}
                    inputContainerStyle={{...styles.inputContainer }}
                    labelStyle={{ ...styles.inputLabel }} value={formState?.username.value}
                    errorStyle={{ color: theme.colors.error, fontWeight: '500' }}
                    errorMessage={formState?.username.error}
                />
                <TouchableOpacity onPress={handleRegister} disabled={!formState?.username.unique || !formState?.username.isValid}>
                    <Text style={(!formState?.username.unique || !formState?.username.isValid) ? styles.buttonDisabled : styles.button}>
                        Get Started <Icon name='arrow-forward' size={18}/>
                    </Text>
                </TouchableOpacity>
            </View>
        </AuthBackground>
    )
}

export default RegisterScreenTwo

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width: '90%',
        display: 'flex',
        alignItems: 'flex-end',
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 6,
        elevation: 12,
        shadowOffset: { height: 6 },
        backgroundColor: '#fefefe',
        paddingVertical: 24,
        paddingHorizontal: 12,
        borderRadius: 12
    },
    button: {
        fontSize: 18,
        marginTop: 16,
        marginRight: 12
    },
    buttonDisabled: {
        fontSize: 18,
        marginTop: 16,
        marginRight: 12,
        color: 'rgb(180,180,180)'
    },
    input: {
        fontSize: 24,
    },
    inputContainer: {
        borderBottomColor: '#0A3542',
        borderBottomWidth: 1,
        paddingTop: 8,
        
    },
    inputLabel: {
        color: '#0A3542',
        fontWeight: '400'
    }
})