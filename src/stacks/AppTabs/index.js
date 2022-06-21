import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons'
import ExploreStack from './ExploreStack'
import GroupsScreen from '../../screens/Groups/GroupsScreen';
import FontelloIcon from '../../components/icons/Fontello';
import CatchesScreen from '../../screens/Catches/CatchesScreen';
import PlacesScreen from '../../screens/Places/PlacesScreen';

const AppTabs = () => {

    const Tab = createBottomTabNavigator();
    
    return (
        <Tab.Navigator 
            initialRouteName="Home" 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#0eaaa7',
                tabBarStyle: { position: 'absolute', height: 80 }
            }}
        >
            <Tab.Screen name='Explore' component={ExploreStack} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='earth' color={color} size={32}/>),
                tabBarShowLabel: false,
                tabBarLabel: 'Explore'
            }}/>
            <Tab.Screen name='Catches' component={CatchesScreen} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='fish' color={color} size={40}/>),
                tabBarShowLabel: false,
                tabBarLabel: 'Catches'
            }}/>
            <Tab.Screen name='Places' component={PlacesScreen} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='map' color={color} size={32}/>),
                tabBarShowLabel: false,
                tabBarLabel: 'Places'
            }}/>
            <Tab.Screen name='Groups' component={GroupsScreen} options={{
                tabBarIcon: ({ color }) => (<IonIcon name='people-outline' color={color} size={32}/>),
                tabBarShowLabel: false,
                tabBarLabel: 'Groups',
            }}/>
        </Tab.Navigator>
    )
}

export default AppTabs;