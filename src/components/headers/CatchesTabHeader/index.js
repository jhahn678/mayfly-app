import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigateToMap } from '../../../hooks/utils/useNavigateToMap'
import { FAB } from '@rneui/themed'

const CatchTabHeader = ({}) => {

    const navigateToMap = useNavigateToMap()

    return (
        <View style={{ ...styles.header }}>
            <View style={styles.headerContent}>
                <Text style={{...styles.title }}>My Catches</Text>
                <FAB onPress={() => navigateToMap({ catches: true, places: false })} 
                    icon={<IonIcon size={24} name='map-outline' color='#fefefe'/>} 
                    style={{...styles.headerButton, ...globalStyles.FABshadow}}
                />
            </View>
        </View>
    )
}

export default CatchTabHeader

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
        fontWeight: '400',
        color: '#fefefe'
    }
})