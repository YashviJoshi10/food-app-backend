const categoryModel = require('../models/categoryModel')

const createCategory = async(req,res)=>{
    try {
        const {title, imageUrl} = req.body
        if(!title){
            res.status(400).send({
                success:false,
                message:"please provide title or image"
            })
        }
        const category = await categoryModel.create({title,imageUrl})
        res.status(201).send({
            success:true,
            message:"category successfully created",
            category
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in create category api"
        })
    }
}

const getAllCategories = async(req,res) => {
    try {
        const categories = await categoryModel.find({})
        if(!categories){
            res.status(404).send({
            success:false,
            message:"no categories found",
            })
        }

        res.status(201).send({
            success:true,
            message:"all categories fetched successfully",
            totalCat:categories.length,
            categories
        })

    } catch (err) {
        res.status(500).send({
            success:false,
            message:"Error in get all categories API",
            err
        })
    }
}

const updateCategory=async(req,res)=>{
    try {
        const category = await categoryModel.findById(req.params.id)
        if(!category){
            res.status(404).send({
            success:false,
            message:"no category found",
            })
        }
        const {title,imageUrl} = req.body
        if(title) category.title = title
        if(imageUrl) category.imageUrl = imageUrl

        await category.save()

        res.status(200).send({
            success:true,
            message:"category updated succesfully",
            category
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in update category API",
            err
        })
    }
}

const deleteCategory=async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(404).send({
            success:false,
            message:"category not found",
            })
        }
        await categoryModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:"category deleted succesfully",
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in delete category API",
            error:error
        })
    }
}

module.exports={
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}