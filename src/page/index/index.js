/*
* @Author: Rosen
* @Date:   2017-05-08 15:19:12
* @Last Modified by:   Sun Yu Jie
* @Last Modified time: 2018-03-24 19:24:44
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm             = require('util/mm.js');
const url = decodeURIComponent(window.location.search);
const uid = url.substr(5);
const Len = $('.w .link').length-4;
for(let i =5;i<Len;i++){
    let a = $('.w .link')[i]
    const value = a.href.substr(50)
    a.href = './list.html?' +'uid='+uid+'&keyword='+value
}
const Len2 = $('.floor-wrap a').length;
for(let i=0;i<Len2;i++){
    const b = $('.floor-wrap a')[i]
    const val = b.href.substr(50)
    b.href = './list.html?' +'uid='+uid+'&keyword='+val

}
$(function() {
    // 渲染banner的html
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
