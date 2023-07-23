import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import "./Auth.css"
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res=await axios.post("/api/v1/auth/login",{email,password})
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/")
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }
    return (
        <Layout title={'Login Page'}>
            <div className='container'>
                <div className="wrapper">
                    <form onSubmit={handleSubmit} >
                        <h1>Login</h1>
                        <div className="input-box">
                            <input type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Username" required />
                            <i className="fa-solid fa-user" />
                        </div>
                        <div className="input-box">
                            <input type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" required />
                            <i className="fa-solid fa-lock" />
                        </div>
                        <div className="remember-forgot">
                            <label htmlFor="chk"><input type="checkbox" id="chk" />Remember me</label>
                            <Link to="/">Forgot password</Link>
                        </div>
                        <button className="btn" type="submit">Login</button>
                        <div className="register-link">
                            <p>Don't have an account <Link to="/register">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login