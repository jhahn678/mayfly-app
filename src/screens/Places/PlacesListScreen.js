import { StyleSheet, Text, View } from 'react-native'
import PlacesTabHeader from '../../components/headers/PlacesTabHeader'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'

const PlacesListScreen = () => {
  return (
    <PrimaryBackground>
        <PlacesTabHeader/>
        <Text>Places List Screen</Text>
    </PrimaryBackground>
  )
}

export default PlacesListScreen

const styles = StyleSheet.create({})