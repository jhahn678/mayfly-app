import { createContext, useContext, useState, useEffect } from 'react'
import axios from '../../utils/axios'
import * as SecureStore from 'expo-secure-store'

const initialState = {
    isSignedIn: false,
    user: {},
    token: '',
    signIn: async (user, token) => {},
    signOut: async () => {}
}

const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {

    const [isSignedIn, setIsSignedIn] = useState(false)
    const [user, setUser] = useState({})
    const [token, setToken] = useState('')

    useEffect(() => {
        (async () => {
            const token = await SecureStore.getItemAsync('ACCESS_TOKEN')
            if(token){
                const { data } = await axios.get(`/auth/me?token=${token}`)
                setUser(data.user)
                setToken(token)
                setIsSignedIn(true)
            }
        })()
    },[])

    const signIn = async (user, token) => {
        await SecureStore.setItemAsync('ACCESS_TOKEN', token)
        setIsSignedIn(true)
        setUser(user)
        setToken(token)
    }

    const signOut = async () => {
        await SecureStore.deleteItemAsync('ACCESS_TOKEN')
        setIsSignedIn(false)
        setUser({})
        setToken('')
    }

    return(
        <AuthContext.Provider value={{ 
            isSignedIn, user, token,
            signIn, signOut
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)