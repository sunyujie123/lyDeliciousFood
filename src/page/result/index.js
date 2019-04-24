/*
* @Author: Sun Yu Jie
* @Date:   2017-05-19 21:52:46
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-23 22:26:24
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
    const url = decodeURIComponent(window.location.search);
    const uid = url.substr(5);
    $('#result').attr('href','./index.html?uid='+uid)
})