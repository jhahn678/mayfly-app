import { StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'
import { useAuthContext } from '../store/context/auth'
import { useGetUserQuery } from '../hooks/queries/getUser'

const HomeScreen = ({ navigation }) => {

  const { user } = useAuthContext()
  const { data } = useGetUserQuery(user._id)
  
  return (
    <View style={styles.container}>
      { data && <Text>THE DATA IS HERE</Text>}
      { data && <Text>{data.getUser.details.fullName}</Text> }
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffef3',
        height: '100%'
    }
})

