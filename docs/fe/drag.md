# 获取拖拽文件

##### drop
当元素或选中的文本在可释放目标上被释放时触发
##### dragenter
当拖拽元素或选中的文本到一个可释放目标时触发
##### dragleave
当拖拽元素或选中的文本离开一个可释放目标时触发。
##### dragover
当元素或选中的文本被拖到一个可释放目标上时触发（每 100 毫秒触发一次）。
```html
<div 
@drop.prevent.stop="dropInp" 
@dragenter="inpDragenter" 
@dragover="inpDragOver"
@dragleave="inpDragLeave"></div>

```
```js
dropInp( e ) {
        this.maskInp1 = false
        const fileList = e.dataTransfer.files;
        this.handleChangeImgs({target: {files: [...fileList]}})
      } 
inpDragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}
inpDragOver(e) {
      e.stopPropagation();
      e.preventDefault();
    }
inpDragLeave() {
    // 消除蒙层等样式
      this.maskInp1 = false
    }
```