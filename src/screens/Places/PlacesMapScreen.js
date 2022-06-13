import { StyleSheet, Text, View } from 'react-native'
import { FAB } from '@rneui/themed'
import PlacesTabHeader from '../../components/headers/PlacesTabHeader'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/core'

const PlacesMapScreen = () => {

  const navigation = useNavigation()

  return (
    <PrimaryBackground>
        <PlacesTabHeader/>
        <Text>Places Map Screen</Text>
        <FAB icon={<Icon name='add-location-alt' size={24}/>} 
          style={styles.button}
          onPress={() => navigation.navigate('NewPlace')}
        />
    </PrimaryBackground>
  )
}

export default PlacesMapScreen

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 112,
    right: 16
  }
})