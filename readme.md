####功能
---
多个yaml文件合并成一个properties文件，多个yaml文件包含同样的属性，会合并属性及子属性，并且最底层的子属性，后者会替换前者的

```javascript
application.yml
mq:
    apple:
        exchange: apple-exchange
        queue: apple-queue
        nothing: here

b.yml
application-pre:
    apple:
        exchange: apple-exchange-pre
        queue: apple-queue-pre

merged:
mq.apple.exchange=apple-exchange-pre
mq.apple.queue=apple-queue-pre
mq.apple.nothing=here
```

####怎么使用
```bash
npm i yml_tool -g

y2p --files=f1.yml,f2.yml
```