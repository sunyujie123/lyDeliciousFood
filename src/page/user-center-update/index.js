/*
* @Author: Rosen
* @Date:   2017-05-23 19:52:16
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-23 22:21:57
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
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                phone       : $.trim($('#phone').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                const url = decodeURIComponent(window.location.search);
                const uid = url.substr(5);
                let url2 = 'http://127.0.0.1:3000/login/user/update';
                userInfo.uid = uid;
                // 更改用户信息
                _mm.request({
                    url:url2,
                    type:'post',
                    data:userInfo,
                },(data)=>{
                   if(data.msg){
                    window.location.href = './result.html?uid='+uid
                   }
                })
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        const url = decodeURIComponent(window.location.search);
        const uid = url.substr(5);
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
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证手机号
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});