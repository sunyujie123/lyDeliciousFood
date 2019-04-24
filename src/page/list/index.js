/*
* @Author: Sun Yu Jie
* @Date:   2017-05-27 17:57:49
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-24 18:41:20
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
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
})