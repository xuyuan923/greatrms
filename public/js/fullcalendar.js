/**
 * Created by cassie on 14/12/2.
 * 我的任务页面
 */
$(document).ready(function() {
    //fullcalendar日历组件调用
    //已认领的需求显示
    $('#calendar-allocated').fullCalendar({
        lang: 'zh-cn',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        defaultView: 'basicWeek',
        contentHeight: 400,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: {
            url: '/admin/line/list/myAllocatedJson'
        },
        eventClick: function(event) {
            if (event.url) {
                window.open(event.url);
                return false;
            }
        }
    });

    //未认领的需求显示
    $('#calendar-unAllocated').fullCalendar({
        lang: 'zh-cn',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        defaultView: 'basicWeek',
        contentHeight: 400,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: {
            url: '/admin/line/list/myUnallocatedJson'
        },
        eventClick: function(event) {
            if (event.url) {
                window.open(event.url);
                return false;
            }
        }
    });

    //列表、日历切换显示
    $('.show-calendar').click(function(){
        $(this).removeClass('btn-default').addClass('btn-primary');
        $('.show-list').removeClass('btn-primary').addClass('btn-default');
        $('.allocatedList').css('display','none');
        $('.calendar').css('display','block');
        $('.calendar').fullCalendar('render');
    })
    $('.show-list').click(function(){
        $(this).removeClass('btn-default').addClass('btn-primary');
        $('.show-calendar').removeClass('btn-primary').addClass('btn-default');
        $('.allocatedList').css('display','');
        $('.calendar').css('display','none');
    });
});

