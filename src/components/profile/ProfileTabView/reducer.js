export const initialState = {
    firstName: { value: '', isFocused: false, isValid: true },
    lastName: { value: '', isFocused: false, isValid: true },
    location: { value: '', isFocused: false, isValid: true },
    bio: { value: '', isFocused: false, isValid: true },
    edited: false
}


export const reducer = (state, action) => {
    if(action.type === 'FIRSTNAME'){
        const { firstName } = state;
        firstName.value = action.value;
        return { ...state, firstName, edited: true }
    }
    if(action.type === 'FIRSTNAME_FOCUS'){
        const { firstName } = state;
        firstName.isFocused = true;
        return { ...state, firstName }
    }
    if(action.type === 'FIRSTNAME_BLUR'){
        const { firstName } = state;
        firstName.isFocused = false;
        return { ...state, firstName }
    }
    if(action.type === 'LASTNAME'){
        const { lastName } = state;
        lastName.value = action.value;
        return { ...state, lastName, edited: true }
    }
    if(action.type === 'LASTNAME_FOCUS'){
        const { lastName } = state;
        lastName.isFocused = true;
        return { ...state, lastName }
    }
    if(action.type === 'LASTNAME_BLUR'){
        const { lastName } = state;
        lastName.isFocused = false;
        return { ...state, lastName }
    }
    if(action.type === 'LOCATION'){
        const { location } = state;
        location.value = action.value;
        return { ...state, location, edited: true }
    }
    if(action.type === 'LOCATION_FOCUS'){
        const { location } = state;
        location.isFocused = true;
        return { ...state, location }
    }
    if(action.type === 'LOCATION_BLUR'){
        const { location } = state;
        location.isFocused = false;
        return { ...state, location }
    }
    if(action.type === 'BIO'){
        const { bio } = state;
        bio.value = action.value;
        return { ...state, bio, edited: true }
    }
    if(action.type === 'BIO_FOCUS'){
        const { bio } = state;
        bio.isFocused = true;
        return { ...state, bio }
    }
    if(action.type === 'BIO_BLUR'){
        const { bio } = state;
        bio.isFocused = false;
        return { ...state, bio }
    }
    if(action.type === 'LOAD_DATA'){
        const { firstName, lastName, location, bio } = state;
        firstName.value = action.value.firstName;
        lastName.value = action.value.lastName;
        location.value = action.value.location;
        bio.value = action.value.bio;
        return { ...state, firstName, lastName, location, bio }
    }
}