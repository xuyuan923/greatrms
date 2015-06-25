/**
 * Created by cassie on 14/12/1.
 */
$(document).ready(function(){
    // 需求创建页日期选择器调用
    $('.datetimepicker').datetimepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-center",
        weekStart: 1,
        todayBtn:  1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    // 表单必填项验证
    $('#defaultForm')
        .bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            'issue[belongLineId]':{
                validators: {
                    notEmpty: {
                        message: '请选择所属业务线'
                    }
                }
            },
            'issue[title]': {
                validators: {
                    notEmpty: {
                        message: '请填写需求主题'
                    }
                }
            },
            'issue[start]':{
                validators: {
                    notEmpty: {
                        message: '请填写需求开始日期'
                    }
                }
            },
            'issue[end]':{
                validators: {
                    notEmpty: {
                        message: '请填写需求结束日期'
                    }
                }
            },
            'issue[role]':{
                validators: {
                    notEmpty: {
                        message: '请勾选需求所需角色'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function(e, field) {
            //提示保存成功
            swal({
                title: "Success!",
                text: "您已成功保存该需求!",
                type: "success",
                timer: 2000
            });
    });

    $('.datetimepicker1').on('changeDate', function(e) {
        $('#defaultForm').bootstrapValidator('revalidateField', 'issue[start]');
    });
    $('.datetimepicker2').on('changeDate', function(e) {
        $('#defaultForm').bootstrapValidator('revalidateField', 'issue[end]');
    });
})