/*
<<<<<<< HEAD
* @Author: Rosen
=======
* @Author: Sun Yu Jie
>>>>>>> e5f90ce951510f128d211a4c04212b20ac3cfb57
* @Date:   2017-05-23 19:33:33
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-23 23:17:03
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分

var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        const url = decodeURIComponent(window.location.search);
        const uid = url.substr(5);
        $('#user-center').attr('href','./index.html?uid='+ uid)
        const url2 = 'http://127.0.0.1:3000/login/user/info?uid='+uid;
        _mm.request({
            url:url2,
            type:'get',
        },(data)=>{
            if(data.msg){
                userHtml = _mm.renderHtml(templateIndex, data.userInfo);
                $('.panel-body').html(userHtml);
            }
        })
    }
};
$(function(){
    page.init();
});