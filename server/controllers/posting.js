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

//create posting
controllers.posting = (req, res, next) => {
    let status = jwt.verify(req.headers.token, process.env.SECRET);
    console.log(status);
    let newPost = new Post({
      user_id : status.id,
      title : req.body.title,
      message : req.body.message
    })
    newPost.save((err, post)=>{
      res.send(post)
    })
}

module.exports = controllers;