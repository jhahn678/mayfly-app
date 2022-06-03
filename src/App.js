import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, createTheme } from '@rneui/themed'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';

const theme = createTheme({
  // lightColors: {
  //   primary: '#547561',
  //   secondary: '#ffffcc'
  // },
  // darkColors: {
  //   primary: '#547561',
  //   secondary: '#ffffcc'
  // }
})


export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Sign In' component={LoginScreen}/>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Register' component={RegisterScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
