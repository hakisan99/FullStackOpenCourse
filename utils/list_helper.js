const _ = require('lodash');

const dummy = (blog) => {
    blog = 1
    return blog
};

const totalLikes = (blogs) => {
    const blogsLikes = blogs.map(blog => blog.likes);
    const reducer = (sumLike,likes) => {
        return sumLike + likes
    };
    return blogsLikes.reduce(reducer)
};

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((prev,next) => {
        return prev.likes > next.likes? prev : next
    });
    return mostLikes
};

const mostBlogs =(blogs) => {
    const countByBlog = _.countBy(blogs,'author');
    let mostBlogAuthor = {name : "", blogs: 0};
    for(let i in countByBlog){
        if(mostBlogAuthor.blogs < countByBlog[i]){
            mostBlogAuthor = {author: i, blogs: countByBlog[i]};      
        }
    }
    return mostBlogAuthor
};

const mostLikes = (blogs) => {
    const groupByAuthor = _.groupBy(blogs,'author');
    let authorTotalLikesArr = [];
    for( let author in groupByAuthor) {
        let sum = totalLikes(groupByAuthor[author]);
        authorTotalLikesArr.push({author: author, likes: sum});
    }
    const mostLikesAuthor = favoriteBlog(authorTotalLikesArr);
    return mostLikesAuthor
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}