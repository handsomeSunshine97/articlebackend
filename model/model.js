// 封装执行sql语句的promise函数
var mysql = require('mysql'); 

// 导入数据库的配置参数
let dbConfig = require("../config/db.json");


//连接数据库参数配置
var connection = mysql.createConnection({
    // 展开参数
   ...dbConfig
});

//连接mysql
connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('connect mysql success');
});


function dbquery(sql){
    return new Promise((resolve,reject)=>{
        connection.query(sql,(err,data)=>{
            if(err){ reject(err); }
            // select(查) => data是一个数组[{},{},..]  data.length > 说明有数据
            // insert delete update（增删改） => data是一个对象 data.affectedRows > 0说明成功
            resolve(data)
        })
    })
}

// 暴露模块的内容
module.exports = dbquery;