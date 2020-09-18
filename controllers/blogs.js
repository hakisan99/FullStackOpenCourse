const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res, next) => {
    try {
        const result = await Blog.find({});
        res.json(result);
    } catch (err) {
        next(err)
    }
});

blogRouter.post('/', async (req, res, next) => {
    try {
        let postBlog = { ...req.body };
        if (!postBlog.likes) {
            postBlog = { ...req.body, likes: 0 }
        }
        const blog = new Blog(postBlog);
        const result = await blog.save();
        res.status(201).json(result);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: "Bad Request" });
        }
        next(err)
    }
});

blogRouter.delete('/:id', async (req, res, next) => {
    try {
        const deleteBlogID = req.params.id;
        const result = await Blog.findByIdAndDelete(deleteBlogID);
        res.status(204).json(result);
    } catch (err) {
        next(err)
    }
});

blogRouter.patch('/:id', async (req, res, next) => {
    try{
        const updateBlogID = req.params.id;
        const updateBlog = {...req.body};
        const result = await Blog.findByIdAndUpdate(updateBlogID,updateBlog);
        res.status(200).json(result);
    } catch (err){
        next(err)
    }
})

module.exports = blogRouter