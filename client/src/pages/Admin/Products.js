import Layout from '../../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([])

  // Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      setProducts(data.products)
      // console.log(data) 
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong to fetching the product')
    }
  }

  //  Life Cycle method
  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <Layout title='Products'>
      <div className='container-fluid p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1 className='text-center'>All Products list</h1>
            <div className='d-flex row'>
              {products && products.map(p => (
                <Link key={p._id} className='product-link col-sm-4' to={`/dashboard/admin/product/${p.slug}`}>
                  <div className="card m-2 p-2" style={{ width: '18rem', height: '320px' }} key={p._id}>
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text"> {p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products