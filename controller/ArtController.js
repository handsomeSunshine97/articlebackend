// 文章控制器
const fs = require('fs');
let ArticleController = {}

// 导入模拟（mock）的假数据
let articleData = require("../mockData/article.json");

// 导入model,相当于模型执行sql语句，
const model = require('../model/model.js');

// 导入返回结果的信息
const {delsucc,delfail,exception,argsfail,addsucc,addfail,getsucc,getfail,updsucc,updfail} 
= require('../util/responseMessage.js');

// 获取分页的文章数据
ArticleController.allArticle = async (req,res)=>{
    //1. 接收查询字符串,给limit取别名
    let {page,limit:pagesize} = req.query;
    //2.编写sql语句
    let offset = (page - 1)*pagesize;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id = t2.cat_id 
                order by art_id desc limit ${offset},${pagesize} `;
    let sql2 = `select count(*) as count from article;`
    let promise1 =  model(sql); // [{},{},{}]
    let promise2 =  model(sql2); // [{count:16}]
    // 并行
    let result = await Promise.all([promise1,promise2])
    let data = result[0];
    let count = result[1][0].count;
    let response = {
        code: 0,
        count: count, // 1000是数据的总记录数
        data: data,
        msg:''
    }
    // console.log(data)
    res.json(response)
    // res.json(articleData)
}


//删除文章
ArticleController.delArticle = async (req,res)=>{
    let {art_id} = req.body;
    console.log(art_id)
    let sql = `delete from article where art_id = ${art_id}`;
    let result = await model(sql);
    if(result.affectedRows){
        res.json(delsucc)
    }else{
        res.json(delfail)
    }
}

// 渲染出文章编辑的页面
ArticleController.artEdit = (req,res)=>{
    res.render('article-edit.html')
}

// 渲染出文章添加的页面
ArticleController.artAdd = (req,res)=>{
    res.render('article-add.html')
}

// 提交数据入库
ArticleController.postArt = async (req,res)=>{
    let {title,cat_id,status,content,cover} = req.body;
    let sql = `insert into article(title,content,cat_id,status,cover,publish_date)
                values('${title}','${content}',${cat_id},${status},'${cover}',now())
                `;
    let result = await model(sql)
    if(result.affectedRows){
        res.json(addsucc)
    }else{
        res.json(addfail)
    }

}

// 上传图片的接口
ArticleController.upload = (req,res)=>{
   
    if(req.file){
        // 进行文件的重命名即可 fs.rename
        let {originalname,destination,filename} = req.file;
        let dotIndex = originalname.lastIndexOf('.');
        let ext = originalname.substring(dotIndex);
        let oldPath = `${destination}${filename}`;
        let newPath = `${destination}${filename}${ext}`;
        fs.rename(oldPath,newPath,err=>{
            if(err){ throw err; }
            res.json({code:0,message:'上传文件成功',src:newPath})
        })
    }else{
        res.json({code:1, message:'上传文件失败'})
    }
    
}

// 修改文章的状态
ArticleController.updStatus = async (req,res)=>{
    let {art_id,status} = req.body;
    let sql = `update article set status = ${status} where art_id = ${art_id}`;
    let result = await model(sql);
    if(result.affectedRows){
        res.json(updsucc)
    }else{
        res.json(updfail)
    }
}

// 暴露模块
module.exports = ArticleController;