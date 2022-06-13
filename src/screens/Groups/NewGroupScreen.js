import { StyleSheet, Text, View } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CreateHeader from '../../components/headers/CreateHeader'

const NewGroupScreen = () => {
  return (
    <PrimaryBackground>
        <CreateHeader title='New Group'/>
        <Text>New Group Screen</Text>
    </PrimaryBackground>
  )
}

export default NewGroupScreen

const styles = StyleSheet.create({})