import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { FAB, Input } from '@rneui/themed';
import logo from '../../assets/mayfly-logo.png'

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
        setEmail('')
        setPassword('')
        navigation.navigate('Home')
  }
  
  return (
    <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <View style={styles.form}>
            <Input placeholder='Email' lable='Email' onChangeText={setEmail} value={email}/>
            <Input placeholder='Password' lable='Password' onChangeText={setPassword} value={password}/>
            <FAB
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            title='Sign In'
            onPress={handleLogin}
            />
        </View>
        <Text style={{ marginTop: 30 }}>Don't have an account? 
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.getStarted}>Get started</Text>
            </TouchableOpacity>
        </Text>
        <StatusBar style="auto"/>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffef3',
        alignItems: 'center',
        justifyContent: 'center',
      },
      form: {
        width: '80%',
        display: 'flex',
      },
      buttonContainer: {
        marginTop: 10,
        width: '50%'
      },
      button: {
        backgroundColor: '#547561'
      },
      logo: {
        height: 150,
        width: 150,
        marginBottom: '10%'
      },
      getStarted: {
        marginLeft: 5
      }
})