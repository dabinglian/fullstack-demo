import React from 'react'

import SiteConfig from './site-config.js'
import flippingBook from './lib/flippingbook.js'


export default class Page extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            lists: SiteConfig.files,
            id: this.props.params.id,
            currentCatalog: [],
            currentIndex: 0,
            currentPageNum: 0
        }   
    }

    setPage() {
        let pageFile = "page" + this.state.currentIndex,
            pageNum = this.state.currentPageNum;
        flippingBook.pages = [];

        for(var i=0;i<pageNum;i++){
            if(i==0){
                flippingBook.pages.push("./src/images/"+pageFile+"/front.jpg");
            }
            else if(i==pageNum-1){
                flippingBook.pages.push("./src/images/"+pageFile+"/back.jpg");
            }
            else{
                var j = i.toString();
                if(j.length<2){
                    j = "0"+j;
                }
                flippingBook.pages.push("./src/images/"+pageFile+"/"+j+".jpg");
            }
        }
    }

    renderPage() {
        flippingBook.settings.bookWidth = 1080;
        flippingBook.settings.bookHeight = 779;
        flippingBook.settings.pageBackgroundColor = 0xffffff;
        flippingBook.settings.backgroundColor = 0xf5dcbf;
        flippingBook.settings.zoomUIColor = 0xffffff;
        flippingBook.settings.useCustomCursors = false;
        flippingBook.settings.dropShadowEnabled = false;
        flippingBook.settings.zoomEnabled= true;
        flippingBook.create();
    }

    handlePrePage() {
        if(flippingBook)
            flippingBook.flipBack();
    }

    handleNextPage() {
        if(flippingBook)
            flippingBook.flipForward();
    }

    handlePageNav(e) {
        let page = parseInt($(e.target).data("key"))+1;
        if(page && flippingBook)
            flippingBook.getFlippingBookReference().flipGotoPage(page);
    }

    componentWillMount() {
        let currentIndex = this.state.id,
            currentCatalog,
            currentPageNum;

        this.state.lists.map(function(list){
            list.items.map(function(item){
                if(item.index == currentIndex){
                    currentCatalog = item.catalog;
                    currentPageNum = item.num;
                    return true;
                }
            })
        });

        this.setState({currentIndex, currentCatalog, currentPageNum});
    }

    componentDidMount() {
        let setSize = require('./lib/setSize.js');
        setSize.default();
    	this.setPage();
        this.renderPage();
    }

    render() {
    	return (
    		<div className="content" id="content">
    			<div id="fbContainer">
					<a className="altlink" href="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"><div id="altmsg">浏览此页面需要下载flash player，点击可前往下载</div></a>
				</div>
				<div id="fbMenu">
                    <div className="pageNavigation">
                        {
                            this.state.currentCatalog.map((item) => {
                                let random = Math.random()*10000;
                                return (
                                    <a href="javascript:void(0)" key={random} data-key={item.key} onClick={this.handlePageNav}>{item.name}</a>
                                )
                            })
                        }
                    </div>
                    <a href="#/" className="backBtn" title="返回杂志列表">返回列表</a>
                    <div className="pagePreNext">
                        <a href="javascript:void(0)" className="pre" title="上一页" onClick={this.handlePrePage}></a>
                        <a href="javascript:void(0)" className="next" title="下一页" onClick={this.handleNextPage}></a>
                    </div>
                </div>
    		</div>
    	)
    }
}