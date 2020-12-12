# infra-vue-ui

## 项目简介

一个组件库，服务于架构组前端项目

## 接口文档链接

无

## 需求文档链接

无

## 主要开发

前端全体人员

## Project setup
```
npm install
```

Compiles and hot-reloads for development
```
npm run serve
```

Compiles and minifies for production
```
npm run build
```

Run your tests
```
npm run test
```

Lints and fixes files
```
npm run lint
```

Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 关于infra-vue-ui的目录结构

src/index：项目的插件访问入口。

packages：整个项目的所有UI组件。

## 组件命名规范

参照element-ui。

组件的name一律使用官方推荐的方式进行命名。kebab-case、PascalCase。

```vue
<template>
    <div>test</div>
</template>

<script>
export default {
  name: 'InfraTest'
}
</script>

<style scoped>

</style>
```

文件夹的命名一般使用小写，如果是多个单词，可以使用'-'连接起来。（参考packages/test组件）

.vue文件名，一般使用小写，规则同文件夹的命名。（参考packages/test组件）

## 组件编写规则

每个单独的组件，都在一个单独的文件夹中，这个单独的文件夹中必须有一个index.js和一个src文件夹。

其中，index.js用于该组件模块的导出，src文件夹负责组件的开发工作。





