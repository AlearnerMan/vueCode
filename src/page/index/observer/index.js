function ObserverList(params) {
    this.observerList = []
}

ObserverList.prototype.add = function (obj) {
    return this.observerList.push(obj)
}

ObserverList.prototype.empty = function () {
    this.observerList = []
}

ObserverList.prototype.count = function () {
    return this.observerList.length
}

ObserverList.prototype.get = function (index) {
   if(index > -1 && index < this.observerList.length){
       return this.observerList[index]
   }
}

ObserverList.prototype.insert = function (obj,index) {
    var pointer = -1 
    if(index === 0 ){
        this.observerList.unshift(obj)
        pointer = index
    }else if(index === this.observerList.length){
        this.observerList.push(obj)
        pointer = index
    }else{
        this.observerList.splice(index,0,obj)
        pointer = index
    }
    return pointer
}

ObserverList.prototype.indexOf = function (obj,startIndex) {
    var i = startIndex,pointer = -1,len = this.observerList.length

    while (i < len) {
        if(this.observerList[i] === obj){
            pointer = i
        }
        i++
    }
    return pointer
}

ObserverList.prototype.removeAt = function(index){
    if(index === 0){
        this.observerList.shift()
    }else if ( index === this.observerList.length){
        this.observerList.pop()
    }else {
        this.observerList.splice(index,1)
    }
}


// 增加一个扩展对象属性的方法

function extend(extension,obj){
    for(var key in extension){
        obj[key] = extension[key]
    }
}




// 

function Subject(){
    this.observers = new ObserverList()
}

Subject.prototype.addObserver = function (observer) {
    this.observers.add(observer)
}


Subject.prototype.removeObserver = function (observer) {
    this.observers.removeAt(this.observers.indexOf(observer))
}

Subject.prototype.notify = function (context) {
    var observerCount = this.observers.count()
    for(var i = 0;i<observerCount;i++){
        this.observers.get(i).update(context)
    }
}


// 具体的观察者 
function Observer() {
    this.update = function () {
        console.log("我被通知更新了！")
    }
}


export default {
    Observer,
    Subject,
    ObserverList,
    extend
}
