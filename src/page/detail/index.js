

import Vue from "@vue/platforms/web/entry-runtime-with-compiler.js"
import "./css/index.css"

const ComponentA = {
    template:`<div class="contentA">
       <h2>我是子组件A</h2>
       <h3>我是props--foo的值: {{foo}}</h3>
       <button @click="count++">click me add count：{{count}} </button>
       <div >
        <button @click="changeFoo">点击我修改父组件的msg</button>
        <input v-model="inpVal"/>
       </div>
      </div>`,
    data:function () {
        return {
            count:0,
            inpVal:''
        }
    },
    props:['foo'],
    methods:{
        changeFoo(){
            this.$emit("changeFoo",this.inpVal)
        }
    }
}

var a  = new Vue({
    el:"#root",
    template:`<div>
        <h1>我是父组件</h1>
        <h2 ref="msgCon">msg：{{msg}}</h2>
        <h2>计算属性msgDouble: {{strDouble}}</h2>
        <ComponentA :foo='msg' @changeFoo="changeMsg"/>
    </div>
    `,
    data:{
        msg:"hello"
    },
    computed:{
        strDouble:function () {
            return this.msg.repeat(2)
        }
    },
    components:{ComponentA},
    methods:{
        changeMsg(val){
            this.msg = val
            console.log(this.$refs.msgCon.textContent )
        }
    },
    watch:{
        msg:function (val,oldVal) {
            console.log('new: %s, old: %s', val, oldVal)
        }
    }
})
console.log(a);

window.a = a 


var A = function () {
    
}
A.prototype.calculateBonus = function (salary) {
    return salary * 3
}


function calculateB(type,salary) {
    return type.calculateBonus(salary)
}

calculateB(new A(),3000)


var strategies = {
    "S":function (salary) {
        return salary *4
    },
    "A":function (salary) {
        return salary * 3
    },
    "B":function (salary) {
        return salary * 2
    }
}

var calculateBonus = function (level,salary) {
    return strategies[level](salary)
}

