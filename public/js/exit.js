/**
 * Created by cassie on 14/12/2.
 */
//退出该业务线
$(function () {
    $('.exit').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);
        swal({
            title: "您真的要退出吗?",
            text: "退出后将无法恢复!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "退出",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                //注意，ajax type可以是delete?其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
                type: 'POST',
                url: "/admin/line/my?id=" + id
            })
                .done(function (results) {
                    if (results.success === 1) {
                        swal("Success!", "您已成功退出!", "success");
                        if (tr.length > 0) {
                            tr.remove()
                        }
                    }
                })
        })
    })
})