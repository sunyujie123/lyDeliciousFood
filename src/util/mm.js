/*
* @Author: Sun Yu Jie
* @Date:   2018-03-20 18:38:38
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-20 21:01:27
*/
const hoGan = require('hogan');
const config = {
  serverHost : '',
};

const _mm = {
  request:function(param){
    const _this = this;
    $.ajax({
      type : param.method,
      url : param.url || '',
      dataType : param.type || 'json',
      success : function (res){
        if(0 === res.status){
          // 请求成功
          typeof param.success === 'function' && param.success(res.data,res.msg);
        }else if(10 === res.status){
          // 没有登录状态，请求登录
          _this.doLogin();
        }else if(1 === res.status){
          // 请求数据错误
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error : function(error){
        typeof param.error === 'function' && param.error(error.status);
      },
    });
  },
  // 获取服务器地址
  getServerUrl: function(path){
    return config.serverHost + path;
  },
  // 获取url地址参数
  getUrlParam: function(name){
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  // 渲染html模板
  renderHtml: function(htmlTemlplate,data){
    const template = hoGan.compile(htmlTemlplate);
    const result = template.render(data);
    return result;
  },
  // 成功提示
  successTips: function(msg){
    alert(msg||'操作成功')
  },
  // 错误提示
  errorTios: function(msg){
    alert(msg||'操作失败')
  },
  // 字段验证 支持非空、手机、邮箱
  validate: function(value,type){
    const value = $.trim(value);
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
      return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
    }
  },
  // 统一登录处理
  doLogin: function(){
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  // 跳转主页
  goHome: function(){
     window.location.href = './index.html?';
  },
};

module.exports = _mm;