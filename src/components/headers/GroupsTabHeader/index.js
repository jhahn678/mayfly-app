import { StyleSheet, Text, View } from 'react-native'
import FontelloIcon from '../../icons/Fontello'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native'
import { FAB } from '@rneui/themed'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons'

const GroupsTabHeader = ({ selectedItems }) => {

    const navigation = useNavigation()

    return (
        <View style={{ ...styles.header, ...globalStyles.boxShadowBottom }}>
            <View style={styles.headerContent}>
                { selectedItems.length === 0 ? 
                    <Text style={{...styles.title, ...globalStyles.fontShadow }}>Groups</Text> :
                    <Text style={styles.selected}>{selectedItems.length} Selected</Text>
                }
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
                    <FontelloIcon size={32} 
                        name='new-chat' 
                        style={{...globalStyles.fontShadow}}
                        onPress={() => navigation.navigate('NewGroup')}
                    />
                }
            </View>
        </View>
    )
}

export default GroupsTabHeader

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '11%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight:20,
        paddingBottom: 4
    },
    title: {
        fontSize: 32
    },
    selected: {
        fontSize: 32,
        fontWeight: '300'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    FAB: {
        paddingLeft: 6
    }
})