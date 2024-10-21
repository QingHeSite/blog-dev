---
head:
  - - meta
    - name: description
      content: shell 使用
  - - meta
    - name: keywords
      content: shell使用,前端shell使用,前端shell,shell在web开发中的使用,在前端开发中使用shell,基本shell脚本
---

# 复制脚本

```shell
#!/bin/bash
pwd
#设置目标路径
targetPath='D:\\pro_c_app\\public\\assets\\checkin\\multiple-select-priority'
distAppPath='D:\\Work\\frontend-checkin\\multiple-select-priority\\dist-app'

cd ..
pnpm release
echo "start copy"

#复制指定html
find ./dist-app -name "index.html" -print -exec cp {} "$targetPath1/" \;
echo -e "HTML files copied to $targetPath1"

# 复制所有html
find ./dist-app -name "*.html" -print -exec cp {} "$targetPath1/" \;
echo -e "HTML files copied to $targetPath1"

# 复制一级文件夹 a 到 b
find ./dist-app -mindepth 1 -maxdepth 1 -type d -exec cp -r {} "$distPro/" \;

# 全量复制
cp -r $distAppPath/* $targetPath/

echo -e "copy end \n 请前往 $targetPath 查看文件是否拷贝成功"
read -p "press enter end"

```

```shell
# 配合环境变量使用
// app仓库 public路径
PRO_APP_PUBLIC = D:\pro_c_app\public

// ticket仓库 public路径
PRO_APP_PUBLIC = D:\Work\pro_fticket_app\public
```