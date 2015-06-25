var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//密码加密工具
var bcrypt = require('bcrypt');
var SALT_WORK_FACTORY = 10;
var UserSchema = new Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    role: Number,
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
UserSchema.pre('save',function(next){
    var user = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    //密码加盐
    bcrypt.genSalt(SALT_WORK_FACTORY,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        })
    });
})


//实例方法，从实例里调
UserSchema.methods = {
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    }
}

//静态方法，从模型里来调
UserSchema.statics = {
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

module.exports = UserSchema;
