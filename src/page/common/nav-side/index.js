/*
* @Author: Sun Yu Jie
* @Date:   2018-03-21 19:30:44
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-21 20:16:32
*/
require('./index.css')
const _mm     = require('util/mm.js');
const templateIndex = require('./index.string')
// 侧边导航
const navSide = {
  options:{
    name:'',
    navList:[
      {name : 'user-center', desc : '个人中心',href : './user-center.html'},
      {name : 'order-list', desc : '我的订单',href : './order-list.html'},
      {name : 'pass-update', desc : '修改密码',href : './pass-update.html'},
      {name : 'about', desc : '关于美食',href : './about.html'}
    ]
  },
  init:function(options){
    // 合并选项
    $.extend(this.options, options)
    this.renderNav();
  },
  // 渲染导航菜单
  renderNav:function(){
    // 计算active数据
    for(let i=0,iLength=this.options.navList.length;i<iLength;i++){
      if(this.options.navList[i].name === this.options.name){
        this.options.navList[i].isActive = true;
      }
    };
    // 渲染数据
    const navHtml = _mm.renderHtml(templateIndex,{
      navList : this.options.navList
    });
    // 把html放入容器
    $('.nav-side').html(navHtml);
  }
};

module.exports = navSide;
