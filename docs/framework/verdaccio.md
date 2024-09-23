# verdaccio (npm私有仓库搭建)

## 部署

### use docker

1.  拉取镜像
```
docker pull verdaccio/verdaccio
```
2. 主机上创建verdaccio目录
```shell
cd /home/wangtao
mkdir verdaccio
cd verdaccio
mkdir conf storage plugins
```
修改目录`conf`和`storage`的权限
```shell
chmod 777 conf storage
```

3. 创建配置文件

config.yaml


将`config.yaml` 放到目录 `conf`下
```yaml{39}
# 素有包的保存路径
storage: /verdaccio/storage/data
# 插件的保存路径
plugins: /verdaccio/plugins

# 通过web访问
web:
  title: Verdaccio

# 账号密码文件，初始不存在
auth:
  htpasswd:
    file: /verdaccio/storage/htpasswd
    # max_users：1000
    # 默认1000，允许用户注册数量。为-1时，不能通过 npm adduser 注册，此时可以直接修改 file 文件添加用户。

# 本地不存在时，读取仓库的地址
# 上游代理源推荐使用淘宝源, 主机网络连接npm可能会出现断联情况
uplinks:
  npmjs:
    url: https://registry.npmjs.org
    max_age: 0
  taobao:
    url: https://registry.npmmirror.com/
    max_age: 0

# 对包的访问操作权限，可以匹配某个具体项目，也可以通配
# access 访问下载；publish 发布；unpublish 取消发布；
# proxy 对应着uplinks名称，本地不存在，去unplinks里取

# $all 表示所有人都可以执行该操作
# $authenticated 已注册账户可操作
# $anonymous 匿名用户可操作
# 还可以明确指定 htpasswd 用户表中的用户，可以配置一个或多个。
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: taobao

  '**':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: taobao

# 服务器相关
sever:
  keepAliveTimeout: 60

publish:
  allow_offline: true

middlewares:
  audit:
    enabled: true

# 日志设定
logs: { type: stdout, format: pretty, level: http }

```


修改读写权限

```shell
chmod 777 config.yaml
```



4. 基于镜像启动docker
```shell
docker run -itd --network host --name verdaccio -v /home/wangtao/verdaccio/storage:/verdaccio/storage -v /home/wangtao/verdaccio/plugins:/verdaccio/plugins -v /home/wangtao/verdaccio/conf:/verdaccio/conf -p 4873:4873 verdaccio/verdaccio
```
参数解析: 
--network host, 使用主机的dns解析

5. 查看

使用`docker ps`查看运行的容器,即可看到一个名为`verdaccio`的容器
如果没有, 使用`docker logs verdaccio`查看日志

6. 检查

在主机上访问`http://localhost:4873`,返回内容正常即可从电脑上访问,
如果电脑无法访问`ip:4873`,需要检查服务器的端口`4873`是否已开启对外访问
如果是阿里云ecs, 则需要修改安全组,添加端口即可,
主机的话需要配置防火墙iptables



## 使用

本地切换npm源
```
npm set registry http://ip:4873
```

