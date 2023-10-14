import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  // eslint-disable-next-line
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  //  Get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data && data.success) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  // Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  // Handle Check
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    }
    else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts()
    // eslint-disable-next-line
  }, [])

  // get total count 
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count')
      if (data) setTotal(data.total)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getTotal()
  }, [])

  // Load More
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      if (data) setProducts([...products, ...data.products])
    } catch (error) {
      if (page === 1) return;
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    loadMore()
  }, [page])

  //  Get Filtered Products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio })
      if (data) setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (checked.length || radio.length) filterProducts()
  }, [checked, radio])


  return (
    <Layout title={"All Products Best Offers"}>
      <div className='row mt-3 p-3'>
        <div className='col-md-2'>
          <h4 className='text-center'>Filter by Category</h4>
          <div className='d-flex flex-column'>
            {categories && categories.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className='text-center'>Filter by Price</h4>
          <div className='d-flex flex-column'>
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices && Prices.map(p => (
                // <div key={p._id}>
                <Radio key={p._id} value={p.array}>{p.name}</Radio>
                // </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex flex-column'>
            <button className='btn btn-danger'
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>

        {/* Price Filter */}
        <div className='col-md-9'>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products && products.map(p => (
              <div className='card m-2' key={p._id} style={{ width: '18rem' }}>
                <div className='card-body'>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className='card-img-top'
                    alt={p.name}
                  />
                  <h5 className='card-title'>{p.name}</h5>
                  <p className='card-text'>{p.description.substring(0, 25)}...</p>
                  <p className='card-text'>₹ {p.price}</p>
                  <button className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >More Details</button>
                  <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div>
            {products && products.length < total && (
              <button className='btn btn-warning' onClick=
                {(e) => {
                  e.preventDefault();
                  setPage(page + 1)
                }}>
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>

        </div>
      </div>
    </Layout>

  )
}

export default HomePage