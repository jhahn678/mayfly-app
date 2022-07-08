import { StyleSheet, Text, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { globalStyles } from '../../../styles/globalStyles';
import { useNavigateToMap } from '../../../hooks/utils/useNavigateToMap'
import { FAB } from '@rneui/themed'
import { useNavigation } from '@react-navigation/core';
import MapFAB from '../../buttons/MapFAB';

const CatchesTabHeader = ({ selectedItems }) => {

    const navigateToMap = useNavigateToMap()
    const navigation = useNavigation()

    const handleDeleteCatch = async () => {

    }

    const handleEditCatch = () => {
        navigation.navigate('NewCatch', { catchId: selectedItems[0]._id })
    }

    return (
        <View style={{ ...styles.header }}>
            <View style={styles.headerContent}>
                <Text style={{...styles.title }}>
                    {selectedItems.length > 0 ? `${selectedItems.length} selected` : 'My Catches'}
                </Text>
                { selectedItems.length > 0 ?
                    <View style={styles.buttonContainer}>
                        <FAB onPress={handleDeleteCatch}
                            icon={<EntypoIcon name='trash' size={20} color='#fefefe'/>} 
                            style={globalStyles.FABshadow}
                        />
                        { selectedItems.length === 1 &&
                            <FAB onPress={handleEditCatch}
                                icon={<IonIcon name='pencil' size={20} color='#fefefe'/>} 
                                style={{ ...globalStyles.FABshadow, marginLeft: 12 }}
                            />
                        }
                    </View> : 
                    <MapFAB mapOptions={{ catches: true, places: false }}/>
                }
            </View>
        </View>
    )
}

export default CatchesTabHeader;

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