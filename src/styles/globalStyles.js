import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    fontShadow: {
        color: '#fffef3', 
        textShadowColor: 'rgba(0,0,0,.3)',
        textShadowOffset: { height: 4 },
        textShadowRadius: 8
    },
    boxShadowBottom: {
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowOffset: { height: 4 },
        shadowRadius: 8,
    },
    boxShadowTop: {
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowOffset: { height: -4 },
        shadowRadius: 8,
    }
})