let res = {errcode:0,data:{a:1,b:2}};


// 可以实现深层结构
let {errcode:code,data:{a,b}} = res;


console.log(code)
// console.log(data)
console.log(a)
console.log(b)

// 如果一个函数的形参是对象，也可以解构
function foo({age,name}){
  console.log(age,name)
}


foo({name:'jame',age:36});