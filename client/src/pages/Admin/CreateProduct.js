import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom';

const { Option } = Select



const CreateProduct = () => {

    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [category, setCategory] = useState("")
    const [photo, setPhoto] = useState("")

    // Get All Categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data && data.success) {
                setCategories(data.category)
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting Category')
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    //  Create category Button Submit
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            productData.append("shipping", shipping)

            const { data } = axios.post('/api/v1/product/create-product', productData)
            if (data && data.success) {
                toast.error(data.message)
            }
            else {
                toast.success('Product Created Successfully')
                navigate('/dashboard/admin/products')
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout title={'Dashboard Create-Product'}>
            <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <h1 className='des m-1 w-75 text-center'>Create Product</h1>
                        <div className='m-1 w-75 des'>
                            <Select bordered={false} placeholder="Select a Category"
                                size='large' showSearch  className='form-select mb-3'
                                onChange={(value) => { setCategory(value) }}
                            >
                                {categories && categories.map(c => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                <input type='text' value={name}
                                    placeholder='Write a name'
                                    className='form-control'
                                    autoComplete="off"
                                    id='name'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type='file' id='image' autoComplete="off" name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo && (
                                    <div className='text-center'>
                                        <img  src={URL.createObjectURL(photo)} alt='Product_photo' height={'200px'} className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={description}
                                    placeholder='Write a description'
                                    className='form-control'
                                    id='description'
                                    autoComplete="off"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input type='number' value={price}
                                    placeholder='Price'
                                    className='form-control'
                                    id='price'
                                    autoComplete="off"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input type='number' value={quantity}
                                    placeholder='Number of Quantity'
                                    className='form-control'
                                    id='quantity'
                                    autoComplete="off"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <Select
                                    bordered={false}
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    placeholder='Shipping Charge'
                                    onChange={(value) => setShipping(value)}
                                >
                                    <Option value='0'>No</Option>
                                    <Option value='1'>Yes</Option>
                                </Select>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary'
                                    onClick={handleCreate}
                                > Create Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct