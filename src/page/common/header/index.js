/*
* @Author: Sun Yu Jie
* @Date:   2018-03-20 22:26:34
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-21 19:46:30
*/
require('./index.css');
const _mm     = require('util/mm.js');

// 通用页面头部
const header = {
  init:function(){
    this.bindEvent();
  },
  onLoad:function(){
    const keyword = _mm.getUerParam('keyword');
    // 如果关键词存在，回填输入框
    if(keyword){
      $('#search-input').val(keyword)
    }
  },
  bindEvent : function(){
    const _this = this;
    // 点击搜索按钮以后，搜索提交
    $('#search-btn').click(function(){
      _this.searchSubmit();
    });
    // 输入回车，搜索提交
    $('#search-input').keyup(function(e){
      // 13是回车键
      if(e.keyCode === 13){
        _this.searchSubmit();
      }
    })
  },
  // 搜索的提交
  searchSubmit:function(){
    const keyword = $.trim($('#search-input').val());
    // 如果提价的时候有关键词
    if(keyword){
      window.location.href = './list.html?keyword='+ keyword;
    }else{
      // 如果没有关键词，直接返回首页
      _mm.goHome();
    }
  }
};

module.exports = header.init();
