import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    fontShadow: {
        color: '#353440',
        textShadowColor: 'rgba(0,0,0,.1)',
        textShadowOffset: { height: 1 },
        textShadowRadius: 2,
        fontWeight: '500'
    },
    boxShadowBottom: {
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowOffset: { height: 4 },
        shadowRadius: 12,
        elevation: 400
    },
    boxShadowTop: {
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowOffset: { height: -4 },
        shadowRadius: 12,
        elevation: 400
    },
    FAB: {
        position: 'absolute',
        bottom: 96,
        right: 16,
    },
    FABshadow: {
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 12,
        shadowOffset: { height: 4 },
        elevation: 400
    }
})