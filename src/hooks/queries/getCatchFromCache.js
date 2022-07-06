import { gql, useApolloClient } from '@apollo/client'


const GET_CATCH_LOCATION = gql`
    fragment cachedCatch on Catch {
        _id
        location {
            coordinates
        }
        place {
            location {
                coordinates
            }
        }
        title
        species
        createdAt
    }
`


export const useGetCatchFromCache = () => {

    const client = useApolloClient()

    const getCatch = (catchId) => {

        const data = client.readFragment({ 
            id: catchId,
            fragment: GET_CATCH_LOCATION,
        })

        return data
    }

    return { getCatch }
}