import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [values] = useSearch()

    // console.log(values.results.data.length);
    const navigate = useNavigate();

    return (
        <Layout title={'Search results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h5>
                        {values.results.data.length < 1 ? "No Products Found" : `Found ${values.results.data.length}`}
                    </h5>
                    <div className='d-flex flex-wrap'>
                        {values.results.data.map(p => (
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
                </div>
            </div>
        </Layout>
    )
}

export default Search