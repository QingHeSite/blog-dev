---
head:
  - - meta
    - name: description
      content: 前端如何使用docker
  - - meta
    - name: keywords
      content: docker使用,前端使用docker,前端docker使用,前端docker,docker在web开发中的使用,在前端开发中使用docker
---

# Docker

## 基本步骤
1. 首先创建Dockerfile文件
2. 执行 `docker image build -t docker-demo .`
其中`docker-demo`为自取的镜像名称,还要注意末尾的`.`,标识在当前目录
3. 接下来可执行`docker image ls`查看新生产的image文件
4. 启动容器 `docker run -itd --name ${容器名} -v /root/pre-env:/root/pre-env -p 10104:80 bbw:v1 sh`, 此命令会从image文件生产容器
  `docker container run -p 8000:3000 -it docker-demo:0.0.1 /bin/bash`
5. 查看所有容器 `docker ps -a`

  ### 进入容器命令
  `docker exec -it Container-ID /bin/bash`

  ### 基础 Dockerfile 示例
  ```dockerfile
FROM oberonamsterdam/pm2-git:12-alpine

RUN mkdir -p /usr/src/app/node-sass
COPY  node-sass.node /usr/src/app/node-sass
ENV SASS_BINARY_PATH /usr/src/app/node-sass/node-sass.node

RUN yarn global add lerna \
    && yarn global add nrm \
    && yarn global add typescript \
    && yarn global add ts-node \
    && yarn global add node-sass

EXPOSE 80

VOLUME /root/front-end

WORKDIR /root
CMD ["sh", "ls", "-a" ]
  ```
- 删除镜像
   `docker rmi -f 镜像ID`  
- 删除容器
   `docker rm [contaninerId]`
- 停止容器
  `docker stop [contaninerId]`
- 删除所有停止的容器
  `docker container prune`
- 从镜像启动容器(见上基本步骤2)
  