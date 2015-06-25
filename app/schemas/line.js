var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//作为字段的类型，也为了关联文档的查询
var ObjectId = Schema.Types.ObjectId;
var LineSchema = new Schema({
    creator: {
      type: ObjectId,
      ref: 'User'
    },
    name: String,
    desc: String,
    members: [{
        type: ObjectId,
        ref: 'User'
    }],
    issues: [{
       type: ObjectId,
        ref: 'Issue'
    }],
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

LineSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
})

LineSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

module.exports = LineSchema;
