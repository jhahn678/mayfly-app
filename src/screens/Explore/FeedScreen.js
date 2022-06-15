import { StyleSheet, Text, View} from 'react-native'
import { useAuthContext } from '../../store/context/auth'
import { useGetUserQuery } from '../../hooks/queries/getUser'
import PrimaryBackground from '../../components/backgrounds/PrimaryBackground'
import ExploreTabHeader from '../../components/headers/ExploreTabHeader'
import { useNavigation } from '@react-navigation/core'
import { FAB } from '@rneui/themed'
import { globalStyles } from '../../styles/globalStyles'
import FontelloIcon from '../../components/icons/Fontello'

const FeedScreen = ({}) => {

  const { user } = useAuthContext()
  const { data } = useGetUserQuery(user._id)

  const navigation = useNavigation()
  
  return (
    <View style={{ height: '100%'}}>
      <ExploreTabHeader/>
      { data && <Text>THE DATA IS HERE</Text>}
      { data && <Text>{data.getUser.details.fullName}</Text> }
      <FAB icon={<FontelloIcon name='fish' size={48}/>} 
        style={{ ...globalStyles.FAB, ...globalStyles.FABshadow }}
        onPress={() => navigation.navigate('NewCatch')}
        buttonStyle={{ paddingTop: 10, paddingLeft: 4 }}
      />
    </View>
  )
}

export default FeedScreen

const styles = StyleSheet.create({})