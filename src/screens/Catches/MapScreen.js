import { StyleSheet, Text } from 'react-native'
import { FAB } from '@rneui/themed'
import { globalStyles } from '../../styles/globalStyles'
import FontelloIcon from '../../components/icons/Fontello'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import CatchesTabHeader from '../../components/headers/CatchesTabHeader'
import { useNavigation } from '@react-navigation/core'

const MapScreen = () => {

  const navigation = useNavigation()

  return (
    <PrimaryBackground>
      <CatchesTabHeader/>
      <Text>Map screen</Text>
      <FAB icon={<FontelloIcon name='fish' size={36}/>} 
          style={{ ...globalStyles.FAB, ...globalStyles.boxShadowBottom }}
          onPress={() => navigation.navigate('NewPlace')}
          buttonStyle={{ paddingTop: 10, paddingLeft: 8 }}
        />
    </PrimaryBackground>
  )
}

export default MapScreen

const styles = StyleSheet.create({})