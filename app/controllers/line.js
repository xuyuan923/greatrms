/**
 * 业务线
 */
var Line = require('../models/line');
var User = require('../models/user');
var _ = require('underscore');
//业务线详情页
exports.detail = function (req, res) {
    var id = req.params.id;
    Line
        .findOne({_id: id})
        .populate('issues', 'title')
        .populate('members', 'name')
        .populate('creator', 'name')
        .exec(function (err, line) {
            console.log('line:');
            console.log(line);
            if (err) console.log(err)
            res.render('lineDetail', {
                title: line.name,
                line: line
            })
        })
};

//业务线后台录入
exports.new = function (req, res) {
    User.find({}, function (err, users) {
        res.render('line', {
            title: '新建业务线',
            line: {
                name: '',
                desc: '',
                creator: req.session.user._id,
                issues: '',
                members: ''
            },
            users: users
        })
    })
};

//业务线更新
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Line.findById(id, function (err, line) {
            console.log('updateline:'+line);
            User.find({}, function (err, users) {
                    console.log('updateusers:'+users);
                    res.render('line', {
                        title: '更新业务线',
                        line: line,
                        users: users
                    })
                }
            )
        })
    }
};

// admin post line
exports.save = function (req, res) {
    var id = req.body.line._id;
    var lineObj = req.body.line;
    var _line;
    //修改业务线
    if (id !== 'undefined') {
        Line.findById(id, function (err, line) {
            console.log('line:'+line);
            if (err) {
                console.log(err)
            }
            _line = _.extend(line, lineObj);
            var lineArray = []; //登录用户所在的业务线数组
            _line.save(function (err, line) {
                if (err) {
                    console.log(err)
                }else{
                    res.redirect('/line/' + _line.id)
                }
            })
        })
    } else {
        //新建业务线
        _line = new Line({
            desc: lineObj.desc,
            name: lineObj.name,
            creator: lineObj.creator,
            members: lineObj.members
        });
        //var lineId = _line._id;
        //var membersArray = lineObj.members;
        //var membersLength = lineObj.members.length;
        //改成下面，对应的jade value也需要改
        //_line = new Line(lineObj);
        _line.save(function (err, line) {
            if (err) {
                console.log(err)
            }else{
                //for(var i = 0;i<membersLength;i++){
                //    User.update({_id:membersArray[i]},{$push:{lines:lineId}}).exec();
                //}
                res.redirect('/line/' + _line.id)
            }
        })
    }
};

//业务线列表页
exports.list = function (req, res) {
    Line.fetch(function (err, lines) {
        if (err) {
            console.log(err)
        }
        res.render('lineList', {
            title: '业务线列表页',
            lines: lines
        })
    })
};

//删除该业务线
//所有put/delete方法都可以使用post方法
exports.del = function (req, res) {
    var id = req.query.id;
    if (id) {
        Line.remove({_id: id}, function (err, line) {
            if (err) {
                console.log(err)
            }
            else {
                res.json({success: 1})
            }
        })
    }
};

//我的业务线
exports.my = function (req, res) {
    //查找我所在的业务线，罗列出所有需求
    var userId = req.session.user._id;
    //如果登陆者在业务线内
    if (userId) {
        //首先找到我在的业务线组
        Line
            .find({members: userId})
            .populate('members', 'name')
            .populate('creator', 'name')
            .sort({_id: -1})
            .exec(function (err, lines) {
                res.render('myLine', {
                    title: '我的主页-业务线',
                    lines: lines
                })
            })
    }
}

//退出业务线
exports.exit = function (req, res) {
    var id = req.query.id;
    var userId = req.session.user._id;
    if (id) {
        Line
            .update({_id: id}, {$pull: {members: userId}})
            .exec(function (err, lines) {
                if (err) {
                    console.log(err)
                }
                else {
                    res.json({success: 1})
                }
            });
    }
}

//修改业务线-增加新成员
exports.addMember = function(req,res){
    var newMemberName = req.query.name;
    if(newMemberName){
        User
            .find({name:new RegExp(newMemberName+'.*','i')},{_id:1,name:1})
            .exec(function(err,users){
                res.json(users)
            })
    }
}

//左侧资源占用-登录用户所在业务线
exports.postPersonalLine = function(req,res){
    var userId = req.session.user._id;
    if (userId) {
        //首先找到我在的业务线组
        Line
            .find({members: userId})
            .exec(function (err, lines) {
                if(err) console.log(err)
                else{
                    res.json(lines);
                }
            })
    }
}

