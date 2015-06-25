/**
 * 首页路由模块
 */
var Line = require('../models/line');
exports.index = function(req,res){
    console.log('user in session');
    console.log(req.session.user);
    Line.fetch(function (err, lines) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: '资源管理系统',
            lines: lines
        })
    })
}
