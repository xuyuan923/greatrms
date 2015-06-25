/**
 * Created by cassie on 14/12/25.
 */
$(function(){
    //发送业务线关键词并返回业务线id
    $('.line-name-input').on('keyup',function(e){
        var $target = $(e.target);
        var lineName = $target[0].value;
        var ul = [];
        $.ajax({
            type: 'POST',
            url: '/admin/line/role?lineName='+lineName
        })
            .done(function(results){
                if(!results.length){
                    $('#related-line').children().remove();
                    $('#select-role').hide();
                }
                if(results.length){
                    $('#related-line li').remove();
                    for(var i=0;i<results.length;i++){
                        var relatedLineName = results[i].name;
                        var relatedLineId = results[i]._id;
                        var li = "<li data-id="+relatedLineId+" "+"data-name="+relatedLineName+">"+relatedLineName+"<span class='glyphicon glyphicon-plus' style='float:right'></span>"+"</li>";
                        ul.push(li);
                    }
                    $('#related-line').show().append(ul);

                    //点击下拉业务线，将该业务线选中并添加
                    $('#related-line li').click(function(e){
                        $('#selectLine').remove();
                        $('#selectRole').remove();
                        $('#selectMember').remove();
                        $('#select-role').show();
                        var $targetLi = $(e.target);
                        var selectedLineName = $targetLi.data('name');
                        var selectedLineId = $targetLi.data('id');
                        var lineSelect = "<div id='selectLine'><span class='selectLine'>业务线:<span data-id="+selectedLineId+" "+"class='select-line'>"+selectedLineName+"</span></span><i class='toright'></i></div>";
                        $('#currentOption').append(lineSelect);
                        var a = new renderCalendar();
                        a;
                    });
                }
            })
    });

    //选择角色，发送角色ID，返回该角色的相关人员
    //选择角色，给选中角色加上selected，button-primary样式
    $('.filterRole').click(function(e){
        $('.filterMember').remove();
        $('.error').remove();
        $('#selectRole').remove();
        $('.selectMember').remove();
        var target = $(e.target);
        var memberButton = [];
        $('.filterRole').removeClass('selected btn-primary').addClass('btn-default');
        target.addClass('selected btn-primary').removeClass('btn-default');
        var roleName = $('.selected')[0].innerHTML;
        var roleId = $('.selected')[0].value;
        var roleSelect = "<div id='selectRole'><span class='selectRole'>角色:<span data-id="+roleId+" "+"class='select-role'>"+roleName+"</span></span><i class='toright'></i></div>";
        $('#currentOption').append(roleSelect);
        var roleId = $('.selected')[0].value;
        var lineName = $('.select-line')[0].innerHTML;
        console.log('lineName:'+lineName);
        if(!roleId.length) return false;
        if(roleId.length){
            $.ajax({
                type: 'POST',
                url: '/admin/line/chooseRole?roleId='+roleId + ((lineName !== null) ? '&lineName=' + lineName : '&lineName=')
            })
                .done(function(results){
                    console.log('results:'+results);
                    var b = new rerenderCalendar();
                    b;
                    if(!results.length){
                        $('#select-member').show().find('.btn-group').append('<span class="error" style="height:34px;line-height:34px">该角色下没有相关成员</span>');
                    };
                    if(results.length){
                        for(var i=0;i<results.length;i++){
                            var memberName = results[i].name;
                            var memberId = results[i]._id;
                            console.log('memberName:'+memberName);
                            var eachMember = "<button class='filterMember btn btn-default' type='text' value="+memberId+">"+memberName+"</button>";
                            memberButton.push(eachMember);
                        }
                        $('#select-member').show().find('.btn-group').append(memberButton);
                        $('.filterMember').click(function(e){
                            $('.selectMember').remove();
                            var target = $(e.target);
                            $('.filterMember').removeClass('selectedMember btn-primary').addClass('btn-default');
                            target.addClass('selectedMember btn-primary').removeClass('btn-default');
                            var memberName = $('.selectedMember')[0].innerHTML;
                            var memberId = $('.selectedMember')[0].value;
                            var memberSelect = "<span class='selectMember'>成员:<span data-id="+memberId+" "+"class='select-member'>"+memberName+"</span></span>";
                            $('#currentOption').append(memberSelect);
                            var c = new rerenderCalendar();
                            c;
                        })
                    }
                })
        }
    });

    //fullcalendar日历组件调用
    function renderCalendar(){
        var paramLineId = $('.select-line').data('id');
        var paramRoleId = $('.select-role').data('id');
        var paramMemberId = $('.select-member').data('id');
        var calendarUrl = '/admin/line/role/selectJson' + ((paramLineId !== undefined) ? '?lineId=' + paramLineId : '?lineId=') + ((paramRoleId !== undefined) ? '&roleId=' + paramRoleId : '&roleId=') + ((paramMemberId !== undefined) ? '&memberId=' + paramMemberId : '&memberId=')
        $('#calendar').fullCalendar({
            lang: 'zh-cn',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultView: 'month',
            contentHeight: 500,
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: {
                url: calendarUrl
            },
            eventClick: function(event) {
                if (event.url) {
                    window.open(event.url);
                    return false;
                }
            },
            viewRender: function(view,element){
                //alert('new view: ' + view.name);
            }
        });
    }

    function rerenderCalendar(){
        var paramLineId = $('.select-line').data('id');
        var paramRoleId = $('.select-role').data('id');
        var paramMemberId = $('.select-member').data('id');
        console.log('paramLineId:'+paramLineId);
        console.log('paramRoleId:'+paramRoleId);
        console.log('paramMemberId:'+paramMemberId);
        var calendarUrl = '/admin/line/role/selectJson' + ((paramLineId !== undefined) ? '?lineId=' + paramLineId : '?lineId=') + ((paramRoleId !== undefined) ? '&roleId=' + paramRoleId : '&roleId=') + ((paramMemberId !== undefined) ? '&memberId=' + paramMemberId : '&memberId=')
        $('#calendar').fullCalendar('removeEventSource', calendarUrl);
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', calendarUrl);
        $('#calendar').fullCalendar('rerenderEvents');
    }
})
