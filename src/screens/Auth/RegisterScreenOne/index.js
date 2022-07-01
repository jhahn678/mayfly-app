import { StyleSheet, View, Text } from 'react-native'
import { FAB } from '@rneui/themed'
import AuthStackHeader from '../../../components/headers/AuthStackHeader';
import { BlurView } from 'expo-blur';
import IonIcon from 'react-native-vector-icons/Ionicons';
import IconInput from '../../../components/inputs/IconInput';
import GoogleLoginButton from '../../../components/buttons/GoogleLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../../components/buttons/FacebookLoginButton/FacebookLoginButton';
import { useRegisterContext } from '../../../store/context/register'
import { useNavigation } from '@react-navigation/core';
import AuthBackground from '../../../components/backgrounds/AuthBackground';


const RegisterScreenOne = () => {

    const navigation = useNavigation()

    const handleNextStep = async () => {
        navigation.navigate('Choose Username')
    }
    
    const { formState, dispatch } = useRegisterContext()

    return (
        <AuthBackground style={styles.container}>
            <AuthStackHeader navigation={navigation} title='Sign Up' showBackArrow/>
            <View style={styles.main}>
                <View style={styles.form}>
                    <IconInput 
                        Icon={<IonIcon name='person-outline' size={28}/>} 
                        value={formState?.firstName.value} 
                        setValue={value => dispatch({ type: 'FIRSTNAME', value: value })} 
                        label='First name' containerStyle={styles.input}
                        isError={formState?.firstName.error}
                        error={formState?.firstName.error}
                    />
                    <IconInput 
                        Icon={<IonIcon name='person-outline' size={28}/>} 
                        value={formState?.lastName.value} 
                        setValue={value => dispatch({ type: 'LASTNAME', value: value})} 
                        label='Last name' containerStyle={styles.input}
                        isError={formState?.lastName.error}
                        error={formState?.lastName.error}
                    />
                    <IconInput 
                        Icon={<IonIcon name='mail-outline' size={28}/>} 
                        value={formState?.email.value} 
                        setValue={value => dispatch({ type: 'EMAIL', value: value})} 
                        label='Email' containerStyle={styles.input}
                        isError={formState?.email.isTouched && formState?.email.error}
                        error={formState?.email.isTouched && formState?.email.error}
                    />
                    <IconInput 
                        Icon={<IonIcon name='lock-closed-outline' size={28}/>} 
                        value={formState?.password.value} 
                        setValue={value => dispatch({ type: 'PASSWORD', value: value})} 
                        label='Password' containerStyle={styles.input}
                        isError={formState?.password.error}
                        error={formState?.password.error}
                    />
                    <FAB title='Next' 
                        onPress={handleNextStep} 
                        disabled={!formState?.formStepOne.isValid} 
                        containerStyle={styles.buttonContainer} 
                        buttonStyle={styles.button}
                        disabledStyle={styles.buttonDisabled}
                    />
                    <View style={styles.providerButtonContainer}>
                        <GoogleLoginButton iconSize={36} containerStyle={{ width: 150 }}/>
                        <FacebookLoginButton iconSize={36} containerStyle={{ width: 150 }}/>
                    </View>
                </View>
            </View>
        </AuthBackground>
    )
}

export default RegisterScreenOne;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    main: {
        height: '70%',
        width: '100%',
        marginBottom: '20%',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '20%',
    },
    form: {
        width: '80%',
        display: 'flex',
        alignSelf: 'center',
    },
    buttonContainer: {
        marginTop: 8,
        width: '100%',
        borderRadius: 8
    },
    button: {
        backgroundColor: '#0A3542',
        color: '#FFFEF3'
    },
    input: {
        marginBottom: 6
    },
    providerButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    }
})