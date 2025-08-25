import fs from 'fs'
import blog from '../models/blog.model.js';
import imagekit from '../imageKit.js';
import Comment from '../models/comment.model.js';

export const addBlog = async (req, res) =>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
        }
        const fileBuffer = fs.readFileSync(imageFile.path);
        
        //upload the imaage on imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        const optimizeImageURL = imagekit.url({
            path:response.filePath,
            transformation: [
                {quality: 'auto'}, //auto compression
                {format: 'webp'}, //convert to modern format
                {width: '1280'} //width resizing
            ]
        })

        const image = optimizeImageURL;

        await blog.create({
            title, subTitle, description, category, image, isPublished
        })
        
        res.json({success:true, message: "Blog added Successfully"})
    } catch (error) {
        res.json({success:false, message: error.message})  
    }
}

export const getAllBlogs = async (req, res) =>{
    try {
        const blogs = await blog.find({isPublished: true}).sort({createdAt: -1});
        res.json({success:true, blogs})
    } catch (error) {
        res.json({success:false, message: error.message})  
    }
}

export const getBlogById = async (req, res) =>{
    try {
        const {blogId} = req.params;
        const blogData = await blog.findById(blogId);
        if(!blogData){
            return res.json({success:false, message: "Blog not found"})
        }
        res.json({success:true, blog: blogData})
    } catch (error) {
        res.json({success:false, message: error.message})  
    }
}
export const deleteBlogById = async (req, res) =>{
    try {
        const {id} = req.body;
        await blog.findByIdAndDelete(id);
        res.json({success:true, message: "Blog deleted successfully"})
    } catch (error) {
        res.json({success:false, message: error.message})  
    }
}

export const togglePublish = async (req, res) =>{
    try {
        const {id} = req.body;
        const blogData = await blog.findById(id);
        blog.isPublished = !blogData.isPublished;
        await blogData.save();
         res.json({success:true, message: "Blog status updated"})
    }catch (error) {
        res.json({success:false, message: error.message})  
    }
}


export const addComment = async (req, res) =>{
    try {
        const {blog, name, content} = req.body;
        await Comment.create({
            blog,
            name,
            content
        })
        res.json({success:true, message: "Comment added for review"})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

export const getBlogComments = async (req, res) =>{
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success:true, comments})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

