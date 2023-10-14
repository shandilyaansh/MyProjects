import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
// import { set } from 'mongoose';

const { Option } = Select

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()

    // const [products] = useState([])
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [category, setCategory] = useState("")
    const [photo, setPhoto] = useState("")
    const [id, setId] = useState("")

    // Get Single Product
    const getSingleProduct = async () => {
        try {
            // console.log(id)
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setName(data.products.name);
            setId(data.products._id);
            setDescription(data.products.description);
            setPrice(data.products.price);
            // setPrice(data.products.price);
            setQuantity(data.products.quantity);
            setShipping(data.products.shipping);
            setCategory(data.products.category._id);
            // setPhoto(data.productData.photo.data)

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        getSingleProduct()
        // eslint-disable-next-line
    }, [])

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
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("category", category)
            // productData.append("shipping", shipping)

            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData)
            if (data && data.success) {
                toast.success(data.message)
                navigate('/dashboard/admin/products')

            }
            else {
                toast.error(data.message)
                // navigate('/dashboard/admin/products')
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    // Delete Product
    const handleDelete = async () => {
        try {
            let answer = window.prompt('Are sure want to delete this product?')
            if(!answer)return;
            // eslint-disable-next-line
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`)
            toast.success('Product Deleted Successfully')
            navigate('/dashboard/admin/products')
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout title={'Dashboard Update-Product'}>
            <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <h1 className='des m-1 w-75 text-center'>Update Product</h1>
                        <div className='m-1 w-75 des'>
                            <Select bordered={false} placeholder="Select a Category"
                                size='large' showSearch className='form-select mb-3'
                                onChange={(value) => { setCategory(value) }}
                                value={category}
                            >
                                {categories && categories.map(c => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                <input type='text' value={name}
                                    placeholder='Write a name'
                                    className='form-control'
                                    id='name'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type='file' id='image' autoComplete="off"
                                        name='photo' accept='image/*'
                                        onChange={(e) => setPhoto(e.target.files[0])} hidden
                                    />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo ? (
                                    <div className='text-center'>
                                        <img src={URL.createObjectURL(photo)} alt='Product_photo'
                                            height={'200px'} className='img img-responsive'
                                        />
                                    </div>
                                ) : (
                                    (
                                        <div className='text-center'>
                                            <img
                                                src={`/api/v1/product/product-photo/${id}`}
                                                alt="product_photo"
                                                // value={photo}
                                                height={'200px'}
                                                className="img img-responsive"
                                            />
                                        </div>
                                    )
                                )
                                }
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input type='number' value={price}
                                    placeholder='Price'
                                    className='form-control'
                                    id='price'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <input type='number' value={quantity}
                                    placeholder='Number of Quantity'
                                    className='form-control'
                                    id='quantity'
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
                                    value={shipping ? 'Yes' : 'No'}
                                >
                                    <Option value='0'>No</Option>
                                    <Option value='1'>Yes</Option>
                                </Select>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary'
                                    onClick={handleUpdate}
                                > Update Product</button>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-danger'
                                    onClick={handleDelete}
                                > Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct