export const initialState = {
    name: { value: '' },
    description: { value: '' },
    location: { coordinates: { latitude: null, longitude: null } },
    snapshot: { image: null },
    images: [],
    publishType: { value: 'PUBLIC' },
    group: { _id: null },
    form: { isValid: false }
}

export const reducer = (state, action) => {
    if(action.type === 'NAME'){
        const { name } = state;
        name.value = action.value;
        return { ...state, name }
    }
    if(action.type === 'DESCRIPTION'){
        const { description } = state;
        description.value = action.value;
        return { ...state, description }
    }
    if(action.type === 'COORDINATES'){
        const { location } = state;
        location.coordinates = action.value
        return { ...state, location }
    }
    if(action.type === 'SNAPSHOT'){
        const { snapshot } = state;
        snapshot.image = action.value;
        return { ...state, snapshot }
    }
    if(action.type === 'IMAGE'){
        return { ...state, images: action.value }
    }
    if(action.type === 'REMOVE_IMAGE'){
        const { images } = state;
        const array = images.filter((_, index) => index !== action.value)
        return { ...state, images: array }
    }
    if(action.type === 'GROUP'){
        const { group } = state;
        group._id = action.value
        return { ...state, group }
    }
    if(action.type === 'PUBLISH_TYPE'){
        const { publishType } = state;
        if(action.value === 'PUBLIC' || action.value === 'PRIVATE' || action.value === 'SHARED'){
            publishType.value = action.value;
        }
        return { ...state, publishType }
    }
    if(action.type === 'FORM'){
        const { form, coordinates, avatar, name } = state;
        if(publishType.value === 'PUBLIC' && coordinates.longitude 
            && coordinates.latitude && avatar.base64 && name.value.length > 0
        ){
            form.isValid = true;
        }
        if(publishType !== 'PUBLIC' && coordinates.longitude && coordinates.latitude){
            form.isValid = true;
        }else{
            form.isValid = false;
        }
        return { ...state, form }
    }
    return {...state};
}