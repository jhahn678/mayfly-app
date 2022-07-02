import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import GoogleIcon from '../../icons/GoogleIcon'
import axios from '../../../utils/axios'
import { ResponseType } from 'expo-auth-session'
import { useAuthContext } from '../../../store/context/auth' 

WebBrowser.maybeCompleteAuthSession();

const GoogleLoginButton = ({ containerStyle, text, iconSize }) => {


    const { signIn } = useAuthContext()

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: process.env.GOOGLE_EXPO_CLIENT_ID,
        responseType: ResponseType.IdToken
    })

    useEffect(() => {
        if(response?.type === 'success'){
            const { id_token } = response.params;
            (async () => {
                try{
                    const { data } = await axios.post('/auth/google', { token: id_token })
                    if(data.user?.username){
                        await signIn(data.user, data.token)
                    }else{
                        navigation.navigate('RegisterTwo', { token: data.token })
                    }
                }catch(err){
                    alert('Something went wrong!')
                }
            })()
        }
    },[response])

    const handleGoogleLogin = async () => {
        promptAsync()
    }
  
    return (
        <TouchableOpacity style={{ ...styles.container, ...containerStyle}} onPress={handleGoogleLogin}>
            <GoogleIcon containerStyle={styles.icon} size={iconSize}/>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default GoogleLoginButton

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#fefefe',
        color: '#0A3542',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 6,
        elevation: 12,
        shadowOffset: { height: 6 }
    }
})