import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { TabView, Switch, Dialog } from "@rneui/themed";
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'

const SettingsTabView = () => {

    const [catchesAtMyLocations, setCatchesAtMyLocations] = useState(true)
    const [friendsLogCatches, setFriendsLogCatches] = useState(true)
    const [friendsSaveLocations, setFriendsSaveLocations] = useState(true)
    const [userRequestsContact, setUserRequessContact] = useState(true)
    const [fromGroups, setFromGroups] = useState(true)
    const [cameraPermission, setCameraPermission] = useState(true)
    const [photosPermission, setPhotosPermission] = useState(true)
    const [locationPermission, setLocationPermission] = useState(true)
    

    const handleSignOut = () => {}
    const handleChangeEmail = () => {}
    const handleChangePassword = () => {}


    
    return (
        <TabView.Item style={{ width: '100%' }}>
            
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>


                <Text style={styles.header}>Notifications</Text>
                <View style={styles.setting}>
                    <Switch trackColor={{ true: '#0eaaa7' }} value={catchesAtMyLocations} onValueChange={e => setCatchesAtMyLocations(e)}/>
                    <Text style={styles.settingLabel}>Allow when users post to my locations</Text>
                </View>
                <View style={styles.setting}>
                    <Switch trackColor={{ true: '#0eaaa7' }} value={friendsLogCatches} onValueChange={e => setFriendsLogCatches(e)}/>
                    <Text style={styles.settingLabel}>Allow when friends log new catches</Text>
                </View>
                <View style={styles.setting}>
                    <Switch trackColor={{ true: '#0eaaa7' }} value={friendsSaveLocations} onValueChange={e => setFriendsSaveLocations(e)}/>
                    <Text style={styles.settingLabel}>Allow when friends save new locations</Text>
                </View>
                <View style={styles.setting}>
                    <Switch trackColor={{ true: '#0eaaa7' }} value={userRequestsContact} onChange={e => setUserRequessContact(e)}/>
                    <Text style={styles.settingLabel}>Allow when users request to be friends</Text>
                </View>
                <View style={styles.setting}>
                    <Switch trackColor={{ true: '#0eaaa7' }} value={fromGroups} onChange={e => setFromGroups(e)}/>
                    <Text style={styles.settingLabel}>Allow notifications from groups</Text>
                </View>



                <Text style={styles.header}>Permissions</Text>
                <View style={styles.setting}>
                    <Switch trackColor={{ true: '#0eaaa7' }} value={cameraPermission} onChange={e => setCameraPermission(e)}/>
                    <Text style={styles.settingLabel}>Allow notifications from groups</Text>
                </View>
                <View style={styles.setting}>
                    <Switch trackColor={{ true: '#0eaaa7' }} value={photosPermission} onChange={e => setPhotosPermission(e)}/>
                    <Text style={styles.settingLabel}>Allow notifications from groups</Text>
                </View>
                <View style={styles.setting}>
                    <Switch trackColor={{ true: '#0eaaa7' }} value={locationPermission} onChange={e => setLocationPermission(e)}/>
                    <Text style={styles.settingLabel}>Allow notifications from groups</Text>
                </View>


                <Text style={styles.header}>Account</Text>
                <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
                    <Text style={{ fontWeight: '300'}}>Change email</Text>
                    <IonIcon name='mail-outline' size={16}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                    <Text style={{ fontWeight: '300'}}>Change password</Text>
                    <IonIcon name='lock-closed-outline' size={16}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                    <Text style={{ fontWeight: '300'}}>Sign out</Text>
                    <IonIcon name='log-out-outline' size={16}/>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.button, backgroundColor: 'rgba(170, 14, 17, 1)' }} onPress={handleSignOut}>
                    <Text style={{ color: '#fefefe' }}>Delete account</Text>
                    <IonIcon name='log-out-outline' size={16} color='#fefefe'/>
                </TouchableOpacity>

            </ScrollView>

        </TabView.Item>
    )
}

export default SettingsTabView

const styles = StyleSheet.create({
    header: {
        fontSize: 14,
        marginTop: 16,
        paddingLeft: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: .5,
        borderColor: 'rgb(220,220,220)',
        borderRadius: 8
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        marginTop: 12
    },
    settingLabel: {
        fontSize: 14,
        marginLeft: 8,
        fontWeight: '300'
    }
})