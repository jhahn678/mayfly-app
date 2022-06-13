import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../styles/globalStyles';
import GlobalStack from './GlobalStack';
import PlacesStack from './PlacesStack'
import CatchesStack from './CatchesStack'
import GroupsScreen from '../../screens/Groups/GroupsScreen';
import FontelloIcon from '../../components/icons/Fontello';

const AppTabs = () => {

    const Tab = createBottomTabNavigator();
    
    return (
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
            <Tab.Screen name='Global' component={GlobalStack} options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (<FontelloIcon name='earth' color={color} size={48}/>),
                tabBarLabel: 'Global'
            }}/>
            <Tab.Screen name='Catches' component={CatchesStack} options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (<FontelloIcon name='fish' color={color} size={52}/>),
                tabBarLabel: 'Catches'
            }}/>
            <Tab.Screen name='Places' component={PlacesStack} options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (<FontelloIcon name='map' color={color} size={32}/>),
                tabBarLabel: 'Places'
            }}/>
            <Tab.Screen name='Groups' component={GroupsScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (<IonIcon name='people-outline' color={color} size={36}/>),
                tabBarLabel: 'Groups'
            }}/>
        </Tab.Navigator>
    )
}

export default AppTabs;