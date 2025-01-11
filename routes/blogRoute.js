const express = require('express');
const router = express.Router();
const BlogPost = require('../model/blog.js'); // Assuming you have a BlogPost model

router.post('/create-blog', async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user.username;

        const newBlog = new BlogPost({
            title,
            content,
            author,
        });

        await newBlog.save();
        res.status(201).json({ message: 'Blog post created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while creating the blog post' });
    }
});

router.get('/blog', async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(400).send('Error fetching blog posts');
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        res.json(post);
    } catch (err) {
        res.status(400).send('Error fetching blog post');
    }
});

router.put('/blog/:id', async (req, res) => {
    try {
        const { title, author, content, tags } = req.body;
        const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, { title, author, content, tags }, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).send('Error updating blog post');
    }
});

router.delete('/blog/:id', async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.send('Blog post deleted successfully');
    } catch (err) {
        res.status(400).send('Error deleting blog post');
    }
});

module.exports = router;
