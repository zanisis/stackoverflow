const mongoose = require('mongoose');
var Schema = mongoose.Schema

const commentSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  comment: {type : String, required : true},
  vote_up: {type : Number, default: false, default: 0},
  vote_down: {type : Number, default: false, default: 0}
});

let Answer = mongoose.model('Answer', commentSchema)

module.exports = Answer;
