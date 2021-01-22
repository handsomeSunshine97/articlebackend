// 文章控制器
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
    let sql = `select * from article limit ${offset},${pagesize}`;
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

// 暴露模块
module.exports = ArticleController;