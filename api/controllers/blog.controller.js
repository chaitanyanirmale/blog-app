import fs from 'fs'
import blog from '../models/blog.model.js';
import imagekit from '../imageKit.js';

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