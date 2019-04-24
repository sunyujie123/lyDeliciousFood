/*
<<<<<<< HEAD
* @Author: Rosen
=======
* @Author: Sun Yu Jie
>>>>>>> e5f90ce951510f128d211a4c04212b20ac3cfb57
* @Date:   2017-05-17 14:17:01
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-24 20:59:41
*/

'use strict';
require('./index.css');
<<<<<<< HEAD
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');
var _cart   = require('service/cart-service.js');
// 导航
var nav = {
    init : function(){
        this.loadUserInfo();
        this.bindEvent();
        // this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        // 登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        // 退出点击事件
        $('.js-logout').click(function(){
            window.location.href = './index.html'
        });
        // 模态框关闭
        $('.close').click(function(){
             $('.bg-model').hide()
        })
    },
    // 加载用户信息
    loadUserInfo : function(){
        const url = decodeURIComponent(window.location.search);
        const uid = url.substr(5)
        if(!uid){
            $('.bg-model').show()
        }else{
            $('#user').attr('href','./user-center.html?uid='+uid);
            const url2 = 'http://127.0.0.1:3000/login/user/session?uid='+uid;
            _mm.request({
                url:url2,
                type:'get',
            },(data)=>{
                if(data.username){
                    $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(data.username);
                }
            })
        }
    },
    // 加载购物车数量
    // loadCartCount : function(){
    //     _cart.getCartCount(function(res){
    //         $('.nav .cart-count').text(res || 0);
    //     }, function(errMsg){
    //         $('.nav .cart-count').text(0);
    //     });
    // }
=======
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
// 导航
var nav = {
	init: function () {
		this.loadUserInfo();
		this.bindEvent();
		// this.loadCartCount();
		return this;
	},
	bindEvent: function () {
		// 登录点击事件
		$('.js-login').click(function () {
			_mm.doLogin();
		});
		// 注册点击事件
		$('.js-register').click(function () {
			window.location.href = './user-register.html';
		});
		// 退出点击事件
		$('.js-logout').click(function () {
			window.location.href = './index.html'
		});
		// 模态框关闭
		$('.close').click(function () {
			$('.bg-model').hide()
		})
	},
	// 加载用户信息
	loadUserInfo: function () {
		const url = decodeURIComponent(window.location.search);
		const uid = url.substr(5,1)
		if (!uid) {
			$('.bg-model').show()
		} else {
			$('#user').attr('href', './user-center.html?uid=' + uid);
			const url2 = 'http://127.0.0.1:3000/login/user/session?uid=' + uid;
			_mm.request({
				url: url2,
				type: 'get',
			}, (data) => {
				if (data.username) {
					$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(data.username);
				}
			})
		}
	},
	// 加载购物车数量
	// loadCartCount : function(){
	//     _cart.getCartCount(function(res){
	//         $('.nav .cart-count').text(res || 0);
	//     }, function(errMsg){
	//         $('.nav .cart-count').text(0);
	//     });
	// }
>>>>>>> e5f90ce951510f128d211a4c04212b20ac3cfb57
};

module.exports = nav.init();