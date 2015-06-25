/**
 * Created by cassie on 14/11/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//作为字段的类型，也为了关联文档的查询
var ObjectId = Schema.Types.ObjectId;
var IssueSchema = new Schema({
    creator: {
        type: ObjectId,
        ref: 'User'
    },
    belongLineId: {
        type: ObjectId,
        ref: 'Line'
    },
    title: String,
    desc: String,
    start: Date,
    end: Date,
    url: String,
    condition: Number,
    role: [Number],  //需求所需角色为数组
    unAllocatedRole: [Number],  //未认领需求的角色
    allocatedRole: [Number],  //已认领需求的角色
    allocate: [
        {
            roleType: Number,
            allocated: Boolean,
            memberId: {
                type: ObjectId,
                ref: 'User'
            }
        }
    ],
    members: [{
        type: ObjectId,
        ref: 'User'
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

IssueSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
})

IssueSchema.statics = {
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

module.exports = IssueSchema;
