import { StyleSheet, Text, View, Modal } from 'react-native'
import { useState } from 'react'
import { useAuthContext } from '../store/context/auth'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { makeFakeUsers } from '../../test-data/groups'
import { Avatar, Tab, TabView, Dialog } from '@rneui/themed'
import { useImagePicker } from '../hooks/utils/useImagePicker'
import StatsTabView from '../components/profile/StatsTabView'
import ProfileTabView from '../components/profile/ProfileTabView'
import SettingsTabView from '../components/profile/SettingsTabView'

const ProfileScreen = () => {
    
    const { signOut } = useAuthContext()
    const [user] = useState(makeFakeUsers(1)[0])
    const [tabIndex, setTabIndex] = useState(0)
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const openImagePicker = useImagePicker()

    const handlePickImage = async () => {
        const { cancelled, ...image } = await openImagePicker()
        if(cancelled === false) {
            //change user avatar and update auth context
        }
    }
    
    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <Avatar source={{ uri: user.details.avatar.url }} 
                    size={128} rounded onPress={handlePickImage}
                    icon={{ name: 'image-plus', type: 'material-community' }} 
                />
                <View style={styles.headerRight}>
                    <Text style={{ fontSize: 20 }}>{user.details.fullName}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '200' }}>@{user.details.username}</Text>
                </View>

                <IonIcon name='log-out-outline' size={28} onPress={() => setShowLogoutModal(true)} 
                style={{ position:'absolute', top: 48, right: 16 }}/>

            </View>

            <Tab value={tabIndex} onChange={e => setTabIndex(e)}
                indicatorStyle={{ backgroundColor: '#0eaaa7', height: 3 }}
                containerStyle={{ backgroundColor: 'rgb(220,220,220)', marginTop: 16, width: '100%' }}
            >
                <Tab.Item title='Stats' titleStyle={{ fontSize: 14, paddingHorizontal: 0 }} />
                <Tab.Item title='Profile' titleStyle={{ fontSize: 14, paddingHorizontal: 0 }}/>
                <Tab.Item title='Settings' titleStyle={{ fontSize: 14, paddingHorizontal: 0 }}/>
            </Tab>

            <TabView value={tabIndex} onChange={e => setTabIndex(e)} animationType="spring">
                <StatsTabView/>
                <ProfileTabView/>
                <SettingsTabView/>
            </TabView>

            <Dialog ModalComponent={Modal} isVisible={showLogoutModal} 
                onBackdropPress={() => setShowLogoutModal(false)}
            >
                <Text>Are you sure you want to sing out?</Text>
                <Dialog.Actions>
                    <Dialog.Button onPress={() => signOut()}>Sign out</Dialog.Button>
                    <Dialog.Button onPress={() => setShowLogoutModal(false)}>Cancel</Dialog.Button>
                </Dialog.Actions>
            </Dialog>

        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fefefe'
    },
    avatar: {
        borderColor: '#0eaaa7',
        borderWidth: 3,
        backgroundColor: 'rgba(53, 52, 64, .3)'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        paddingTop: 64
    },
    headerRight: {
        paddingLeft: 12
    }
})