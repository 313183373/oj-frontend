# OJ-FRONTEND

## 简介

这是OJ的前端，使用了React+Redux+React Router+Material UI+Socket

所有的组件都在`src/components/`中，每个组件的标准目录格式都是

![image-20190421201255470](https://ws4.sinaimg.cn/large/006tNc79ly1g2aim7xwd4j30ck0ciq3z.jpg)

views目录下基本是Dumb Components（尽量是，有些不是，因为必须有生命周期方法）

然后其他文件学过redux的同学应该都能一眼看出来，包括action的类型，以及reducer，以及actionCreators

commonState中定义了一些全局的状态（比如用户的信息），目录格式跟组件类似，只是没有views目录。

pages目录中存放包装页面，处理一些简单的路由参数逻辑，以供Router使用

urls目录是url的生成器，主要是为了统一管理前端用到的所有的URL，以及根据当前的环境自动切换URL

utils目录存放输入验证工具。

## 如何运行？

1. 在Docker中运行（推荐）

   目录下有Dockerfile文件，可以自己构建image，也可以直接从Docker Hub上拉取已经制作好的image

   `docker pull 313183373/oj-frontend`

   当然只有前端肯定是不够的，需要拉取后端、数据库、以及判题机

   详情请看的[在Docker中运行](https://github.com/313183373/oj-backend)

2. 本地运行

   clone下本仓库后，在项目目录下用终端运行

   `npm install`

   然后`npm start`，就可以看到页面，但是现在还没有部署后端，所以不会看到任何数据

   再部署后端，及数据库和下载好313183373/oj-judge的镜像就可以完整运行了。请看[本地运行部分](https://github.com/313183373/oj-backend)

   