import { ThemeProvider, createTheme } from '@rneui/themed'
import { AuthProvider } from './store/context/auth';
import RootStack from './stacks';


const theme = createTheme({
  lightColors: {
    primary: '#0A3542',
    secondary: '#F4E5BE',
    brown: '#D19667',
    red: '#BA532E',
    green: '#4D4727'
  }
})


export default function App() {

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RootStack/>
      </ThemeProvider>
    </AuthProvider>
  );
}
