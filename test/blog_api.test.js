
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/test_helper');
const app = require(`../app`);
const Blog = require('../models/blog');
const api = supertest(app);



beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initBlogs.map(blogObject => new Blog(blogObject));
    const blogsPromise = blogObjects.map(blog => blog.save());
    await Promise.all(blogsPromise);
});


test('blog are return as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
});

test('blogs are return with the correct amount', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(helper.initBlogs.length)
});

test('blog have id as unique identifier', async () => {
    const res = await api.get('/api/blogs');
    const blogID = await res.body.map(blog => blog.id);
    expect(blogID).toBeDefined();
});

test('blog is saved and have correct content', async () => {
    const postBlog =
    {
        title: "Stranger Stuff",
        author: "My dude",
        url: "google.com",
        likes: "10"
    };
    const res = await api.post('/api/blogs').send(postBlog);
    expect(res.status).toBe(201);
    const blogsInDB = await helper.allBlogs();
    expect(blogsInDB.length).toBe(helper.initBlogs.length + 1);
    expect(res.body.title).toContain('Stranger Stuff');
});

test('blog will be default 0 if It doesnt exist in request', async () => {
    const postBlog =
    {
        title: "A Blog",
        author: "A Author",
        url: "bing.com"
    };
    const sentBlog = await api.post('/api/blogs').send(postBlog);
    const blogsInDB = await helper.allBlogs();
    expect(blogsInDB.length).toBe(helper.initBlogs.length + 1)
    expect(sentBlog.body.likes).toBe(0);
});

test('blog without title or url will get code 400', async () => {
    const postBlog =
    {
        author: "A Author"
    };
    const sentBlog = await api.post('/api/blogs').send(postBlog);
    const blogsInDB = await helper.allBlogs();
    expect(blogsInDB.length).toBe(helper.initBlogs.length)
    expect(sentBlog.status).toBe(400);
});

test('deleting blog remove one blog and return 204', async()=> {
    const deleteBlogID = helper.initBlogs[0]._id;
    const resDelete = await api.delete(`/api/blogs/${deleteBlogID}`);
    const blogsInDB = await helper.allBlogs();
    expect(blogsInDB.length).toBe(helper.initBlogs.length - 1);
    expect(resDelete.status).toBe(204);
});

test('updating blog should receive 200 code and update the correct blog', async() => {
    const updateBlogID = helper.initBlogs[0]._id;
    const updateBlog = {...helper.initBlogs[0],likes: 399};
    const resUpdate = await api.patch(`/api/blogs/${updateBlogID}`).send(updateBlog);
    const blogsInDB = await helper.allBlogs();
    expect(blogsInDB.length).toBe(helper.initBlogs.length);
    expect(resUpdate.status).toBe(200);
    const afterUpdateBlog = {...blogsInDB[0]};
    delete afterUpdateBlog.id;
    delete updateBlog.__v;
    delete updateBlog._id;
    expect(afterUpdateBlog).toEqual(updateBlog);
});

afterAll(() => {
    mongoose.connection.close()
})

