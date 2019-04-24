/*
* @Author: Sun Yu Jie
* @Date:   2017-05-08 22:26:19
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-23 21:29:40
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

// 表单里的错误提示
var formError = {
	show: function (errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide: function () {
		$('.error-item').hide().find('.err-msg').text('');
	}
};

// page 逻辑部分
var page = {
	init: function () {
		this.bindEvent();
	},
	bindEvent: function () {
		var _this = this;
		// 登录按钮的点击
		$('#submit').click(function () {
			_this.submit();
		});
		// 如果按下回车，也进行提交
		$('.user-content').keyup(function (e) {
			// keyCode == 13 表示回车键
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	// 提交表单
	submit: function () {
		var formData = {
				username: $.trim($('#username').val()),
				password: $.trim($('#password').val())
			},
			// 表单验证结果
			validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			const url = 'http://127.0.0.1:3000/login';
			_mm.request({
				url: url,
				type: 'post',
				data: formData,
			}, (data) => {
				console.log(data)
				if (data.success) {
					const uid = data.data.uid;
					window.location.href = './index.html?uid=' + uid;
				} else {
					formError.show(data.data)
				}
				;
			});
		}
		// 验证失败
		else {
			// 错误提示
			formError.show(validateResult.msg);
		}

	},
	// 表单字段的验证
	formValidate: function (formData) {
		var result = {
			status: false,
			msg: ''
		};
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		// 通过验证，返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};
$(function () {
	page.init();
});