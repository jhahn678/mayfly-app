import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {  Button } from '@rneui/themed';
import axios from '../../utils/axios'
import { useAuthContext } from '../../store/context/auth'
import AuthStackHeader from '../../components/headers/AuthStackHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import IconInput from '../../components/inputs/IconInput';
import GoogleLoginButton from '../../components/buttons/GoogleLoginButton/GoogleLoginButton';
import FacebookLoginButton from '../../components/buttons/FacebookLoginButton/FacebookLoginButton';
import AuthBackground from '../../components/backgrounds/AuthBackground';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidden, setHidden] = useState(true)

  const { signIn } = useAuthContext()

  const handleLogin = async () => {
    try{
      const { data } = await axios.post('/auth/login', { email, password })
      await signIn(data.user, data.token)
    }catch(err){
      alert(err)
    }
  }
  
  return (
      <AuthBackground style={styles.container}>
        <AuthStackHeader title='Sign in' />
        <View intensity={10} style={styles.main}>
          <View style={styles.form}>
            <IconInput Icon={<Icon name='mail-outline' size={28}/>} 
              value={email}
              setValue={setEmail}
              label='Email'
            />
            <IconInput 
              Icon={
                <Icon name={hidden ? 'lock-closed-outline' : 'lock-open-outline'} 
                  size={28}
                  onPress={() => setHidden(h => !h)}
                />
              } 
              value={password}
              setValue={setPassword}
              label='Password'
              containerStyle={styles.bottomInput}
              isPassword={hidden}
            />
            <Button
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.button}
              title='Sign In'
              onPress={handleLogin}
              color='#0A3542'
            />
            <View style={styles.providerButtonContainer}>
                <GoogleLoginButton iconSize={36} containerStyle={{ width: 150 }}/>
                <FacebookLoginButton iconSize={36} containerStyle={{ width: 150 }}/>
            </View>
            <View style={styles.altAuthPrompts}>
              <TouchableOpacity onPress={() => navigation.navigate('Choose Username')}>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
              <Text style={styles.noAccount}>Don't have an account? 
                <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                    <Text style={styles.getStarted}>Get started</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </AuthBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden'
    },
    main: {
      height: '65%',
      width: '100%',
      marginBottom: '30%',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '25%',
      shadowColor: 'rgb(0,0,0)',
      shadowOpacity: .2,
      shadowRadius: 2,
      shadowOffset: { height: 1 },
    },
    form: {
      width: '80%',
      display: 'flex'
    },
    providerButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24
    },
    buttonContainer: {
      marginTop: 12,
      width: '100%',
      borderRadius: 8
    },
    button: {
      color: '#FEFEFE',
      paddingVertical: 12
    },
    bottomInput: {
      marginTop: 12
    },
    altAuthPrompts: {
      display: 'flex',
      marginTop: 24
    },
    forgotPassword: {
      fontSize: 14,
      fontWeight: '500',
      padding: 0,
      color: '#fefefe'
    },
    noAccount: {
      fontSize: 12,
      marginTop: 12,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      color: '#fefefe'
    },
    getStarted: {
      height: 14,
      marginLeft: 5,
      fontSize: 14,
      fontWeight: '500',
      color: '#fefefe'
    }
})