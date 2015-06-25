/**
 * Created by cassie on 15/1/15.
 * 获取登录用户所在的业务线
 */
$(document).ready(function(){
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
    var lineName = getQueryString('lineName');
    $.ajax({
        type: 'POST',
        url: '/admin/line/list/left'
    }).done(function(results){
        var $lineList = $('.line-list-left');
        if(!results.length) return false;
        else{
            if(!$lineList) return false;
            if($lineList.length){
                for(var i=0;i<results.length;i++){
                    if(lineName === results[i].name){
                        $lineList.prepend('<li><a class="active" href="/admin/role/line?lineName='+results[i].name+'&lineId='+results[i]._id+'"><i class="project"></i><span>'+results[i].name+'</span></a></li>')
                    }else{
                        $lineList.prepend('<li><a href="/admin/role/line?lineName='+results[i].name+'&lineId='+results[i]._id+'"><i class="project"></i><span>'+results[i].name+'</span></a></li>')
                    }
                }
            }
        }
    })

})
