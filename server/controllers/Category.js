const Category = require('../models/categoryModel');

exports.createCategory = async(req,res) =>{
    try{

        const {name,description} = req.body;

        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }

        await Category.create({
            name,
            description
        });

        return res.status(200).json({
            success:true,
            message:"Tag created successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue in creating tag",
            data:error.message
        })
    }
}

exports.getAllCategory = async(req,res) => {
    try{

        const allCategory = await Category.find({},{name:true,description:true});

        return res.status(200).json({
            success:true,
            message:"All tags fetched successfully",
            data:allCategory
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue in fetching all tag details",
            data:error.message
        })
    }
}

exports.getCategoryDetails = async(req,res) => {
    try{
        const {categoryId} = req.body;

        const selectedCategory = await Category.findById(categoryId)
                                                .populate("course").exec();

        


        if(!selectedCategory){
            return res.status(500).json({
                success:false,
                message:"Data not found"
            })
        }       
        
        const selectedCourses = selectedCategory.course;
        
        const differentCategories = await Category.findById({_id:{$ne : categoryId}})
                                                           .populate("course").exec();

        let differentCourses = [];
        for(const category of differentCategories){
            differentCourses.push(...category.course);
        }

        // most 10 selling courses for particular id
        const mostSellingCourses = selectedCourses.sort((a,b) => b.sold-a.sold).slice(0,10);

        return res.status(200).json({
            success:true,
            message:"Ctegory data fetched",
            data:{
                selectedCourses,
                differentCourses,
                mostSellingCourses
            }
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in fetching category details",
            data:error.message
        })
    }
}