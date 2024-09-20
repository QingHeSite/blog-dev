# verdaccio (npm私有仓库搭建)

## 部署

### use docker

1.  拉取镜像
```
docker pull verdaccio/verdaccio
```
2. 运行
```
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

## 使用
```
npm set registry http://localhost:4873
```