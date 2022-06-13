import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '../../../screens/Global/FeedScreen'
import MapScreen from '../../../screens/Global/MapScreen'

const GlobalStack = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name='GlobalFeed' component={FeedScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name='GlobalMap' component={MapScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default GlobalStack

const styles = StyleSheet.create({})