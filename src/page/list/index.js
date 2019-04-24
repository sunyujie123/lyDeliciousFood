/*
<<<<<<< HEAD
* @Author: mmall
=======
* @Author: Sun Yu Jie
>>>>>>> e5f90ce951510f128d211a4c04212b20ac3cfb57
* @Date:   2017-05-27 17:57:49
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-24 18:41:20
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
<<<<<<< HEAD
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');
const url = decodeURIComponent(window.location.search);
const uid = url.substr(5,2);
// const Len = $('.w .link').length-4;
// for(let i =5;i<Len;i++){
//     let a = $('.w .link')[i]
//     const value = a.href.substr(50)
//     a.href = './list.html?' +'uid='+uid+'&keyword='+value
// }
var page = {
    data : {
        listParam : {
            keyword         : _mm.getUrlParam('keyword')    || '',
            categoryId      : _mm.getUrlParam('categoryId') || '',
            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
            pageNum         : _mm.getUrlParam('pageNum')    || 1,
            pageSize        : _mm.getUrlParam('pageSize')   || 20
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        const keyword = listParam.keyword;
        const url = 'http://127.0.0.1:3000/login/cookie/info?keyword='+keyword;
        _mm.request({
            url:url,
            type:'get',
        },(data)=>{
            if(data){
                const result = data.data;
                result.uid = uid
                listHtml = _mm.renderHtml(templateIndex, {
                    list :  result
                });
            $pListCon.html(listHtml);
            }else{
                $('.p-list-con').html('<p class="err-tip">很抱歉，实在找不到您要的美食。</p>')
            }
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    },
};
$(function(){
    page.init();
=======
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');
const url = decodeURIComponent(window.location.search);
const uid = url.substr(5,1);
var page = {
	data: {
		listParam: {
			keyword: _mm.getUrlParam('keyword') || '',
			categoryId: _mm.getUrlParam('categoryId') || '',
			orderBy: _mm.getUrlParam('orderBy') || 'default',
			pageNum: _mm.getUrlParam('pageNum') || 1,
			pageSize: _mm.getUrlParam('pageSize') || 20
		}
	},
	init: function () {
		this.onLoad();
	},
	onLoad: function () {
		this.loadList();
	},
	// 加载list数据
	loadList: function () {
		var _this = this,
			listHtml = '',
			listParam = this.data.listParam,
			$pListCon = $('.p-list');
		$pListCon.html('<div class="loading"></div>');
		// 删除参数中不必要的字段
		listParam.categoryId
			? (delete listParam.keyword) : (delete listParam.categoryId);
		// 请求接口
		const keyword = listParam.keyword;
		const url = 'http://127.0.0.1:3000/login/cookie/info?keyword=' + keyword;
		_mm.request({
			url: url,
			type: 'get',
		}, (data) => {
			if(data.code === 1){
				const r = data.result.result
				if(r === null){
					$('.p-list').html('<p class="err-tip">很抱歉，实在找不到您要的美食。</p>')
				}else{
					const res = r.data
					res.uid = uid
					listHtml = _mm.renderHtml(templateIndex, {
						list: res
					});
					$pListCon.html(listHtml);
				}
			}else{
				const result = data.data;
				$('.p-list').html(result)
			}
		});
	},
};
$(function () {
	page.init();
>>>>>>> e5f90ce951510f128d211a4c04212b20ac3cfb57
})