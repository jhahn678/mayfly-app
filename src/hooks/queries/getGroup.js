import { useQuery, gql } from "@apollo/client";

const GET_GROUP = gql`
    query GetGroup($groupId: ID!) {
        getGroup(groupId: $groupId) {
            _id
            messages {
                _id
                user {
                    _id
                    details {
                        avatar {
                            url
                        }
                        username
                        fullName
                    }
                }
                createdAt
                media {
                    url
                }
                body
                type
                place {
                    _id
                    locality
                    avatar {
                        url
                    }
                    name
                    location {
                        coordinates
                    }
                }
                catch {
                    _id
                    title
                    species
                    media {
                        url
                    }
                }
            }
            name
            avatar {
                url
            }
            users {
                _id
                details {
                    fullName
                    username
                    avatar {
                        url
                    }   
                }
            }
            createdAt
            created_by {
                _id
                details {
                    fullName
                }
            }
        }
    }
`


export const useGetGroupQuery = (groupId) => {

    const result = useQuery(GET_GROUP, {
        variables: { groupId }
    })

    return result;
}