import { StyleSheet, Text, View } from 'react-native'
import { FAB } from '@rneui/themed'
import PlacesTabHeader from '../../components/headers/PlacesTabHeader'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontelloIcon from '../../components/icons/Fontello'
import { useNavigation } from '@react-navigation/core'
import { globalStyles } from '../../styles/globalStyles'

const PlacesMapScreen = () => {

  const navigation = useNavigation()

  return (
    <PrimaryBackground>
        <PlacesTabHeader/>
        <Text>Places Map Screen</Text>
        <FAB icon={<Icon name='add-location-alt' size={32}/>} 
          style={{ ...globalStyles.FAB, ...globalStyles.FABshadow }}
          onPress={() => navigation.navigate('NewPlace')}
          buttonStyle={{ padding: 0 }}
        />
        <FAB icon={<FontelloIcon name='current-location' size={36}/>} 
          style={{ ...styles.location, ...globalStyles.FABshadow }}
          onPress={() => {}}
          buttonStyle={{ padding: 14 }}
        />
    </PrimaryBackground>
  )
}

export default PlacesMapScreen

const styles = StyleSheet.create({
  location: {
    position: 'absolute',
    bottom: 180,
    right: 16,
  }
})