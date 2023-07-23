import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import { Link } from 'react-router-dom'
// import {ToastsStore} from 'react-toasts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Navigation
    const navigate = useNavigate()
    // Form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // toast.success("Hello");
            const res = await axios.post("/api/v1/auth/register",
                { name, email, password, phone, address });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
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
        <Layout title={'Register here'}>
            <div className='container'>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Register</h1>
                        <div className="input-box">
                            <input type="text" value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name" required />
                            <i className="fa-solid fa-user" />
                        </div>
                        <div className="input-box">
                            <input type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email" required />
                            <i className="fa-solid fa-envelope" />
                        </div>
                        <div className="input-box">
                            <input type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" required />
                            <i className="fa-solid fa-key" />
                        </div>
                        <div className="input-box">
                            <input type="text" value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone" required />
                            <i className="fa-solid fa-phone" />
                        </div>
                        <div className="input-box">
                            <input type="text" value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address" required />
                            <i className="fa-solid fa-home" />
                        </div>
                        <div className="remember-forgot">
                            <label htmlFor="chk"><input type="checkbox" id="chk" />Remember me</label>
                        </div>
                        <button className="btn" type="submit">Register</button>
                        <div className="register-link">
                            <p>Already have an account <Link to="/login">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>

    )
}


export default Register