import { ThemeProvider, createTheme } from '@rneui/themed'
import { AuthProvider } from './store/context/auth';
import { loadAsync } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import RootStack from './stacks';
import { useEffect, useState } from 'react';
import { ImageContextProvider } from './store/context/image';
import { SafeAreaView } from 'react-native'
import { Asset } from 'expo-asset';
import { StatusBar } from 'expo-status-bar';


const theme = createTheme({
  lightColors: {
    primary: '#353440',
    secondary: '#0eaaa7',
    tertiary: '#AA0E11',
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
      await Asset.loadAsync(require('../assets/paper-river.jpg'))
      await Asset.loadAsync(require('../assets/background-bottom.jpg'))
      await Asset.loadAsync(require('../assets/background-top.jpg'))
      await Asset.loadAsync(require('../assets/background-left.jpg'))
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
            <StatusBar style='auto'/>
            <RootStack/>
        </ImageContextProvider>
      </ThemeProvider>
    </AuthProvider> 
  );
}
