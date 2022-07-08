import { LinearGradient } from 'expo-linear-gradient'

const Gradient = ({ children, colors=['#06beb6','#48b1bf'], style }) => {
    return (
        <LinearGradient colors={colors}
            style={style}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {children}
        </LinearGradient>
    )
}

export default Gradient;


