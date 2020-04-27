### 默认
``` nginx
# 设置工作进程的数量
worker_processes  1;
# 处理连接
events {
    # 设置连接数
    worker_connections  1024;
}

http {
    # 文件拓展名查找集合
    include       mime.types;
    # 当查找不到对应类型的时候默认值
    default_type  application/octet-stream;

    # 日志格式，定义别名为 main
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    # 指定日志输入目录
    #access_log  logs/access.log  main;

    # 调用 sendfile 系统传输文件
    sendfile        on;
    #tcp_nopush     on;

    # 客户端与服务器连接超时时间，超时自动断开
    #keepalive_timeout  0;
    keepalive_timeout  65;

    # 开启gizip 压缩
    #gzip  on;

    # 虚拟主机
    server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        # 路由
        location / {
                root   html;
                index  index.html index.htm;
            }
    }

    # 引入其他的配置文件
    include servers/*;
}
```

## 基本命令
```
  $ nginx -t 检查配置文件是否有语法错误
  
  $ nginx -s reload 向主进程发送信号，重新加载配置文件
  
  $ nginx -s stop 快速关闭
  
  $ nginx -s quit 等待工作进程处理完成后关闭
```

## 静态资源服务器
- server 配置虚拟主机的相关参数，可以有多个
- server_name 通过请求中的host值 找到对应的虚拟主机的配置
- location 配置请求路由，处理相关页面情况
- root 查找资源的路径

``` nginx
# 虚拟主机server块
server {
    # 端口
    listen   8080;
    # 匹配请求中的host值
    server_name  localhost;
    
    # 监听请求路径
    location / {
        # 查找目录
        root /source;
        # 默认查找
        index index.html index.htm;
    }
}
```

## 反向代理
> 因为浏览器的同源策略，当前端域名与后端域名不一致的时候导致请求失败。我们可以通过配置Nginx反向代理来解决。

- 拦截路径 `/api`, 可以通过正则匹配。
- `proxy_set_header` 允许重新定义或添加字段传递给代理服务器的请求头。
- `$http_host`、`$remote_addr`、`$scheme` 为Nginx内置变量。
- `rewrite` 根据rewrite后的请求URI，将路径重写，如：接口路径为 /user, 我们可以请求 /api/user。（为什么需要重写uri？因为在使用Nginx做反向代理的时候，需要匹配到跨域的接口再做转发，为了方便匹配，会人为的在原接口中添加一段路径（或标示， 如例子中的api），因此需要在匹配之后、转发之前把添加的那段去掉，因此需要 rewrite。）
- `break` 继续本次请求后面的处理 ,停止匹配下面的 location。需要注意的是与之类似的last执行过程则是停止当前这个请求，并根据rewrite 匹配的规则重新发起一个请求，从上到下依次匹配 location 后面的规则。
- `proxy_pass` 代理服务器。
```nginx
location /api {   
    # 请求host传给后端
    proxy_set_header Host $http_host;
    # 请求ip 传给后端
    proxy_set_header X-Real-IP $remote_addr;
    # 请求协议传给后端
    proxy_set_header X-Scheme $scheme;
    # 路径重写
    rewrite  /api/(.*)  /$1  break;
    # 代理服务器
    proxy_pass http://localhost:9000;
}
```

## Gzip
> Gzip 压缩功能需要浏览器跟服务器都支持，即服务器压缩，浏览器解析。

```nginx
server {
    # 开启gzip 压缩
    gzip on;
    # 设置gzip所需的http协议最低版本 （HTTP/1.1, HTTP/1.0）
    gzip_http_version 1.1;
    # 设置压缩级别，压缩级别越高压缩时间越长  （1-9）
    gzip_comp_level 4;
    # 设置压缩的最小字节数， 页面Content-Length获取
    gzip_min_length 1000;
    # 设置压缩文件的类型  （text/html)
    gzip_types text/plain application/javascript text/css;
}
```

## 负载均衡
> 负载均衡是Nginx 比较常用的一个功能，可优化资源利用率，最大化吞吐量，减少延迟，确保容错配置，将流量分配到多个后端服务器。

- 轮询（默认），请求过来后，Nginx 随机分配流量到任一服务器
``` nginx
upstream backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}
```

- `weight=number` 设置服务器的权重，默认为1，权重大的会被优先分配
``` nginx
upstream backend {
    server 127.0.0.1:3000 weight=2;
    server 127.0.0.1:3001 weight=1;
}
```

- `backup` 标记为备份服务器。当主服务器不可用时，将传递与备份服务器的连接。
``` nginx
upstream backend {
    server 127.0.0.1:3000 backup;
    server 127.0.0.1:3001;
}
```

- ip_hash 保持会话，保证同一客户端始终访问一台服务器。
``` nginx
upstream backend {
    ip_hash;  
    server 127.0.0.1:3000 backup;
    server 127.0.0.1:3001;
}
```

- least_conn 优先分配最少连接数的服务器，避免服务器超载请求过多。
``` nginx
upstream backend {
    least_conn;
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}
```

- 当我们需要代理一个集群时候可以通过下面这种方式实现
``` nginx
http {
    upstream backend {
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
    }

    ...
    server {
        listen      9000;
        server_name localhost;
        
        location / {
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Scheme $scheme;
            
            // 请求转向 backend定义的服务器列表    
            proxy_pass backend; 
        }
    }
}
```

## 访问权限
- deny是禁止访问
- allow是允许访问
- 同一个块下的两个权限指令，先出现的设置会覆盖后出现的设置

```nginx
 location / {
        # 所有的 ip 都无法访问到了，包括 xx.xx.xxx.101
        deny   all;
        allow  xx.xx.xxx.101;
    }
```

## 动态匹配
> 通常在开发环境或者测试环境的时候呢我们修改了代码，因为浏览器缓存，可能不会生效，需要手动清除缓存，才能看到修改后的效果，这里我们做一个配置让浏览器不缓存相关的资源。

```nginx
# ~* \.(js|css|png|jpg|gif)$ 是匹配以相关文件类型然后单独处理。 add_header 是给请求的响应加上一个头信息Cache-Control no-store，告知浏览器禁用缓存，每次都从服务器获取
location ~* \.(js|css|png|jpg|gif)$ {
    add_header Cache-Control no-store;
}
```

#### 规则
```nginx
location = / {
    ...
}

location / {
    ...
}

location /documents/ {
    ...
}

location ^~ /images/ {
    ...
}

location ~* \.(gif|jpg|jpeg)$ {
    ...
} 
```

- = 表示精确匹配。只有请求的url路径与后面的字符串完全相等时，才会命中（优先级最高）。
- ^~ 表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找。
- ~ 表示该规则是使用正则定义的，区分大小写。
- ~* 表示该规则是使用正则定义的，不区分大小写。

## 自定义错误页面
> 网站错误很多，可以根据不同的错误返回不同的结果。

```nginx
# 通过状态码，返回指定的错误页面
error_page 500 502 503 504 /50x.html;

location = /50x.html {
    # 指定文件位置 
    root /source/error_page;
}

```

## 适配 PC、移动设备
> 响应式虽然也能解决，但一些复杂的应用，还是分开来给用户的体验更好。

``` nginx
server {
  listen 80;
  server_name localhost;
  location / {
     # 查找 pc 资源的路径
     root /usr/share/nginx/pc;
     
     # 通过内置变量$http_user_agent，可以获取到请求客户端的userAgent，就可以用户目前处于移动端还是PC端，进而展示不同的页面给用户。
     if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
        # 查找 mobile 资源的路径
        root /usr/share/nginx/mobile;
     }
     index index.html;
  }
}
```
