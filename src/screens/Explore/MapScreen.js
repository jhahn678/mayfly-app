import { StyleSheet } from 'react-native'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import ExploreTabHeader from '../../components/headers/ExploreTabHeader'
import { useNavigation } from '@react-navigation/native'

const MapScreen = ({}) => {

  const navigation = useNavigation()

  return (
    <PrimaryBackground>
      <ExploreTabHeader/>
    </PrimaryBackground>
  )
}

export default MapScreen

const styles = StyleSheet.create({})