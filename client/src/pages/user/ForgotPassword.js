import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
// import "./Auth.css"
import { toast } from 'react-toastify'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/auth/forgotPassword", { email, answer, newPassword })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login')
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }
    return (
        <Layout title={'Password Manager'}>
            <div className='container'>
                <div className="wrapper">
                    <form onSubmit={handleSubmit} >
                        <h1>Reset Password</h1>
                        <div className="input-box">
                            <input type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Username" required />
                            <i className="fa-solid fa-user" />
                        </div>
                        <div className="input-box">
                            <input type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter your birth place" required />
                            <i class="fa-solid fa-cake-candles"></i>
                        </div>
                        <div className="input-box">
                            <input type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password" required />
                            <i className="fa-solid fa-lock" />
                        </div>
                        <div className="remember-forgot">
                            <label htmlFor="chk"><span style={{margin:"10px"}}>Don't have any account ?</span></label>
                            <Link to={'/register'} >Register here</Link>
                        </div>
                        <button className="btn" type="submit">Reset</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword