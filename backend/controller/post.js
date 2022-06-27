const Post = require('../models/post');


exports.createPost = (req, res, next) => {
  const url = req.protocol +'://'+ req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath:url +"/images/" + req.file.filename,
    creator :req.userData.userId
  });

  post.save().then(createdPost => {
    res.status(201).json({
      message: 'post added succesfully',
      post :{
        ...createdPost,
        id : createdPost._id
      }
    });
  }).catch(error =>{
    res.status(500).json({
      message:"Post not saved"
    })
  });

}

exports.updatePost =(req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol +'://'+ req.get("host");
    imagePath=url +"/images/" + req.file.filename;
  }
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath : imagePath,
    creator :req.userData.userId
  })
  Post.updateOne({ x_id: req.params.id ,creator: req.userData.userid}, post).
  then(result => {
    if(result.n >0){
      res.status(200).json({
        message: 'update sucessfull'
      })
    }
    else {
      res.status(401).json({
        message: 'Not Authorised'
      })
    }

  }).catch(error =>{
    res.status(500).json({
      message :'Post not updated'
    })
  })
}

exports.getPost =(req, res, next) => {
  const pagesize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchPosts;
  if (pagesize && currentPage) {
    postQuery
      .skip(pagesize * (currentPage - 1))
      .limit(pagesize);
  }

  postQuery.then(documents => {
    fetchPosts = documents;
    return Post.count();
  })
    .then(count => {
      res.json({
        message: 'data Fetched sucessfully',
        posts: fetchPosts,
        maxPosts: count
      });
    }).catch(error => {
      res.status(500).json({
        message: 'fetching post failed'
      })
    });
}

exports.getPostByID =(req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'post not found' });
    }
  })
}

exports.deletePost =(req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: 'Deletion sucessfull'
      })
    }
    else {
      res.status(401).json({
        message: 'Not Authorised'
      })
    }
  });
}
