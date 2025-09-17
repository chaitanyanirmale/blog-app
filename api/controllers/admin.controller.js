import jwt from 'jsonwebtoken'
import blog from '../models/blog.model.js';
import Comment from '../models/comment.model.js';

export const adminLogin = async (req, res) =>{
    try {
        const {email, password} = req.body;
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Invalid Username and Password"})
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogsAdmin = async (req, res) =>{
    try {
        const blogs = await blog.find({}).sort({createdAt: -1});
         res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllComments = async (req, res) =>{
    try {
        const comments = await Comment.find({}).populate('blog').sort({createdAt: -1});
         res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
        
    }
}

export const getDashboard = async (req, res) =>{
    try {
        const recentBlogs = await blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await blog.countDocuments({isPublished: false});
        const dashboardData = {
            recentBlogs,
            blogs,
            comments,
            drafts
        }
        res.json({success: true, dashboardData})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteCommentById = async (req, res) =>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, message: "Comment deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const approveCommentById = async (req, res) =>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        await commentData.save();
        res.json({success: true, message: "Comment approved successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
