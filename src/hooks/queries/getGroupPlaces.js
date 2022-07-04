import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_GROUP_PLACES = gql`
query Query($groupId: ID!) {
    getGroup(groupId: $groupId) {
        places {
            _id
            name
            description
            avatar {
                id
                url
            }
            user {
                _id
                details {
                    avatar {
                    id
                    url
                    }
                    username
                    fullName
                    firstName
                    lastName
                }
            }
            publish_type
            locality
            location {
                type
                coordinates
            }
            createdAt
        }
    }
  }
`

export const useGetGroupPlacesQuery = (groupId) => {
    const result = useQuery(GET_GROUP_PLACES, {
        variables: { groupId }
    })
    return result
}

export const useLazyGetGroupPlacesQuery = (groupId) => {
    const result = useLazyQuery(GET_GROUP_PLACES, {
        variables: { groupId }
    })
    return result
}