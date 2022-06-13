import { StyleSheet, Text, View } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CreateHeader from '../../components/headers/CreateHeader'

const NewPlaceScreen = () => {
  return (
    <PrimaryBackground>
        <CreateHeader title='New Place'/>
        <Text>New Place Screen</Text>
    </PrimaryBackground>
  )
}

export default NewPlaceScreen

const styles = StyleSheet.create({})