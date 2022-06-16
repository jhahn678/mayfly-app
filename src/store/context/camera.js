import { useContext, useState, createContext } from "react";

const initialState = {
    image: { height: 4000, width: 3000, uri: 'file:///data/user'},
    setImage: (image) => {},
    clearImage: () => {}
};

const CameraContext = createContext(initialState)

export const CameraContextProvider = ({ children }) => {

    const [image, setImage] = useState()

    const clearImage = () => setImage(null)

    return (
        <CameraContext.Provider value={{ image, setImage, clearImage }}>
            {children}
        </CameraContext.Provider>
    )
}

export const useCameraContext = () => useContext(CameraContext)