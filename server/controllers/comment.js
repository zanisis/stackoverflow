const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});
const Comment = require('../models/comment');
const Post = require('../models/posting');

let controllers = {}


// create comment
controllers.comment = (req,res,next)=>{
  console.log('params',req.params.id);
  // Post.findOne({ _id : ObjectId(req.params.id)})
  //     .then(data=>{
  //       console.log(data);
  //     })

  Post.update(
    { _id : ObjectId(req.params.id) },
    { $push : { commentid : "59165d257cd3db27c7ec5a20"}}
  ).exec((err, data)=>{
    console.log('ini update', data);
    res.send(data)
  })

  // let status = jwt.verify(req.headers.token, process.env.SECRET)
  // console.log(status);
  // let newComment = new Comment({
  //   user_id : status.id,
  //   comment : req.body.comment
  // })
  // newComment.save((err, result)=>{
  //   if(err) res.send(err)
  //   res.send(result)
  // })
}

module.exports = controllers;