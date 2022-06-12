import { StyleSheet, Text, View} from 'react-native'
import { useAuthContext } from '../../store/context/auth'
import { useGetUserQuery } from '../../hooks/queries/getUser'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import GlobalTabHeader from '../../components/headers/GlobalTabHeader'

const FeedScreen = ({ navigation }) => {

  const { user } = useAuthContext()
  const { data } = useGetUserQuery(user._id)

  
  return (
    <PrimaryBackground>
      <GlobalTabHeader/>
      { data && <Text>THE DATA IS HERE</Text>}
      { data && <Text>{data.getUser.details.fullName}</Text> }
    </PrimaryBackground>
  )
}

export default FeedScreen

const styles = StyleSheet.create({})