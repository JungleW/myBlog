//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
  throw new Error("AdminLTE requires jQuery");
}

(function($, window, document, undefined){
    var defaults={
        //lPosition: "fixed",
        lTop: "50px",
        lBottom: '0px',
        lWidth: "200px",
        lBackgruondColor: "#367aa1",
        lShow: false,
        lLayer: false,
        lRelayEle: undefined
    };
    function RightLayer($ele, opts){
        this.$ele = $ele;
        this.options = opts = $.extend(defaults, opts || {});
        this.init();
    };
    RightLayer.prototype = {
        init: function() {
            var This = this;
            this.$ele.css("position", "fixed");
            this.$ele.css("overflow-y", "scroll");
            this.$ele.css("margin-right", "-20px");
            this.$ele.css("top", this.options.lTop);
            this.$ele.css("bottom", this.options.lBottom);
            this.$ele.css("width", this.options.lWidth);
            this.$ele.css("right", "-" + this.options.lWidth);
            this.$ele.css("background-color",this.options.lBackgruondColor);
            var btn = $('<div style="position:absolute; top:0; left:0;  width:100%; height:35px; z-index: 1051;"><i class="fa fa-remove" style="position:absolute; top:0; left:0; padding: 0 10px; color:#fff; display: block; width: 35px; height: 100%; line-height: 35px; text-align: center;cursor: pointer;"></i><h3 style="padding:5px; text-align: center; margin:0; color:#fff;" id="header"></h1></div>');
            this.$ele.append(btn);
            btn.bind('click', function() {
                This.hide();
            });
            if(this.options.lLayer){
                This.layer = $('<div style="position:fixed; z-index: 1050; left:0; right:0; top:0; bottom:0; background-color: rgba(34, 45, 50, 0.2); display: none"></div>');
                this.$ele.after(This.layer);
                This.layer.bind('click', function() {
                    This.hide();
                });
            }
            
            if(this.options.lShow){
                This.show();
            };
        },
        show:function() {
            if(this.options.lRelayEle){
                var widt = this.options.lRelayEle.width();
                if(widt > 768) widt = 768;
                this.$ele.css("width", widt+20+"px");
            }
            this.$ele.animate({"right": "0"});           
            if(this.layer){
                this.layer.css("display", "block");
            }
        },
        hide: function() {
            this.$ele.animate({"right": "-" + this.$ele.css("width")});
            if(this.layer){
                this.layer.css("display", "none");
            }
        }
    }
    $.fn.RightLayer = function(opts) {
        var options = $.extend(defaults, opts || {});
        return new RightLayer($(this), options);
    }
})(jQuery, window, document);
