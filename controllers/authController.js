import { compare } from "bcrypt";
import { comparePassword, hashPassword } from "../Helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        // Validation
        if (!name) return res.send({ message: 'Name is required' });
        if (!email) return res.send({ message: 'Email is required' });
        if (!password) return res.send({ message: 'Password is required' });
        if (!phone) return res.send({ message: 'Phone is required' });
        if (!address) return res.send({ message: 'Address is required' });
        if (!answer) return res.send({ message: 'Answer is required' });

        // Existing User
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered please login'
            })
        }
        //  RegisterUser
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, email, password: hashedPassword, phone, address, answer }).save();
        res.status(201).send({
            success: true,
            message: 'User Registered successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

// POST LOgin

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Email or Password'
            })
        }
        // check User
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        //  token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}
// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) res.status(400).send({ message: 'Email is required' })
        if (!answer) res.status(400).send({ message: 'Answer is required' })
        if (!newPassword) res.status(400).send({ message: 'NewPassword is required' })

        //  Check
        const user = await userModel.findOne({ email, answer })
        // Validation
        if (!user) {
            res.status(404).send({
                success: false,
                message: 'Invalid Email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password reset Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
            error
        })
    }
}

// Test 
export const testController = (req, res) => {
    res.send('Protected routes')
}