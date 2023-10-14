import express from "express";
import { isAdmin, requireSignIN } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProductController, productCountController, productFiltersController, productListController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router()
//  Routes
router.post('/create-product', requireSignIN, isAdmin, formidable(), createProductController)

// Get All products
router.get('/get-product', getProductController)

// Get Single Product
router.get('/get-product/:slug', getSingleProductController)

// Get Photo
router.get('/product-photo/:pid', getProductPhotoController)

// Product Delete
router.delete('/delete-product/:pid', requireSignIN, isAdmin, deleteProductController)

// Update Product
router.put('/update-product/:pid', requireSignIN, isAdmin, formidable(), updateProductController)

// Product Filtes
router.post('/product-filters',productFiltersController)

// Product Count
router.get('/product-count',productCountController)

//  Product Per Page
router.get('/product-list/:page',productListController);

// Search Product
router.get('/search/:keyword',searchProductController)

// Similar products
router.get('/related-product/:pid/:cid',relatedProductController)

export default router