import { StyleSheet, Text, View } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import ExploreTabHeader from '../../components/headers/ExploreTabHeader'
import { FAB } from '@rneui/themed'
import { globalStyles } from '../../styles/globalStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const MapScreen = ({}) => {

  const navigation = useNavigation()

  return (
    <PrimaryBackground>
      <ExploreTabHeader/>
      <Text>MapScreen</Text>
      <FAB icon={<Icon name='add-location-alt' size={32}/>} 
        style={{ ...globalStyles.FAB, ...globalStyles.FABshadow }}
        onPress={() => navigation.navigate('NewPlace')}
        buttonStyle={{ padding: 0 }}
      />
    </PrimaryBackground>
  )
}

export default MapScreen

const styles = StyleSheet.create({})