---
head:
  - - meta
    - name: description
      content: js和css中好用的工具库
  - - meta
    - name: keywords
      content: css动画库,css动画,css插件,js动画库,js动画
---

# 工具库

### css
#### 动画库
1. [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/?page=1)
2. [scrollmagic](https://scrollmagic.io/)

#### 手势识别
[hammerjs](https://hammerjs.github.io/getting-started/)

#### 资源预加载
[pxloader](https://thinkpixellab.com/pxloader/)

### 本地localhost使用https协议
[anchor.dev](https://anchor.dev/)

结合文档可运行代码:
```js
// index.js
const ACME_CONTACT="******"
const ACME_DIRECTORY_URL="******"
const ACME_HMAC_KEY="***"
const ACME_KID="******"
const HTTPS_PORT="8089"
const SERVER_NAMES="local.lcl.host,local.internal,local.lan,local.local,local.localhost,local.test"

const { createSNICallback } = require('anchor-pki/auto-cert/sni-callback');
const { TermsOfServiceAcceptor } = require('anchor-pki/auto-cert/terms-of-service-acceptor');
const https = require('node:https');

const app = (req, res) => {
  // setup your app
  console.log('req' ,req);
  res.end('Hello World');
  
}

const SNICallback = createSNICallback({
  name: 'sni-callback',
  tosAcceptors: TermsOfServiceAcceptor.createAny(),
  cacheDir: 'tmp/acme',

  // The following are defaults
  //
  allowIdentifiers: SERVER_NAMES,
  directoryUrl: ACME_DIRECTORY_URL,
  contact: ACME_CONTACT,
  externalAccountBinding: {
    kid: ACME_KID,
    hmacKey: ACME_HMAC_KEY
  },

});

https.createServer({SNICallback}, app).
  listen(HTTPS_PORT);
```