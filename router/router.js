let express = require('express');

// 得到一个路由器
let router = express.Router();


// 导入相应的控制器
const CateController = require('../controller/CateController.js');

// 匹配 / 或 /admin
router.get(/^\/$|^\/admin$/,(req,res)=>{
    res.render('index.html')
})

// 文章列表
router.get('/artindex',(req,res)=>{
    res.render('article-index.html')
})

// 渲染后台分类列表页面
router.get('/catindex',CateController.catindex)

// 渲染出添加分类的页面
router.get('/catadd',CateController.catadd)

// 渲染出编辑分类的页面
router.get('/catedit',CateController.catedit)

// 提交分类的数据
router.post('/postCat',CateController.postCat)


router.get('/artadd',(req,res)=>{
    // res.sendFile( path.join(__dirname,'views/article-add.html') )
    let data = {name:'西红柿炒蛋'}
    res.render('article-add.html',data)
})

// 获取所有分类数据的接口
router.get('/getCate',CateController.getCate)


// 获取所有分类数据的接口
router.get('/getOneCate',CateController.getOneCate)

// 删除分类的接口
router.post('/delCat',CateController.delCat)

// 编辑分类的接口
router.post('/updCate',CateController.updCate)

// 匹配失败的路由
router.all('*',(req,res)=>{
    res.json({errcode:10004,message:"请求错误"})
})

// 暴露出去
module.exports = router;
