import { useState, useEffect } from 'react'
import axios from '../../utils/axios'


export const useSearchByUsername = () => {

    const [input, setInput] = useState('')
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(input.length >= 3){
            const timer = setTimeout(async () => {
                try{
                    setIsLoading(true)
                    const { data } = await axios.get(`/users/search?value=${input}`)
                    setResults(data)
                }catch(err){
                    console.log(err)
                    setIsError(true)
                    setError(err)
                }finally{
                    setIsLoading(false)
                }
            }, 800)

            return () => {
                clearTimeout(timer)
            }
        }else if(input.length <= 1){
            setResults([])
        }
    },[input])

    return { input, setInput, results, isLoading, isError, error }

}

