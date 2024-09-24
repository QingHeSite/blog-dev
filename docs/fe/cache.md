
# 浏览器缓存

### 强缓存

#### expires & cache-control

命中强缓存,不发送到服务器

cache-control

`no-cache`: 缓存相应内容,但是在下次使用之前,需要像服务器验证是否有效,通过Etag(随响应头返回)和last-modified(随响应头返回)

`no-store`: 完全不缓存


