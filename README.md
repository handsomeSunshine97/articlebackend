## 项目说明文件

- 基于express 搭建
- 后台ui使用layui
- 使用的技术 layui+jquery+aysnc/awit



## 运行项目

1. `npm i ` 安装项目所有的依赖项
2. 打开`data`导入sql文件，在修改config/db.json数据库配置信息。
3. 执行`npm run serve` 启动项目
4. 这是在github上面手动修改的，需要执行git pull 进行拉取
5. again


## 加入进度条 NProgress

- 在网页加载完毕之前加载进度条，加载完毕取消进度条即可
```
    function startNProgress(){
        NProgress.set(0.4);// 默认设置40% NProgress.set(0) 等价与 NProgress.start()
        let interval = setInterval(function(){
            NProgress.inc(); // 以小量递增
        },200)

        $(window).on('load',()=>{
            clearInterval(interval)
            NProgress.done()
        })
    }

    startNProgress();
```

> 高版本的jquery不支持 ` $(window).on('load')`的写法，改为on绑定即可. [参考](https://www.jianshu.com/p/d1269761bd0a)


