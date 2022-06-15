import { StyleSheet, Text, View } from 'react-native'
import FontelloIcon from '../../icons/Fontello'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur';

const GroupsTabHeader = () => {

    const navigation = useNavigation()

    return (
        <View style={{ ...styles.header, ...globalStyles.boxShadowBottom }}>
            <View style={styles.headerContent}>
                <Text style={{...styles.title, ...globalStyles.fontShadow }}>Groups</Text>
                <FontelloIcon size={48} 
                    name='new-chat' 
                    style={{...globalStyles.fontShadow}}
                    onPress={() => navigation.navigate('NewGroup')}
                />
            </View>
        </View>
    )
}

export default GroupsTabHeader

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '12%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight:10,
        paddingBottom: 4
    },
    title: {
        fontSize: 32,
        fontWeight: '400'
    }
})