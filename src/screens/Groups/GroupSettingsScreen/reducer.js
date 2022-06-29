export const initialState = {
    name: { value: '' },
    avatar: { uri: '', base64: '' },
    users: [],
    places: [],
    catches: [],
    media: [],
    form: { edited: false }
}


export const reducer = (state, action) => {
    if(action.type === 'NAME'){
        const { name, form } = state;
        name.value = action.value;
        form.edited = true;
        return { ...state, name, form }
    }
    if(action.type === 'AVATAR'){
        const { avatar, form } = state;
        avatar.uri = action.value.uri
        avatar.base64 = action.value.base64
        form.edited = true;
        return { ...state, avatar, form }
    }
    if(action.type === 'ADD_CONTACTS'){
        const { users } = state;
        return { ...state, users }
    }
    if(action.type === 'LOAD_DATA'){
        const { name, avatar } = state;
        name.value = action.value.name;
        avatar.uri = action.value.avatar.url;
        return {
            ...state, 
            name,
            avatar, 
            users: action.value.users,
            places: action.value.places,
            catches: action.value.catches,
            media: action.value.media 
        }
    }
    return { ...state }
}