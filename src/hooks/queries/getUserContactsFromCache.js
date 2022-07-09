import { gql, useApolloClient } from '@apollo/client'


const GET_USER_CONTACTS = gql`
    fragment cachedUser on User{
        _id
        contacts {
            _id
        }
        pending_contacts {
            _id
        }
    }
`


export const useGetContactsFromCache = () => {
    
    const client = useApolloClient()

    const getContacts = (userId) => {

        const data = client.readFragment({
            id: userId,
            fragment: GET_USER_CONTACTS
        })
        return data;
    }

    return { getContacts }

}