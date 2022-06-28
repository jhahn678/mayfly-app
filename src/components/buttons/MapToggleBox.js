import { StyleSheet, Text, View } from 'react-native'
import { Switch, FAB } from '@rneui/themed'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FadeAnimation from '../animations/FadeAnimation'
import { useState } from 'react'

const MapToggleBox = ({ showCatches, setShowCatches, showPlaces, setShowPlaces, style }) => {

    const [showToggleBox, setShowToggleBox] = useState(false)

    return (
        <>
            <FAB size='small' onPress={() => setShowToggleBox(s => !s)}
                icon={<IonIcon name={showToggleBox ? 'close' : 'options-outline'} size={20} color='rgb(120,120,120)'/>}
                style={styles.button} color='rgb(220,220,220)'
            />
            {showToggleBox &&
                <FadeAnimation style={{...styles.toggleBox, style }} duration={200}>
                    <View style={{ alignItems: 'center' }}>
                        <Switch value={showCatches} onValueChange={() => setShowCatches(c => !c)}/>
                        <Text>Catches</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Switch value={showPlaces} onValueChange={() => setShowPlaces(p => !p)}/>
                        <Text>Places</Text>
                    </View>
                </FadeAnimation>
            }
        </>
    )
}

export default MapToggleBox

const styles = StyleSheet.create({
    button: {
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: .3,
        shadowRadius: 12,
        shadowOffset: { height: 1 },
        position: 'absolute',
        top: 40,
        right: 16,
    },
    toggleBox: {
        position: 'absolute',
        right: 12,
        top: 96,
        height: 144,
        width: 64,
        paddingVertical: 16,
        borderRadius: 16,
        backgroundColor: 'rgba(220,220,220,.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})