let name = 'kobe';
let obj1 = {
    name:name,
    getName:function(){
        return this.name;
    }
}

// 等价于
let obj2 = {
    name,
    getName(){
        return this.name
    }
}

let obj3 = {
    name,
    getName(){
        return this.name
    }
}


console.log(obj1.getName())
console.log(obj2.getName())
console.log(obj3.getName())
