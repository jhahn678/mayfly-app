import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import HomeScreen from '../../screens/HomeScreen'
import { useAuthContext } from '../../store/context/auth';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../styles/globalStyles';

const AppStack = () => {

    const Tab = createBottomTabNavigator();
    const { token } = useAuthContext()

    const client = new ApolloClient({
        uri: `${process.env.API_BASE_URL}/api`,
        cache: new InMemoryCache(),
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    
    return (
        <ApolloProvider client={client}>
            <Tab.Navigator 
                initialRouteName="Home" 
                screenOptions={{
                    tabBarActiveTintColor: '#FFFef3',
                    tabBarStyle: { position: 'absolute', height: 90, paddingTop: 12 },
                    tabBarBackground: () => (
                        <BlurView 
                            intensity={10} 
                            style={{ 
                                ...globalStyles.boxShadowTop,
                                backgroundColor: 'rgba(10, 53, 66, .6)', 
                                height: '100%'
                            }} 
                        />
                    )
                }}
            >
                <Tab.Screen name='Global' component={HomeScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (<IonIcon name='globe-outline' color={color} size={36}/>),
                    tabBarLabel: 'Global'
                }}/>
                <Tab.Screen name='Catches' component={HomeScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (<IonIcon name='list-outline' color={color} size={36}/>),
                    tabBarLabel: 'Catches'
                }}/>
                <Tab.Screen name='Places' component={HomeScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (<IonIcon name='map-outline' color={color} size={36}/>),
                    tabBarLabel: 'Places'
                }}/>
                <Tab.Screen name='Groups' component={HomeScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (<IonIcon name='people-outline' color={color} size={36}/>),
                    tabBarLabel: 'Groups'
                }}/>
            </Tab.Navigator>
        </ApolloProvider>
    )
}

export default AppStack;