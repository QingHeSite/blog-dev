# windows
###### 查找并杀死端口
1. 查找 `netstat -ano | findstr 10103`
2. kill `taskkill -PID 25280 -F`

# linux
#### 安装nginx(CentOs)
1. 安装: 使用yum,`sudo yum -y install nginx`
    yum 进行 Nginx 安装时，Nginx 配置文件在 /etc/nginx 目录下
2. 使用: 



###### 查看80端口连接数最多的20个IP
- netstat -anlp|grep 80|grep tcp|awk '{print $5}'|awk -F: '{print $1}'|sort|uniq -c|sort -nr|head -n20

###### 统计80端口连接数
- netstat -nat|grep -i "80"|wc -l

###### 查找linux上所有进程
`ps auxw`
###### 查找所有node进程详情
`ps aux|grep node`
###### 查找nginx配置文件
1. ps aux|grep nginx
---
- `nginx -t`

###### nginx重启
- `nginx -s reload`

##### CentOS 安装git
`yum install git`

##### CentOS 安装 docker

`curl -fsSL https://get.docker.com | bash -s docker --mirror aliyun`

启动docker服务
`ststemctl start docker`

查看内网ip
`ifconfig | grep inet`

##### 文件操作
拷贝文件 保持层级

`cp --parents ./b/**/*.txt ./a`

`--parents`保存层级结构,会包含a文件名

 ### mac安装autossh 记住密码+保持连接
 使用mac自带的terminal连接服务器,一段时间不用会自动断开连接,再使用的话需要手动连接就比较麻烦,安装autossh可以解决此问题
##### 安装autossh
1. 下载
```terminal
git clone https://github.com/wufeifei/autossh.git
sudo cp autossh/autossh /usr/local/bin/
```
2. 创建配置文件
```
vi ~/.autosshrc
```
3. 配置文件内容
```
server_name|192.168.1.110|root|password|port|is_bastion
```
4. 示例(配置文件)
```
front-end|192.168.1.1|root|password|22|1
```
##### mac配置ssh长连接不断开
1. 修改本机配置文件
```
sudo vim /etc/ssh/ssh_config
```
2. 增加内容
- ServerAliveInterval 10 表示10s发送一次空包
- ServerAliveCountMax 最多3次无法接受到服务器响应自动断开
```
ServerAliveCountMax 3
ServerAliveInterval 10
```

##### mac 显示|关闭隐藏文件
- 显示 `defaults write com.apple.finder AppleShowAllFiles -bool TRUE`
- 隐藏 `defaults write com.apple.finder AppleShowAllFiles -bool FALSE`

需要重启访达生效 `option+command+右键访达`
