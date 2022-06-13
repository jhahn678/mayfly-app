import { ThemeProvider, createTheme } from '@rneui/themed'
import { AuthProvider } from './store/context/auth';
import { loadAsync } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import RootStack from './stacks';
import { useEffect, useState } from 'react';


const theme = createTheme({
  lightColors: {
    primary: '#0A3542',
    secondary: '#F4E5BE',
    brown: '#D19667',
    red: '#BA532E',
    green: '#4D4727',
    error: '#df2c0c'
  },
  
})

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false)

  const prepareApp = async () => {
    try{
      await SplashScreen.preventAutoHideAsync()
      await loadAsync({ 
        FontelloIcons: require('../assets/fonts/mayfly.ttf'),
      })
    }catch(err){
      console.warn(err)
    }finally{
      setAppIsReady(true)
    } 
  }

  useEffect(() => {
    prepareApp()
  },[])


  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync()
  }


  useEffect(() => {
    if(appIsReady) hideSplashScreen()
  },[appIsReady])


  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RootStack/>
      </ThemeProvider>
    </AuthProvider> 
  );
}
