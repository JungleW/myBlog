var rightLayer;
var role;
$(function () {
    $(".main-item").bind("click", function() {
        role = $(this).attr("data-role");
        $.ajax({
            url: "/admin/" + role + "/ajax/list",
            type: "get",
            data: {},
            dataType:"json",
            success: function(data) {
                updateTable(data);
            }
        });
    });
    //左弹窗
    rightLayer = $("#right_layer").RightLayer({
        lWidth:"768px", 
        lShow: false, 
        lLayer: true, 
        lRelayEle: $("#main_container")
    });
});

function show(id) {
    $("#right_layer #header").html("详情");
    $.ajax({
        url: "/admin/" + role + "/ajax/show/" + id,
        type: "get",
        data: {},
        dataType:"text",
        success: function(data) {
            $("#right_content").html(data);
        }
    });
    rightLayer.show();
};
function edit(id) {
    $("#right_layer #header").html("编辑");   
    $.ajax({
        url: "/admin/" + role + "/ajax/edit", ///" + id,
        type: "get",
        data: {},
        dataType:"text",
        success: function(data) {
            $("#right_content").html(data);    
            <!-- Page Script -->
            //Add text editor
            $("#compose-textarea").wysihtml5();
        }
    });

    rightLayer.show();
};
//更新列表数据
function updateTable(data) {
    var table = '<div class="row"><div class="col-sm-12"><table id="example1" class="table table-bordered table-striped"><thead><tr>';
    var colNum = 0;
    if(data && data.titles){
        colNum = data.titles.length;
        for(var i=0; i<colNum; i++){
            table += '<th>'+ data.titles[i].name+'</th>';
        };
    }
    table+='</tr></thead><tbody>';
    if(data && data.list){
        var listNum = data.list.length;
        for(var i=0; i<listNum; i++){
            table += '<tr>';
            table += '<td><a href="javascript:show(\'' + data.list[i]._id + '\')" >' + data.list[i][data.titles[0].label] +'</a></td>';
            for(var j=1; j<colNum; j++){
                if(data.titles[j].oper){
                    table += '<td><a href="javascript:'+ data.titles[j].oper +'(\'' + data.list[i]._id + '\')" >' + data.titles[j].name +'</a></td>';
                } else {
                    table += '<td>' + data.list[i][data.titles[j].label] +'</td>';
                }
            }
            table += '</tr>';
        }
    }else{ table += '<tr><td></td></tr>';}
    table += '</tbody></table></div></div>';
    $("#m_table").html(table);
    //列表
    var dataTable = $("#example1").DataTable({
      //"sDom":'<"row"<"col-md-6"i><"col-md-6"s>><"row"<"col-sm-12"rt>><"row"<"col-md-6"l><"col-md-6"p>><"clear">',
      "paging": true,
      "lengthChange": true,
      "searching": true,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "columnDefs":[{
         orderable:false,//禁用排序
         targets:data.noSortArr   //指定的列
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
