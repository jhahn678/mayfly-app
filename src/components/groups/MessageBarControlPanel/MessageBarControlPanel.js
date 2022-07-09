import { StyleSheet, Text, View, ScrollView } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/core'
import ExpandingView from '../../animations/ExpandingView'
import ShareImageButton from '../../buttons/ShareImageButton'
import NewPlacePanelButton from './NewPlacePanelButton'
import NewCatchPanelButton from './NewCatchPanelButton'
import ShareCatchPanelButton from './ShareCatchPanelButton'
import SharePlacePanelButton from './SharePlacePanelButton'


const MessageBarControlPanel = ({ show }) => {

    const navigation = useNavigation()

    const handleCamera = () => navigation.navigate('Camera')

    return (
        <ExpandingView expand={show} expandedValue={150} style={styles.container}>
            <View style={styles.left}>
                <IonIcon name='camera-outline' size={28} color='#032836' onPress={handleCamera}/>
                <ShareImageButton/>
                <MCIcon name='file-gif-box' size={32} color='#032836'/>
            </View>
            <ScrollView horizontal contentContainerStyle={styles.right} showsHorizontalScrollIndicator={false}>
                <NewCatchPanelButton/>
                <NewPlacePanelButton/>
                <ShareCatchPanelButton/>
                <SharePlacePanelButton/>
            </ScrollView>
        </ExpandingView>

    )
}

export default MessageBarControlPanel

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fefefe', 
        width: '100%',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    left: {
        borderRightColor: '#ececec',
        borderRightWidth: 1,
        paddingHorizontal: 16,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 12
    },
})