const express = require('express');
const path = require('path');
const app = express();





// 导入路由模块
const router = require('./router/router.js')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 定义中间件，托管静态资源
app.use('/public',express.static(path.join(__dirname,'public')));

const artTemplate = require('art-template'); 
const express_template = require('express-art-template');

//配置模板的路径111111
app.set('views', __dirname + '/views/');

//设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template);

//使用模板引擎扩展名为html
app.set('view engine', 'html');


// 使用路由中间件 req.body
app.use(router)

app.listen(4000,_=>console.log('server is running at port 4000'))