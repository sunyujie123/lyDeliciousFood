/*
<<<<<<< HEAD
* @Author: Rosen
=======
* @Author: Sun Yu Jie
>>>>>>> e5f90ce951510f128d211a4c04212b20ac3cfb57
* @Date:   2017-05-15 15:26:38
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-24 16:02:55
*/
var Hogan = require('hogan');
var conf = {
    serverHost : ''
};
var _mm = {
    // 网络请求
    request : function(param, sCb,eCb){
        var _this = this;
        $.ajax({
            url: param.url,
            type: param.type || 'get',
            dataType: 'json',
            data: param.data,
            success: sCb,
            error: eCb
        });
    },
    // 获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html模板
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~');
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate : function(value, type){
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 统一登录处理
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href = './index.html';
    },
    key:'3b7bc7abf480f29a42e6d3ba74c614fe'
};

module.exports = _mm;