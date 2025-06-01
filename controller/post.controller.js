import Post from '../model/blog.model.js';
import mongoose from 'mongoose';


export const getPosts = async (req,res) =>{
    try{
        const posts = await Post.find({});
        res.status(200).send({'success':true,'post':posts});
    }
    catch(error){
        res.status(400).send({'success':false,'message':error});
    }
};

export const getPost = async (req,res)=>{
    try{
        const {id} = req.params;
        const post = await Post.findById(id);

        if(!post){
            return res.status(404).send({success:false,message:"product not found"});
        }
        res.status(200).send({'success':true,'post': post});
    }
    catch(error){
        res.status(400).send({'success':false,'message':error.message});
    }
};

export const createPost = async (req, res) => {
  try {
     
    const post = new Post(req.body);
    await post.save();
    res.status(200).send({ 'success': true, 'post':post });
  } catch (error) {
    console.error("Error while saving:", error);
    res.status(400).send({ 'success': false, 'message' : error.message });
  }
};

export const updatePost = async (req,res)=>{
    try{

        const {id} = req.params;
        const isavail = await Post.findById(id);
        
        if(!isavail){
            return res.status(404).send({'success':false,'message':'post not available to edit'});
        }

        const data = req.body;

        const update = await Post.findByIdAndUpdate(id,data,{new:true});

        res.status(200).send({'success':true,message:update});

    }catch(error){
        res.status(400).send({'success':false,'message':error.message});
    }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send({ 'success': false, 'message': "Requested post not available" });
    }

    await Post.findByIdAndDelete(id); 
    res.status(200).send({ 'success': true, 'message': "Post deleted successfully" });
  } catch (error) {
    res.status(400).send({ 'success': false, 'message' : error.message });
  }
}