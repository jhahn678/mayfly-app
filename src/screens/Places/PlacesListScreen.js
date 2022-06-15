import { StyleSheet, Text, View } from 'react-native'
import PlacesTabHeader from '../../components/headers/PlacesTabHeader'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { FAB } from '@rneui/themed'
import { globalStyles } from '../../styles/globalStyles'
import { useNavigation } from '@react-navigation/core'

const PlacesListScreen = () => {

  const navigation = useNavigation()

  return (
    <PrimaryBackground>
        <PlacesTabHeader/>
        <Text>Places List Screen</Text>
        <FAB icon={<Icon name='add-location-alt' size={32}/>} 
          style={{ ...globalStyles.FAB, ...globalStyles.FABshadow }}
          onPress={() => navigation.navigate('NewPlace')}
          buttonStyle={{ padding: 0 }}
        />
    </PrimaryBackground>
  )
}

export default PlacesListScreen

const styles = StyleSheet.create({})