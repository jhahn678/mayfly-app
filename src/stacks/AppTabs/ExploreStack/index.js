import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '../../../screens/Explore/FeedScreen'
import MapScreen from '../../../screens/Explore/MapScreen'

const ExploreStack = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name='GlobalFeed' component={FeedScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name='GlobalMap' component={MapScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default ExploreStack

const styles = StyleSheet.create({})