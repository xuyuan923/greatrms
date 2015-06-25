/**
 * Created by cassie on 15/1/17.
 * 根据请求参数来判断当前页，给class加in
 */
exports.pageIn = function(req,res,next){
    res.locals.activeNav = function(nav){
        var result = '';
        var _path = req.path;
        console.log('_path:'+req.path);
        if(nav == _path){
            result = 'active';
        }else{
            result = '';
        }
        return result;
    }
    next();
}
