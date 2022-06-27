import axios from 'axios'


export const uploadAvatarToCloudinary = async ({ base64 }) => {
    const res = await axios.post(process.env.CLOUDINARY_URL, {
        file: `data:image/jpeg;base64,${base64}`,
        upload_preset: process.env.CLOUDINARY_AVATAR_PRESET
    })
    return res
}

export const uploadImageToCloudinary = async ({ base64 }) => {
    const res = await axios.post(process.env.CLOUDINARY_URL, {
        file: `data:image/jpeg;base64,${base64}`,
        upload_preset: process.env.CLOUDINARY_IMAGE_PRESET
    })
    return res
}

export const removeImageFromCloudinary = async (id) => {
    const res = axios
}