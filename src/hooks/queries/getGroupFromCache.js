import { gql, useApolloClient } from '@apollo/client'


const GET_GROUP = gql`
    fragment cachedGroup on Group{
        _id
        name
        avatar{
            url
        }
    }
`


export const useGetGroupFromCache = () => {
    
    const client = useApolloClient()

    const getGroup = (groupId) => {

        const data = client.readFragment({
            id: groupId,
            fragment: GET_GROUP
        })
        return data;
    }

    return { getGroup }

}