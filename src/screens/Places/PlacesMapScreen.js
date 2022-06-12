import { StyleSheet, Text, View } from 'react-native'
import PlacesTabHeader from '../../components/headers/PlacesTabHeader'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'

const PlacesMapScreen = () => {
  return (
    <PrimaryBackground>
        <PlacesTabHeader/>
        <Text>Places Map Screen</Text>
    </PrimaryBackground>
  )
}

export default PlacesMapScreen

const styles = StyleSheet.create({})