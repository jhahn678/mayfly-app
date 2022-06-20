import { StyleSheet, Text, View} from 'react-native'
import { useEffect } from 'react'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CreateHeader from '../../components/headers/CreateHeader'
import { useRoute } from '@react-navigation/core'


const NewPlaceScreen = () => {

    const route = useRoute()

    const [coordinates, setCoordinates]

    useEffect(() => {
      if(route.params?.coordinates){
        setCoordinates(route.params.coordinates)
      }
    },[])

    return (
      <PrimaryBackground>
          <CreateHeader title='New Place'/>
          <Text>New Place Screen</Text>
      </PrimaryBackground>
    )
}

export default NewPlaceScreen

const styles = StyleSheet.create({})