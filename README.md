# MPA-Boilerplate
这是一个用gulp写的多页面web应用脚手架，主要有如下优点：

1. 支持css预处理，如解析sass
2. 支持js预处理，将ES6+转化位ES5
3. 支持图片预处理，可以压缩png、jpg、svg等
4. 支持css/js压缩、自动打包后生成hash文件名
5. **开发模式支持热更新**

注：热更新需要安装chrome插件，教程为http://cnodejs.org/topic/53427d16dc556e3b3901861e

## 使用方法

1. 安装构建工具依赖

   ```javascript
   npm install
   ```

2. 开发模式，启动热更新

   ```javascript
   npm run dev  或  gulp d
   ```

启动之后，只要js或css或html文件有改变，则浏览器会自动刷新。

### 打包线上版本

```javascript
npm run build 或 gulp r
```

## 注意

**目录结构**

src
​	 — static
​		—css
​		—img
​		—js
dist

src目录下是源代码文件夹，所有的页面对应一个html文件，在src根目录下，js、css文件放在相应目录下，在html中引入即可。下面有两点要注意：

1. js文件夹下创建新的js文件时，扩展名必须为jsx，你可以在jsx文件中使用es6语法，但在html中引入时，后缀是js,因为打包之后jsx会被转化为js文件
2. css文件夹下创建新的css文件时，扩展名必须为scss, 你可以在scss文件中使用sass语法，但在html中引入时，后缀是css,因为打包之后css会被转化为js文件

使用 npm run build 或 gulp r 打包之后，会在根目录下生成一个和src目录同结构的目录，里面是打包之后生成的release文件。

