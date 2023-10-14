import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useCategory() {
    const [categories, setCategories] = useState([])

    //  get Category
    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data && data.success) {
                setCategories(data.category)
            }
            // console.log(categories)
        } catch (error) {
            console.log(error)
        }
    }

    //  Calling get Category
    useEffect(() => {
        getCategories()
    }, [])
    return categories;
}