import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const ProductDetails = () => {

  const navigate = useNavigate()
  const params = useParams()
  const [product, setProduct] = useState([])
  const [relatedProduct, setRelatedProduct] = useState([])

  // initial datails
  useEffect(() => {
    if (params && params.slug) getProduct()
  }, [params.slug])

  //  Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setProduct(data.product)
      getSimilarProduct(data.product._id, data.product.category._id)
      // console.log(relatedProduct)
    } catch (error) {
      console.log(error)
    }
  }

  // Get similar product

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedProduct(data.products)
      console.log(relatedProduct)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Layout>
      <div className='row container mt-2'>
        <div className='col-md-6' width={'300'}>
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className='card-img-top'
            alt={product.name}
            height={'300'}
            width={'350px'}
          />
        </div>
        <div className='col-md-6 text-center'>
          <h1>Product Details</h1>
          <h4>{product.name}</h4>
          <h6>{product.description}</h6>
          {/* <h6>{product.category.name}</h6> */}
          <h6>{product.shipping}</h6>
          <h6>{product.price}</h6>
          <button className='btn btn-secondary'>Add to cart</button>
        </div>
      </div>
      <div className='row'>
        <h1>Similar Product</h1>
        <div className='d-flex flex-wrap'>
          {relatedProduct.map((p) => (
            <div className='card m-2' style={{ width: '18rem' }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className='card-img-top'
                alt={p.name}
              />
              <div className='card-body'>
                <h5 className='card-title'>{p.name}</h5>
                <p className='card-text'>
                  {p.description.substring(0, 30)}...
                </p>
                <p className='card-text'>₹ {p.price}</p>
                <button
                  className='btn btn-primary ms-1'
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button className='btn btn-secondary ms-1'>Add to cart</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails