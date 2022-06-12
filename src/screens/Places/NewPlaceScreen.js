import { StyleSheet, Text, View } from 'react-native'
import PlacesTabHeader from '../../components/headers/PlacesTabHeader'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'

const NewPlaceScreen = () => {
  return (
    <PrimaryBackground>
        <PlacesTabHeader/>
        <Text>New Place Screen</Text>
    </PrimaryBackground>
  )
}

export default NewPlaceScreen

const styles = StyleSheet.create({})