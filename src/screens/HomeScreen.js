import { StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'
import { useAuthContext } from '../store/context/auth'
import { useGetUserQuery } from '../hooks/queries/getUser'
import PrimaryBackground from '../components/backgrounds/PrimaryBackground'
import GlobalTabHeader from '../components/headers/GlobalTabHeader'


const HomeScreen = ({ navigation }) => {

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

export default HomeScreen

const styles = StyleSheet.create({
    
})

