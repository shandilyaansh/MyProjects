import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs'

//  Create Products
export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: 'Name is required' })
            case !description:
                return res.status(500).send({ message: 'Description is required' })
            case !price:
                return res.status(500).send({ message: 'Price is required' })
            case !quantity:
                return res.status(500).send({ message: 'Quantity is required' })
            case !category:
                return res.status(500).send({ message: 'Category is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ message: 'Photo is required and have a size less than 1mb' })
        }

        const products = await new productModel({ ...req.fields, slug: slugify(name) })

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(200).send({
            success: true,
            message: 'Product Created Successfully',
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating Product',
            error
        })
    }
}

//  Get All products

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: 'All products',
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting product information',
            error
        })
    }
}

//  Single Products

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).populate('category').select("-photo")
        res.status(200).send({
            success: true,
            message: 'Single Product fetched',
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error is getting product',
            error
        })
    }
}

//  Get Photo 

export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in loading image',
            error
        })
    }
}

// Delete Product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in deleting prpduct',
            error
        })
    }
}

// Update Product

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: 'Name is required' })
            case !description:
                return res.status(500).send({ message: 'Description is required' })
            case !price:
                return res.status(500).send({ message: 'Price is required' })
            case !quantity:
                return res.status(500).send({ message: 'Quantity is required' })
            case !category:
                return res.status(500).send({ message: 'Category is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ message: 'Photo is required and have a size less than 1mb' })
        }



        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save()

        res.status(200).send({
            success: true,
            message: 'Product Updated Successfully',
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Updation',
            error
        })
    }
}

//  Filters Controller
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {};
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error while filtering products',
            error
        })
    }
}

// Product Count Controller

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in Counting Product',
            error
        })
    }
}

//  Product List based on page
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).
            limit(perPage).sort({ price: 0 })
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in product page ',
            error
        })
    }
}

// Search Product Controller

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo")
        res.json(results)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in Product Searching'
        })
    }
}

// Similar Product

export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category")
        res.status(200).send({
            success:true,
            message:'Related Product',
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error while getting related product',
            error
        })
    }
} 