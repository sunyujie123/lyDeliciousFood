/*
* @Author: Sun Yu Jie
* @Date:   2018-03-21 20:20:59
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-21 20:44:00
*/
require('./index.css');
require('page/common/nav-simple/index.js')
const _mm = require('util/mm.js');

$(function(){
  let type = _mm.getUrlParam('type') || 'default';
  let $element = $('.' + type + '-success').show();
  // 显示对应的提示元素
  $element.show();
})