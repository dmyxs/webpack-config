import React from 'react'
import ReactDom from 'react-dom'
import data from './data.json'
import './index.css'
import './index2.scss'
import './index3.less'
import '../public/iconfont/iconfont.css'
import { count } from './test'
import $ from 'jquery'
console.log($)

//测试摇树
console.log(count(10, 5))

//测试promise
function add() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('成功')
        }, 1000)
    })
}
add().then((res) => {
    console.log(res)
})
console.log(data.data)

//测试热模块更新是否更新JS文件
console.log(new Date())

//魔法注释：代码分割
import(/*webpackChunkName: 'test'*/ './test').then(({ count }) => {
    console.log(count(5, 6))
})

//测试懒加载/预加载
document.getElementById('btn').addEventListener('click', () => {
    import(
        /*webpackChunkName:'testLazyLoad', webpackPrefetch:true */ './test'
    ).then(({ count }) => {
        console.log(count(5, 8), 'test 文件懒加载了')
    })
})

//测试React
class App extends React.Component {
    render() {
        return <div>hello React</div>
    }
}

ReactDom.render(<App />, document.getElementById('root'))
