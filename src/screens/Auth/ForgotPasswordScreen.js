import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Input, useTheme } from '@rneui/themed'
import AuthStackHeader from '../../components/headers/AuthStackHeader';
import IonIcon from 'react-native-vector-icons/Ionicons';
import axios from '../../utils/axios'
import { useNavigation } from '@react-navigation/core';
import AuthBackground from '../../components/backgrounds/AuthBackground';

const ForgotPasswordScreen = () => {

  const { theme } = useTheme()
  const navigation = useNavigation()
  const [email, setEmail] = useState('')

  const handleSendResetEmail = async () => {

  }

  const handleResetPassword = async () => {
  
  }

  return (
    <AuthBackground style={styles.container}>
           <AuthStackHeader title='Reset Password' showBackArrow 
            style={{ position: 'absolute', top: 0 }} titleStyle={{ fontSize: 28}}
           />
            <View style={styles.main}>
                <Input leftIcon={<IonIcon name='mail-outline' size={18} color='#0A3542'/>}  
                    onChangeText={value => setEmail(value)} 
                    label='Enter your email' inputStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    labelStyle={styles.inputLabel} value={email}
                />
                <TouchableOpacity onPress={handleSendResetEmail} disabled={email.length < 5}>
                    <Text style={ email.length < 5 ? styles.buttonDisabled : styles.button}>
                        Send reset email <Icon name='arrow-forward' size={18}/>
                    </Text>
                </TouchableOpacity>
            </View>
        </AuthBackground>
    )
}

export default ForgotPasswordScreen;

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
        fontSize: 18,
    },
    inputContainer: {
        borderBottomColor: '#0A3542',
        borderBottomWidth: 1,
        paddingTop: 8,
        
    },
    inputLabel: {
        color: '#0A3542',
        fontWeight: '400',
    }
})