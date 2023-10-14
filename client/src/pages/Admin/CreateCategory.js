import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios'
import CategoryForm from '../../components/form/CategoryForm'
import { Modal } from 'antd'
import './Admin.css'

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    // Handle form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data && data.success) {
                toast.success(`${name} is created`)
                getAllCategories()
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            // console.log(error),
            toast.error('Something went wrong in input form')
        }
    }
    // Get All Category
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong to getting categories')
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    // Update Category
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                toast.success(`${updatedName} is updated`)
                setSelected(null);
                setUpdatedName("")
                setVisible(null)
                getAllCategories()
            }
            else toast.error(data.message)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    // Delete Category 

    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`)
            if (data.success) {
                toast.success(`Category is deleted`)
                getAllCategories()
            }
            else toast.error(data.message)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout title={'Dashboard Create-Category'}>
            <div className='container-fluid  p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <h1 className='text-center des w-75 m-1 mt-0'>Manage Category</h1>
                        <div className='p-3 w-75 des m-1' >
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75 des m-1'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories && categories.map((c) => (
                                        // <>
                                        <tr key={c._id}>
                                            <td>{c.name}</td>
                                            <td>
                                                <button className='btn btn-primary ms-2'
                                                    onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c)
                                                    }}
                                                >Edit
                                                </button>
                                                <button className='btn btn-danger ms-2'
                                                    onClick={() => { handleDelete(c._id) }}
                                                >Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)}
                            open={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory