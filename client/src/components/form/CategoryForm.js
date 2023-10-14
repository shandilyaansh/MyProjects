import React from 'react'
// import Layout from '../Layout/Layout'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" placeholder='Add Category' className="form-control"
                        id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={value} onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default CategoryForm