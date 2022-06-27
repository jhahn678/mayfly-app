import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigateToMap } from '../../../hooks/utils/useNavigateToMap'
import { FAB } from '@rneui/themed'

const PlacesTabHeader = ({ selectedItems }) => {

    const navigateToMap = useNavigateToMap()

    const handleDeletePlace = async () => {

    }

    const handleEditPlace = () => {
        
    }

    return (
        <View style={{ ...styles.header }}>
            <View style={styles.headerContent}>
                <Text style={{...styles.title }}>
                    {selectedItems.length > 0 ? `${selectedItems.length} selected` : 'My Locations'}
                </Text>
                { selectedItems.length > 0 ?
                    <View style={styles.buttonContainer}>
                        <FAB onPress={handleDeletePlace}
                            icon={<EntypoIcon name='trash' size={20} color='white'/>} 
                            style={globalStyles.FABshadow}
                        />
                        { selectedItems.length === 1 &&
                            <FAB onPress={handleEditPlace}
                                icon={<IonIcon name='pencil' size={20} color='white'/>} 
                                style={{ ...globalStyles.FABshadow, marginLeft: 12 }}
                            />
                        }
                    </View> : 
                    <FAB onPress={() => navigateToMap({})} 
                        icon={<IonIcon size={24} name='map-outline' color='#fefefe'/>} 
                        style={globalStyles.FABshadow}
                    />
                }
            </View>
        </View>
    )
}

export default PlacesTabHeader

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
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
})