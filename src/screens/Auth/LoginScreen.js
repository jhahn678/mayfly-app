import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
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

  const { width: screenWidth } = Dimensions.get('window')
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
        <AuthStackHeader title='Sign in' style={{ position: 'absolute', top: 0}}/>
        <View style={styles.main}>
            <IconInput Icon={<Icon name='mail-outline' size={24} />} 
              value={email}
              setValue={setEmail}
              label='Email'
            />
            <IconInput 
              Icon={
                <Icon name={hidden ? 'lock-closed-outline' : 'lock-open-outline'} 
                  size={24}
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
                <GoogleLoginButton iconSize={36} containerStyle={{ width: screenWidth*.39  }}/>
                <FacebookLoginButton iconSize={36} containerStyle={{ width: screenWidth*.39 }}/>
            </View>
        </View>
        <View style={styles.altAuthPrompts}>
            <TouchableOpacity onPress={() => navigation.navigate('Choose Username')}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                <Text style={styles.noAccount}>Create a new account
                  <Icon name='arrow-forward' size={16}/>
                </Text>
            </TouchableOpacity>
          </View>
      </AuthBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    main: {
      width: '80%',
      marginBottom: '30%',
      display: 'flex',
      paddingTop: '25%',
      shadowColor: 'rgb(0,0,0)',
      shadowOpacity: .2,
      shadowRadius: 2,
      shadowOffset: { height: 1 },
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
      position: 'absolute',
      bottom: 0,
      right: 0,
      alignItems: 'flex-end',
      paddingBottom: '15%',
      paddingRight: 36
    },
    forgotPassword: {
      fontSize: 14,
      fontWeight: '500',
      padding: 0
    },
    noAccount: {
      fontSize: 16,
      marginTop: 20,
      fontWeight: '500',
    }
})