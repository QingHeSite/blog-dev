---
head:
  - - meta
    - name: description
      content: git 使用
  - - meta
    - name: keywords
      content: git使用,前端git使用,前端git,git开发规范
---

# GIT常用命令
- 使用 https 和远程仓库通信，Git 默认每次操作都需要输入用户名和密码，十分麻烦,以下命令可保存登录态

`git config --global credential.helper store`

- 解决每次拉取代码都需要填写合并信息

```
git checkout .
git reset --hard origin/master
git pull
```

## Git 命令解释

使用暂存区的文件覆盖工作区，所以执行完git add .之后，再执行该命令是无效的
- `git checkout .`

本地查看当前分支开自哪个分支
- `git log --oneline --graph --decorate`

强制推送到远程分支(慎用)
- `git push -u origin master -f`

删除远程分支
- `git push origin --delete [分支名]`

##### linux上清除保存的git账号
`vi ~/.git-credentials`,删除记录的账号即可,下次`clone`or`pull`就需要手动输入账号了

## Git工作规范
#### 使用流程
基于devlope创建feature分支 -> 合并到devlope分支(供测试人员测试) -> 基于devlope创建release分支(进行预生产测试) -> 合并到master分支(正式上线)



#### 永久分支 & 临时分支
- `master` `devlope` 为永久分支
- `feature/name` `hotfix/bugName`  `release` 为临时分支

#### 整洁合并多个commit

`git rebase --i HEAD~3`
- `--i` 表示interactive  交互
- 交互中指令 `squash`-与上个commit message 合并,`pick` 保留commit  message 信息

#### Git命令 reset 和 revert 的区别

  
#### git 错误处理
1. error Command "husky-run" not found.
解决 rm -rf .git/hooks



