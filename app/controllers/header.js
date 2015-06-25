/**
 * Created by cassie on 15/1/14.
 * 左侧导航资源占用项目列表
 */
var Line = require('../models/line');
exports.header = function(req,res){
    var userId = req.session.user._id;
    Line
        .find({members:{$in:[userId]}})
        .exec(function(err,lines){
            if(err){
                console.log(err)
            }else{
                res.render('header',{
                    lines: lines
                })
            }
        })
}