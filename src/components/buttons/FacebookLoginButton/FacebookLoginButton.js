import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import FacebookIcon from '../../icons/FacebookIcon'
import { useAuthContext } from '../../../store/context/auth';

WebBrowser.maybeCompleteAuthSession()

const FacebookLoginButton = ({ containerStyle, text, iconSize }) => {

    const { signIn } = useAuthContext()

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        expoClientId: process.env.FACEBOOK_APP_ID,
        responseType: ResponseType.Token,
        scopes: ['email', 'public_profile']
    })

    useEffect(() => {
        if(response?.type === 'success'){
            (async () => {
                try{
                    const { authentication } = response;
                    const { data } = await axios.post('/auth/facebook', {
                        token: authentication.accessToken
                    })
                    signIn(data.user, data.token)
                }catch(err){
                    alert('Something went wrong!')
                }
            })()
        }
    },[response])

    const handleFacebookLogin = async () => {
        promptAsync()
    }

    return (
        <TouchableOpacity style={{ ...styles.container, ...containerStyle}} 
            onPress={handleFacebookLogin} disabled={!request}
        >
            <FacebookIcon containerStyle={styles.icon} size={iconSize}/>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default FacebookLoginButton

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
    },
    button: {
        backgroundColor: 'none',
    }
})