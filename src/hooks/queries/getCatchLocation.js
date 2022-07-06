import { gql, useLazyQuery } from '@apollo/client'


const GET_CATCH_LOCATION = gql`
    query Query($catchId: ID!) {
        getCatch(catchId: $catchId) {
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
            createdAt
            user {
                _id
                details {
                    username
                }
            }
        }
    }
`


export const useLazyGetCatchLocationQuery = () => {
    const result = useLazyQuery(GET_CATCH_LOCATION)
    return result
}