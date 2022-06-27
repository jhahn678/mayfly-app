import { StyleSheet, Text, View } from 'react-native'
import FontelloIcon from '../../icons/Fontello'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native'
import { FAB } from '@rneui/themed'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const GroupsTabHeader = ({ selectedItems }) => {

    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                    <Text style={{...styles.title}}>
                        { selectedItems.length === 0 ? 'Groups' : `${selectedItems.length} Selected` }
                    </Text>
                { selectedItems.length > 0 ?
                    <View style={styles.buttonContainer}>
                        <FAB onPress={() => {}} size='small'
                            icon={<EntypoIcon name='pin' size={20} color='white'/>} 
                            style={{...styles.FAB, ...globalStyles.FABshadow}}
                        />
                        <FAB onPress={() => {}} size='small' 
                            icon={<IonIcon name='notifications-off' size={20} color='white'/>} 
                            style={{...styles.FAB, ...globalStyles.FABshadow}}
                        />
                        <FAB onPress={() => {}} size='small'
                            icon={<EntypoIcon name='trash' size={20} color='white'/>} 
                            style={{...styles.FAB, ...globalStyles.FABshadow}}
                        />
                    </View> : 
                    <View style={{ flexDirection: 'row'}}>
                        <FAB onPress={() => navigation.navigate('Contacts')} 
                            icon={<MCIcon name='account-group-outline' size={24} color='#fefefe'/>}
                            style={{...styles.headerButton, ...globalStyles.FABshadow, marginRight: 12 }}
                        />
                        <FAB onPress={() => navigation.navigate('NewGroup')} 
                            icon={<FontelloIcon size={24} name='new-chat' color='#fefefe'/>} 
                            style={{...styles.headerButton, ...globalStyles.FABshadow}}
                        />
                    </View>
                }
            </View>
        </View>
    )
}

export default GroupsTabHeader

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '15%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 24,
        paddingRight:24,
        paddingBottom: 12
    },
    title: {
        fontSize: 32,
        color: '#fefefe',
        fontWeight: '400',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 12
    },
    headerButton: {
        borderColor: 'rgba(0,0,0,.1)',
        borderWidth: .5
    },
    FAB: {
        paddingLeft: 6,
    }
})