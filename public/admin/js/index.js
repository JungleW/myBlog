var rightLayer;
var lockLayer;
var role;
$(function () {
    $(".main-block").bind("click", function() {
        $("#m_title").html($(this).find(".title").html());
        role = $(this).attr("data-role");
        $.ajax({
            url: "/admin/" + role + "/ajax",
            type: "get",
            data: {},
            dataType:"text",
            success: function(data) {
                showBlock(data);
            },
            error: function(err, data){
                showPage500();
            }
        });
    });
    //右导航栏的样式改变
    $(".main-link").bind("click", function() {
        $("li.active").removeClass("active");
        $(this).addClass("active");
        var parentLis = $(this).parents("li");
        parentLis.each(function() {
            $(this).addClass("active");
        });
    });
    //左弹窗
    rightLayer = $("#right_sidebar").RightLayer({
        lWidth:"768px", 
        lShow: false, 
        lLayerClick: true, 
        lLayer: false,
        lRelayEle: $("#main_container")
    });
    //锁屏弹窗
    lockLayer = $("#lock_sidebar").RightLayer({
        lWidth:"400px", 
        lShow: false, 
        lLayerClick: false, 
        lLayer: true,
        lCloseBtn: false,
        lRelayEle: $("#main_container"),
        callback: function() {
            $(this).hide();
        }
    });
});


function showBlock(data) {
    $("#m_content").html(data);
    $.ajax({
        url: "/admin/" + role + "/ajax/tableOptions",
        type: "get",
        data: {},
        dataType:"json",
        success: function(data) {
            if(data.done){
                updateTable(data.table);
            }
        }
    });
}
//更新列表数据
function updateTable(table) {      
    //列表
    $("#"+table.id).DataTable({
      //"sDom":'<"row"<"col-md-6"i><"col-md-6"s>><"row"<"col-sm-12"rt>><"row"<"col-md-6"l><"col-md-6"p>><"clear">',
      "paging": true,
      "lengthChange": true,
      "searching": true,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "columnDefs":[{
         orderable:false,//禁用排序
         targets:table.noSortArr   //指定的列
      }],
      "serverSide": false,
      /*"ajax": {
        "url": "data.json",
        "data": {
            "user_id": 451
        }
      },*/
      "oLanguage": {
        "sLengthMenu": "每页显示 _MENU_ 条记录",
        "sZeroRecords": "抱歉， 没有找到",
        "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
        "sInfoEmpty": "没有数据",
        "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
        "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "前一页",
        "sNext": "后一页",
        "sLast": "尾页"
        },
        "sZeroRecords": "没有检索到数据",
        "sProcessing": "<img src='./loading.gif' />",
        "sSearch": "搜索:",
        }
    });
}
function show(id) {
    $.ajax({
        url: "/admin/" + role + "/ajax/show/" + id,
        type: "get",
        data: {},
        dataType:"text",
        success: function(data) {
            $("#right_sidebar .content").html(data);
            rightLayer.show();
        }
    });
};
function edit(id) { 
    $.ajax({
        url: "/admin/" + role + "/ajax/edit/" + id,
        type: "get",
        data: {},
        dataType:"text",
        success: function(data) {
            $("#right_sidebar .content").html(data);    
            <!-- Page Script -->
            //Add text editor
            $(".textarea").each(function() {
                $(this).wysihtml5();
            });
            rightLayer.show();
        }
    });
};
function update() {
    $.ajax({
        url: "/admin/" + role + "/ajax/update",
        type: "post",
        data: $("#submitForm").serialize(),
        dataType:"json",
        success: function(data) {
            if(data.done){
                $("li.active a").click();
                rightLayer.hide();
            }else{
                alert(data.msg);
            }
        }
    });
};
function del(id) {
    $.ajax({
        url: "/admin/" + role + "/ajax/del/" + id,
        type: "post",
        data: {},
        dataType:"json",
        success: function(data) {
            if(data.done){
                $("li.active a").click();
            }else{
                alert(data.msg);
            }
        }
    });
};

function resetPwd1(){   
    $.ajax({
        url: "/admin/" + role + "/ajax/resetPwd",
        type: "post",
        data: {},
        dataType:"text",
        success: function(data) {
            $("#lock_sidebar .content").html(data);    
            rightLayer.show();
        }
    });
}
function resetPwd(){   
    $.ajax({
        url: "/admin/ajax/lock",
        type: "get",
        data: {},
        dataType:"text",
        success: function(data) {
            $("#lock_sidebar .content").html(data);    
            lockLayer.show();
        }
    });
}
function unlock(){   
    $.ajax({
        url: "/user/login",
        type: "post",
        data: $("#lockForm").serialize(),
        dataType:"json",
        success: function(data) {
            if(data.done){
                lockLayer.hide();
            }else{
                alert(data.msg);
            }
        }
    });
}