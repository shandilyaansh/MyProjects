import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

// Create Category
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is required' })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: 'Category Already exist'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: 'New Category added',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Category'
        })
    }
}

// Update Category Controller

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Category Updated Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in category upadate',
            error
        })
    }
}

//  get All Category
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: 'All category Lists',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error While getting All category'
        })
    }
}

//  Single Category Getting

export const singleCategory = async (req, res) => {
    try {
        // const {slug}=req.params
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: 'Get Single Category',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting Single Category',
            error
        })
    }
}

//  Delete Category

export const deleteCategoryController =async(req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category deleted Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in deleting category',
            error
        })
    }
}