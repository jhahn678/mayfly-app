import { ThemeProvider, createTheme } from '@rneui/themed'
import { AuthProvider } from './store/context/auth';
import { loadAsync } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import RootStack from './stacks';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageContextProvider } from './store/context/image';


const theme = createTheme({
  lightColors: {
    primary: '#353440',
    secondary: '#0eaaa7',
    tertiary: '#3ea9e2',
    white: '#fefefe',
    error: '#df2c0c'
  },
  
})

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false)

  const prepareApp = async () => {
    try{
      await SplashScreen.preventAutoHideAsync()
      await loadAsync({ 
        mayfly: require('../assets/fonts/mayfly.ttf'),
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
    if(appIsReady) {
      hideSplashScreen()
    }
  },[appIsReady])
  
  if(!appIsReady){
    return null;
  }


  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <ImageContextProvider>
          <StatusBar translucent={true} style='auto'/>
          <RootStack/>
        </ImageContextProvider>
      </ThemeProvider>
    </AuthProvider> 
  );
}
