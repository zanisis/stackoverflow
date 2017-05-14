const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'})

const Post = require('../models/posting');

let controllers = {}

//get all data
controllers.getAll = (req,res,next)=>{
  Post.find({})
  .populate('user_id commentid')
  .exec((err, posts)=>{
    if(err) res.send(err)
    res.send(posts)
  })
}

// get data
controllers.getData = (req,res,next)=>{
  Post.findById(req.params.id)
  .populate('user_id commentid')
  .exec((err, post)=>{
    if(err) res.send(err)
    res.send(post)
  })
}

//create posting
controllers.posting = (req, res, next) => {
  console.log(req.headers.token);
    let status = jwt.verify(req.headers.token, process.env.SECRET);
    // console.log(status);
    let newPost = new Post({
      user_id : status.id,
      title : req.body.title,
      message : req.body.message
    })
    newPost.save((err, post)=>{
      res.send(post)
    })
}

//update posting
controllers.updatePost = (req,res,next)=>{
  // let status = jwt.verify(req.headers.token, process.env.SECRET);
  Post.findById(req.params.id, (err, data)=>{
    if(err) res.send(err)

    data.title = req.body.title || data.title
    data.message = req.body.message || data.message

    data.save((err, result)=>{
      res.send(result)
    })
  })
}

//delete posting
controllers.delete = (req,res,next)=>{
  let status = jwt.verify(req.headers.token, process.env.SECRET);
  console.log(status.id, req.params.id);
  Post.findById(req.params.id, (err, result)=>{
  console.log(result.user_id);
    if(err) res.send(err)
    if(result.user_id == status.id){
      Post.findByIdAndRemove(req.params.id,(err, result)=>{
        if(err) res.send(err)
        res.send(result)
      })
    } else {
      res.send({message : 'not authorized'})
    }
  })

}

module.exports = controllers;