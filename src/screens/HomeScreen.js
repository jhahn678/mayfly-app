import { StyleSheet, Text, View } from 'react-native'
import { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

const HomeScreen = ({ navigation }) => {

  useEffect(() => {
    const getToken = async () => {
      const token = await SecureStore.getItemAsync('ACCESS_TOKEN')
      alert(token)
    }
    getToken()
  },[])

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
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

