/**
 * Created by cassie on 14/11/29.
 */
// 认领需求
$(function () {
    $('.allocate').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.issue-id-'+id);
        $.ajax({
            //注意，ajax type可以是delete?其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
            type: 'POST',
            url: "/admin/line/list/my?id=" +id
        })
            .done(function (results) {
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove()
                    }
                }
            })
    })
})