<!-- 组件说明 签名组件-->
<template>
  <div class="canvas">
    <div class="content">
      <div id="container">
        <canvas id="canvas"></canvas>
      </div>
      <div id="footers">
        <button class="but1">重置</button>
        <button class="but2" @click="submit()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../fetch/api';
export default {
  name: "Canvas",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    // 确定提交签名照片
    submit() {
      var that = this;
      var canvas = document.getElementById("canvas");
      var imgBase64 = canvas.toDataURL();
      var imgPng = canvas.toDataURL("image/png");
      var image = this.dataURLtoBlob(imgBase64);
      var formData = new FormData();
      formData.append("file", image, Date.now() + ".jpg");
      $("#submitBtn").attr("disabled", true); // 提交信息认证按钮失效

      $.ajax({
        url: that.$store.state.upLoadImg + "/openapi/common/upload",
        type: "POST",
        data: formData, // 上传formdata封装的数据包
        dataType: "JSON",
        cache: false, // 不缓存
        processData: false, // jQuery不要去处理发送的数据
        contentType: false, // jQuery不要去设置Content-Type请求头
        success: function(res) {
          // 成功回调
          $("#submitBtn").attr("disabled", false); // 恢复提交信息认证按钮功能

          if (res.code == 20000) {
            var protocol = window.location.protocol;
            var host = window.location.host;
            $(".signatureContent", window.parent.document).html(
              "<img src=" + that.$store.state.upLoadImg + res.data.filePath + ">"
            );
            // 获取签名之后的pdf  这里获取的第一个父组件$parent是van-action-sheet(vant 的弹出组件) 第二个$parent是AgentAuthentication
            that.$parent.$parent.signPdf();
          } else {
            layer.msg(res.mssage);
          }
        },
        error: function() {
          window.parent.layer.closeAll();
          layer.msg(res.mssage);
        }
      });
    },
    // base64转blob
    dataURLtoBlob(dataurl) {
      /*将base64转换成可用formdata提交的文件*/
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
  },
  mounted() {
    $(".content").fadeIn();
    var canvas = document.getElementById("canvas");
    // 包裹canvas的弹框
    var canvasContent = document.getElementsByClassName('van-action-sheet')[0];
    var winWidth = document.documentElement.clientWidth;
    var winHight = document.documentElement.clientHeight;

    //按比例计算内边距的值,当前UI设计图宽为750,可根据项目设置
    var paddingW = ((winWidth * 100) / 750) * 0.24 * 2;
    if (winWidth > winHight) {
      //横屏 比例用body的高来计算
      paddingW = ((winHight * 100) / 750) * 0.24 * 2;
    }

    canvas.width = winWidth - paddingW;
    canvas.height = 300;

    var content = canvas.getContext("2d");
    //设置画笔的样式
    content.strokeStyle = "#000";
    content.lineWidth = 1;
    content.lineCap = "round";
    content.lineJoin = "round";
    content.shadowBlur = 1;
    content.shadowColor = "#000";

    content.beginPath();
    canvas.addEventListener("touchstart", function(e) {
      content.beginPath();
      var touch = e.targetTouches[0];
      var x = touch.clientX -  canvas.offsetLeft;
      // touch.clientY:当前点击位置 - (document.body.clientHeight:屏幕高度 - canvasContent.offsetHeight: canvas弹框的高度 + canvas.offsetTop：画布高度)
      var y = touch.clientY - (document.body.clientHeight - canvasContent.offsetHeight + canvas.offsetTop);
      content.moveTo(x, y);
    });
    canvas.addEventListener("touchmove", function(event) {
      event.preventDefault();
      var touch = event.targetTouches[0];
      var x = touch.clientX - canvas.offsetLeft;
      // 屏幕高度 - 弹出框到顶部的高度 -
      var y = touch.clientY - (document.body.clientHeight-canvasContent.offsetHeight + canvas.offsetTop);
      content.lineTo(x, y);
      content.stroke();
    });
    canvas.addEventListener("touchend", function(event) {
      content.closePath();
      //当画布有内容时,确定按钮才可用
      $(".but2").addClass('activityBtn');
    });
    document.querySelector(".but1").onclick = function() {
      content.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      $(".but2").removeClass('activityBtn');
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: none;
}

#footers {
  width: 100%;
  height: 1rem;
  background: #fff;
  text-align: center;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

button {
  width: 120px;
  height: 50px;
  border-radius: 25px;
  font-size: 30px;
  color: #fff;
  outline: none;
  border: 0;
}

.but1 {
  background: #999999;
}

.but2 {
  background: #ff3737;
  opacity: .6;
  pointer-events:none;
}

.activityBtn{
  background: #ff3737!important;
  opacity: 1!important;
  pointer-events:all!important;
}

#container {
  flex: 1;
  background: #f5f5f5;
  padding: 20px;
  font-size: 0;
}

canvas {
  box-sizing: border-box;
  background: white;
  margin: auto;
  display: block;
}
</style>