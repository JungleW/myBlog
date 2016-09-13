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
            dataType:"json",
            success: function(data) {
                if(data.done){
                    showBlock(data.html);
                    if(data.table){
                        updateTable(data.table);
                    }
                }else{

                }
            },
            error: function(err, data){
                lockLayer.show();
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
        lLayer: true,
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
            lockLayer.hide();
        }
    }, function(){
           $.ajax({
                url: "/admin/ajax/lock",
                type: "get",
                data: {},
                dataType:"text",
                success: function(data) {
                    $("#lock_sidebar .content").html(data);
                }
            });
    });
});


function showBlock(data) {
    $("#m_content").html(data);
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
function show(id, myRole) {
    var url;
    if(id && myRole){
        url = "/admin/" + myRole + "/ajax/show/" + id;
    }else if(id){
        url = "/admin/" + role + "/ajax/show/" + id;
    }else if(myRole){
        url = "/admin/" + myRole + "/ajax/show";
    }else{
        url = "/admin/" + role + "/ajax/show";
    }
    $.ajax({
        url: url,
        type: "get",
        data: {},
        dataType:"text",
        success: function(data) {
            $("#right_sidebar .content").html(data);
            rightLayer.show();
        }
    });
};
function edit(id, myRole) {
    var url;
    if(id && myRole){
        url = "/admin/" + myRole + "/ajax/edit/" + id;
    }else if(id){
        url = "/admin/" + role + "/ajax/edit/" + id;
    }else if(myRole){
        url = "/admin/" + myRole + "/ajax/edit";
    }else{
        url = "/admin/" + role + "/ajax/edit";
    } 
    $.ajax({
        url: url,
        type: "get",
        data: {},
        dataType:"text",
        success: function(data) {
            $("#right_sidebar .content").html(data);
            $("#rightSidebarForm").validate();   
            <!-- Page Script -->
            //Add text editor
            $(".textarea").each(function() {
                $(this).wysihtml5();
            });
            rightLayer.show();
        }
    });
};
function update(id, myRole){
    var url;
    if(id && myRole){
        url = "/admin/" + myRole + "/ajax/update/" + id;
    }else if(id){
        url = "/admin/" + role + "/ajax/update/" + id;
    }else if(myRole){
        url = "/admin/" + myRole + "/ajax/update";
    }else{
        url = "/admin/" + role + "/ajax/update";
    } 
    $.ajax({
        url: url,
        type: "post",
        data: $("#rightSidebarForm").serialize(),
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
function del(id, myRole){
    var url;
    if(id && myRole){
        url = "/admin/" + myRole + "/ajax/del/" + id;
    }else if(id){
        url = "/admin/" + role + "/ajax/del/" + id;
    }else if(myRole){
        url = "/admin/" + myRole + "/ajax/del";
    }else{
        url = "/admin/" + role + "/ajax/del";
    } 
    $.ajax({
        url: url,
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

//自定义展示方法
function DGet(myRole, myOper, dataType){
    if(!dataType){
        dataType = "text";
    }
    $.ajax({
        url: "/admin/" + myRole + "/ajax/" + myOper,
        type: "get",
        data: {},
        dataType: dataType,
        success: function(data) {
            $("#right_sidebar .content").html(data);
            $("#rightSidebarForm").validate();   
            <!-- Page Script -->
            //Add text editor
            $(".textarea").each(function() {
                $(this).wysihtml5();
            });
            rightLayer.show();
        }
    });
}

//自定义更新方法
function DPost(myRole, myOper){
    $.ajax({
        url: "/admin/" + myRole + "/ajax/" + myOper,
        type: "post",
        data: $("#rightSidebarForm").serialize(),
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
function unlock(){   
    $.ajax({
        url: "/admin/user/login",
        type: "post",
        data: $("#lockForm").serialize(),
        dataType:"json",
        success: function(data) {
            if(data.done){
                lockLayer.callback();
            }else{
                var obj = $("#lockForm").find("#password");
                obj.val("");
                $("#lockForm").find("#password").attr("placeholder", data.msg);
            }
        }
    });
}