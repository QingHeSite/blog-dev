# js 文件下载(ie兼容)
特点
- 可自定义进度条(需返回content-length)
- 通过响应的状态码`Status Code`可判断是否下载成功
- 可解决直接使用`a标签`下载引起的跨域问题

#### 什么是 content-length:thinking:
- Content-Length 是一个实体消息首部，用来指明发送给接收方的消息主体的大小，即用十进制数字表示的八位元组的数目。我们需要后端返回content-length告诉前端文件大小,以便于前端做进度条
- 在xhr请求过程中调用的周期性函数 `onprogress` 的参数 `event.total` 就等于 `content-length`,结合`event.loaded`就可以做个进度条啦!:grin:
```js{5}
var xhr = new XMLHttpRequest();
var link = document.createElement('a');
    xhr.open('GET', 'http://127.0.0.1:8083/1.png')
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = "blob";
    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            console.log('loaded',event.loaded);
            console.log('total',event.total);      }
    };
    xhr.onload = function (oEvent) {
        console.log(oEvent);
        console.log(xhr.status);
        console.log(xhr.response);
        if (xhr.readyState === 4 && xhr.status === 200) {
          /** ie兼容性 */
          if (window.navigator.msSaveOrOpenBlob) {
                var blob = new Blob([xhr.response], {type: 'jpeg/png'});
                window.navigator.msSaveOrOpenBlob(blob, '123.jpeg' )
                return
        }
            var isBlob = xhr.response instanceof Blob;
            var blob = new Blob([xhr.response], {type: 'jpeg/png'});
            var csvUrl = URL.createObjectURL(blob);
            link.href = csvUrl;
            link.download = 'v.png';
            link.click();    
            //需要释放,防止内存泄漏
            URL.revokeObjectURL(csvUrl)
        }
    }
    xhr.send();
```