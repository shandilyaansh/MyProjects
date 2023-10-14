import express from "express"
import { registerController, loginController, testController, forgotPasswordController } from "../controllers/authController.js"
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/register', registerController)

// Login || Post
router.post('/login', loginController);

// Forgot Password
router.post('/forgotPassword', forgotPasswordController)

// test Router
router.get('/test', requireSignIN, isAdmin, testController)

// Protected Routes
router.get('/user-auth', requireSignIN, (req, res) => {
    res.status(200).send({ ok: true })
})

// Protected Routes for Admin
router.get('/admin-auth',requireSignIN,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

export default router