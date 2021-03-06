/*
* @Author: Sun Yu Jie
* @Date:   2017-05-28 19:45:49
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-24 18:54:32
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');
var page = {
	data: {
		productId: _mm.getUrlParam('keyword') || '',
	},
	init: function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function () {
		// 如果没有传productId, 自动跳回首页
		if (!this.data.productId) {
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent: function () {
		var _this = this;
		// 图片预览
		$(document).on('mouseenter', '.p-img-item', function () {
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src', imageUrl);
		});
		// count的操作
		$(document).on('click', '.p-count-btn', function () {
			var type = $(this).hasClass('plus') ? 'plus' : 'minus',
				$pCount = $('.p-count'),
				currCount = parseInt($pCount.val()),
				minCount = 1,
				maxCount = _this.data.detailInfo.stock || 1;
			if (type === 'plus') {
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			}
			else if (type === 'minus') {
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}
		});
		// 加入购物车
		$(document).on('click', '.cart-add', function () {
			_cart.addToCart({
				productId: _this.data.productId,
				count: $('.p-count').val()
			}, function (res) {
				window.location.href = './result.html?type=cart-add';
			}, function (errMsg) {
				_mm.errorTips(errMsg);
			});
		});
	},
	// 加载商品详情的数据
	loadDetail: function () {
		var _this = this,
			html = '',
			$pageWrap = $('.page-wrap');
		// loading
		$pageWrap.html('<div class="loading"></div>');
		// 请求detail信息
		const keyword = this.data.productId;
		const url = 'http://127.0.0.1:3000/login/cookie/info?keyword=' + keyword;
		_mm.request({
			url: url,
			type: 'get',
		}, (data) => {
			if (data !== null) {
				const result = data.result.result.data[0]
				html = _mm.renderHtml(templateIndex, result);
				$pageWrap.html(html);
			} else {
				$pageWrap.html('<p class="err-tip">此美食太淘气，找不到了</p>');
			}
		});
	},
};
$(function () {
	page.init();
})