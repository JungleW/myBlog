$().ready(function() {
    $.validator.setDefaults({
        submitHandler: function() {
            $.ajax({
                url: "/blog/add",
                type: "post",
                data: $("#blogForm").serialize(),
                dataType: "json",
                success: function(data){
                    if(data.done){
                        location.href = data.url;
                    }else{
                        $("#tip").html(data.msg);
                        $(".return-tip").removeClass("hidden");
                        setTimeout(function(){
                            $(".return-tip").addClass("hidden");
                        }, 3000);
                    }
                },
                error:function(err, data){
                    alert("访问异常");
                }
            });
        }
    });
    // validate signup form on keyup and submit
    $("#blogForm").validate({
        rules: {
            title: {
                required: true,
                maxlength: 15,
            },
            content: {
                required: true
            }
        },
        messages: {
            title: {
                required: "请填写用户名",
                maxlength: "标题不能大于15"
            },
            content: {
                required: "请编辑博文内容"
            }
        }
    });
});