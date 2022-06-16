import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons'
import ExploreStack from './ExploreStack'
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
                headerShown: false,
                tabBarActiveTintColor: '#0eaaa7',
                tabBarStyle: { position: 'absolute', height: 80 }
            }}
        >
            <Tab.Screen name='Explore' component={ExploreStack} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='earth' color={color} size={32}/>),
                // tabBarShowLabel: false,
                tabBarLabel: 'Explore'
            }}/>
            <Tab.Screen name='Catches' component={CatchesStack} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='fish' color={color} size={40}/>),
                // tabBarShowLabel: false
                tabBarLabel: 'Catches'
            }}/>
            <Tab.Screen name='Places' component={PlacesStack} options={{
                tabBarIcon: ({ color }) => (<FontelloIcon name='map' color={color} size={32}/>),
                // tabBarShowLabel: false
                tabBarLabel: 'Places'
            }}/>
            <Tab.Screen name='Groups' component={GroupsScreen} options={{
                tabBarIcon: ({ color }) => (<IonIcon name='people-outline' color={color} size={32}/>),
                // tabBarShowLabel: false
                tabBarLabel: 'Groups',
            }}/>
        </Tab.Navigator>
    )
}

export default AppTabs;