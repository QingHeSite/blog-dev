
# kibana分析平台搭建

## 组合
1. Kibana (可视化平台)
2. Elasticsearch (搜索和分析引擎)
3. 前端 APM (上报工具)


## 配置文件

##### docker-compose.yml
```yml
services:
  elasticsearch:
    image: elasticsearch:8.6.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=true  # 启用安全认证（Fleet 必须）
      - xpack.security.enrollment.enabled=true
      - xpack.security.authc.api_key.enabled=true  # 启用 API 密钥
      - bootstrap.memory_lock=true
    ports:
      - "9200:9200"  # Elasticsearch HTTP 服务端口
      - "9300:9300"  # Elasticsearch 节点通信端口
    volumes:
      - es_data:/usr/share/elasticsearch/data  # 持久化数据
    ulimits:
      memlock:
        soft: -1
        hard: -1

  kibana:
    image: kibana:8.6.0
    container_name: kibana
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200  # Kibana 连接 Elasticsearch 的地址
      - XPACK_FLEET_AGENTS_ELASTICSEARCH_HOST=http://elasticsearch:9200  # Fleet Server 的 Elasticsearch 地址
    ports:
      - "5601:5601"  # Kibana Web 界面端口
    volumes:
      - ./kibana.yml:/usr/share/kibana/config/kibana.yml
    depends_on:
      - elasticsearch

  apm-server:
    image: docker.elastic.co/apm/apm-server:8.6.0
    container_name: apm-server
    environment:
      - output.elasticsearch.hosts=["http://elasticsearch:9200"]
      - apm-server.rum.enabled=true  # 启用 RUM（前端监控）
      - apm-server.rum.allow_origins=["*"]  # 允许所有来源（生产环境建议配置特定域名）
      - apm-server.register.ingest.pipeline.enabled=true  # 自动注册 Pipeline
    volumes:
      - ./apm-server.yml:/usr/share/apm-server/apm-server.yml
    ports:
      - "8202:8202"  # 映射 APM Server 端口
    depends_on:
      - elasticsearch  # 等待 Elasticsearch 启动后再启动 APM Server

volumes:
  es_data:
    driver: local
```

##### apm-server.yml
```yml
# APM Server 配置
apm-server:
  host: "0.0.0.0:8202"  # 定义 APM Server 服务绑定的内部端口
  rum:
    enabled: true
    allow_origins: ["*"]
  register:
    ingest:
      pipeline:
        enabled: true

# 输出到 Elasticsearch 的配置
output:
  elasticsearch:
    hosts: ["http://elasticsearch:9200"]
    username: "elastic"
    password: "kiGD+4WHPb3fq93t8p*F"
# 其他配置可以按需添加
```

##### kibana.yml
```yml
server.host: "0.0.0.0"
server.shutdownTimeout: "5s"
elasticsearch.hosts: [ "http://elasticsearch:9200" ]
elasticsearch.serviceAccountToken: "AAEAAWVsYXN0aWMva2liYW5hL2tpYmFuYTpOZFVxS3ZzSFRNV2Y1WUszaS1BUUtR"
monitoring.ui.container.elasticsearch.enabled: true
i18n.locale: "zh-CN"
```

### 启动
```shell
docker-compose up -d
```

## 错误处理
- kibana无法启动
    1. 令牌失效
        ```shell
        docker exec -it elasticsearch bash
        bin/elasticsearch-service-tokens create elastic/kibana kibana
        ```
        重启
        
        ```
        docker-compose restart kibana
        ```

## web 使用

### 接口fetch提交
- user-events: 为索引名

```js
fetch('http://localhost:9200/user-events/_doc', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    event_name: 'submit_click',
    event_count: 1,
    timestamp: new Date().toISOString()
  })
});
```

### 工具包使用提交
```json
import { init as initApm } from '@elastic/apm-rum';

let apm = initApm({
  serviceName: 'apm-1',
  serverUrl: 'http://localhost:8202',
  environment: 'development',
  transactionSampleRate: 1.0, // 采样率设为 100%
  instrument: false,
  flushInterval: 0,
  logLevel: 'debug', // 启用调试日志

});

const transaction = apm.startTransaction('app_vue', 'loaded');
  setTimeout(() => {
    transaction!.end();
  }, 10);
```