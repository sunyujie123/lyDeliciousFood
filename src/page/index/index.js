const _mm = require('util/mm.js');
require('page/common/header/index.js')
require('page/common/nav/index.js')
// 测试 request 方法
// $.ajax({
//   url:'http://apis.juhe.cn/cook/query?key=3b7bc7abf480f29a42e6d3ba74c614fe&menu=东坡肉',
//   method:'get',
//   dataType: 'jsonp',
//   success:function(result){
//     console.log(result)
//   },
//   error:function(err){
//     console.log(err)
//   }
// });

// 测试获取路由参数方法
// console.log(_mm.getUrlParam('test'));

// 测试html模板解析
// const html = '<div>{{data}}</div>';
// const data = {
//   data : 123
// }
// console.log(_mm.renderHtml(html,data))