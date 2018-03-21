/*
* @Author: Sun Yu Jie
* @Date:   2018-03-20 18:38:38
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-21 22:26:47
*/
const hoGan = require('hogan');
const config = {
  serverHost : '',
};

const _mm = {
  request:function(param){
    const _this = this;
    $.ajax({
      type        : param.method  || 'get',
      url         : param.url     || '',
      dataType    : param.type    || 'json',
      data        : param.data    || '',
      success : function(res){
        // 请求成功
        if(0 === res.status){
          typeof param.success === 'function' && param.success(res.data, res.msg);
        }
        // 没有登录状态，需要强制登录
        else if(10 === res.status){
           _this.doLogin();
        }
        // 请求数据错误
        else if(1 === res.status){
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error : function(error){
        typeof param.error === 'function' && param.error(error.status);
      },
    });
  },
  // 获取服务器地址
  getServerUrl : function(path){
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
  validate : function(value, type){
    const val = $.trim(value);
    // 非空验证
    if('require' === type){
      return !!value;
    }
    // 手机号验证
    if('phone' === type){
      return /^1\d{10}$/.test(val);
    }
    // 邮箱格式验证
     if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(val);
        }
  },
  // 统一登录处理
  doLogin : function(){
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  // 跳转主页
  goHome : function(){
    window.location.href = './index.html';
  }
};

module.exports = _mm;