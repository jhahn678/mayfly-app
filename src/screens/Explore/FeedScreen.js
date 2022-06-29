import { StyleSheet, Text, View} from 'react-native'
import { useAuthContext } from '../../store/context/auth'
import { useGetUserQuery } from '../../hooks/queries/getUser'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import ExploreTabHeader from '../../components/headers/ExploreTabHeader'
import { useNavigation } from '@react-navigation/core'


const FeedScreen = ({}) => {

  const { user } = useAuthContext()
  const { data } = useGetUserQuery(user._id)

  const navigation = useNavigation()
  
  return (
    <PrimaryBackground>
      <ExploreTabHeader/>
      { data && <Text>THE DATA IS HERE</Text>}
      { data && <Text>{data.getUser.details.fullName}</Text> }
    </PrimaryBackground>
  )
}

export default FeedScreen

const styles = StyleSheet.create({})