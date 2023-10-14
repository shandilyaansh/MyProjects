import express from "express";
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategory, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

// routes
router.post('/create-category',requireSignIN,isAdmin,createCategoryController)


// Update Category
router.put('/update-category/:id',requireSignIN,isAdmin,updateCategoryController);

// get All Category
router.get('/get-category',categoryController)

// get Single Category
router.get('/single-category/:slug',singleCategory)

// Delete Category
router.delete('/delete-category/:id',requireSignIN,isAdmin,deleteCategoryController)


export default router