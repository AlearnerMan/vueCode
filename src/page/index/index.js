import React from "react"
import ReactDOM from 'react-dom';
import './css/index.less'
import ObserverPage from "./observer/pageShow.js"


//@license 我需要增加点注释来看看
ReactDOM.render(
    <div>Hello World!
    <ObserverPage/>
    </div>,
    document.getElementById('root')
)