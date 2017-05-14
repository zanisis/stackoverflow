const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});
const Coment = require('../models/comment');
const Post = require('../models/posting');

let controllers = {}


// create comment
controllers.comment = (req,res,next)=>{
  console.log('params',req.params.id);

  let status = jwt.verify(req.headers.token, process.env.SECRET)
  console.log(status);
  let newComment = new Coment({
    user_id : status.id,
    comment : req.body.comment
  })
  newComment.save((err, result)=>{
    if(err) res.send(err)
    Post.update(
      { _id : ObjectId(req.params.id) },
      { $push : { commentid : result._id}}
    ).exec((err, data)=>{
      console.log('ini update', data);
      res.send({comment : result, updatePost : data})
    })
  })
}

// update comment
controllers.commentUpdate = (req,res,next)=>{
  Coment.findById(req.params.id, (err, data)=>{
    data.comment = req.body.comment || data.comment

    data.save((err, result)=>{
      if(err) res.send(err)
      res.send(result)
    })
  })
}

//delete comment
controllers.commentDelete = (req,res,next)=>{
  Coment.findByIdAndRemove(req.params.id, (err, data)=>{
    res.send(data)
  })
}

module.exports = controllers;