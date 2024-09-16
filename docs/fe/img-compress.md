# 图片相关处理

### 前端压缩PNG

- 使用[UPNG.js](https://github.com/photopea/UPNG.js/)
- 由于官方没有给出完整的demo,踩了点坑,以此记录下流程

- 需要安装 `npm i upng-js` 和 `npm i pako`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./node_modules/pako/dist/pako.min.js"></script>
    <script src="./node_modules/upng-js/UPNG.js"></script>
</head>

<body>
    <div>
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">
        <img id="img" src="" />
    </div>
    <script>
        function dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        }
        
        function transformArrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            for (var len = bytes.byteLength, i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }
        
        function handleImg(buffer) {
                // 1.解码
                const decodeInfo = UPNG.decode(buffer)
                const {width, height} = decodeInfo
                // 2.转rgbaBuffer
                const rgbaBuffer = UPNG.toRGBA8(decodeInfo)
                // 3.编码
                /* cnum 允许有损压缩,将其设置为0以进行无损压缩，或者在图像中写入允许的颜色数。较小的值产生较小的文件。或仅使用0表示无损/使用256表示有损。*/
                // 可配置允许颜色数,将直接影响图片质量
                const cnum = 16
                const encodeImgBuffer = UPNG.encode(rgbaBuffer, width, height, cnum)
                // 4.转base64
                const base64Img = transformArrayBufferToBase64(encodeImgBuffer)
                console.log('base64Img', base64Img)
                let src = 'data:image/jpg;base64,' + base64Img
                document.getElementById('img').src = src
        }

        document.getElementById('avatar').addEventListener('change', function (e) {
            // 1. 获取file对象
            const file = document.getElementById('avatar').files['0']
            let reader = new FileReader()
            reader.onload = function () {
                handleImg(reader.result)
            }
            reader.readAsArrayBuffer(file)
        })

    </script>
</body>

</html>

```
