/**
 * 
 * @authors chenxiaowei
 * @date    2017-07-11
 * @description 主入口模块
 */

import React from 'react'
import { render } from 'react-dom'

// 引入React-Router模块
import { BrowserRouter, Router, HashRouter, Match, Route, Link, hashHistory, IndexLink } from 'react-router-dom'

//引入样式文件
import '../css/main.css'

//引入js文件
import List from './list.js'
import Sys from './sys.js'
//import Page from './page.js'


class Main extends React.Component {
	constructor(props) {
        super(props)
    }

    render() {
    	return (
    		<div className="thumb-list">
    			{this.props.children}
    		</div>
    	)
    }
}


render((
    <HashRouter history={hashHistory}>
        <Main>
            <Route path="/" component={Main} />
            <Route path="/sys" component={Sys} />
        </Main>
     </HashRouter>
), document.getElementById("root"))