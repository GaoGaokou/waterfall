//  ajaxFun(addDom,'GET','http://localhost/waterfall2-1/src/js/data.json','cpage=1',true)
//  function addDom(data){
//      console.log(JSON.parse(data));
//  }
//思路：
//瀑布流其实是由四个li组成，每次都将ajax请求回来的数据添加到页面中高度最短的li中
//1.ajax请求数据=>将返回的数据通过回调函数addDom
//2.在回调函数中将数据添加到页面并为他添加样式  
    //  1）创建图片对象  标题对象 并将请求回来的数据对象挨个复制给创建的变量 ajax()
    //  2）判断将创建的变量放在页面中位置很重要
    //  3）需要将图片放在四个li中offsetHeight最短的那个li中（每添加一次图片就得判断四个li中offsetHeight最短的那个）getMinHeight() 返回li索引
    //  4）然后是鼠标滚动事件 当滚动位置（scrollHeight+clientHeight）已经到页面临界位置时候（li[index].offsetHeight）
    //  5) 再次发起ajax()数据请求加载第二页pageNum++  这样依次递推 
(function () {
    var oLi = document.getElementsByClassName('box');//获取li列表
    var flag = false;
    var num = 1;
    var initWidth=200;//图片的初始化宽度  由css样式决定
    function getData() {
        if (!flag) {//必须等到当前页面加载完  ajax请求完才能继续请求
            ajaxFun(addDom, 'GET', 'http://localhost/waterfall/src/js/getPics.php', 'cpage=' + num, true);
            num++;//自动加载第二三页
        }
    }
    getData();
    function addDom(data) {//为获取到的数据添加到页面中并添加样式
        var dataList = JSON.parse(data);
        // ajax获取数据,变成对象格式
        dataList.forEach(function (ele, index) {
            var minindex = getMinHeight(oLi);
              ////获取最短图片列表索引，每添加一次图片就得循环重新找最短的图片列表索引
            var oItem = document.createElement('div');
            var oImg = new Image();
            var oP = document.createElement('p');
            oItem.className = 'item';
            oImg.src = ele.preview;//预览小图
            oImg.height=initWidth*ele.height/ele.width;
            //为了避免图片不能立即加载出来时候因无法计算图片的真实offseteight
            //导致后面的图片衔接篡位。所以需要根据每张图片的高宽比列动态设置高度
            oP.innerText = ele.title;//图片标题信息
            oItem.appendChild(oImg);
            oItem.appendChild(oP);
            oLi[minindex].appendChild(oItem);

        });
        flag = false;

    }
    function getMinHeight(dom) {
           ////假如第一个li的高度最小
        var minHeight = dom[0].offsetHeight;
        var index = 0;
        for (var i = 1; i < dom.length; i++) {
            var minH = dom[i].offsetHeight;
            if (minH < minHeight) {
                minHeight = minH;
                index = i;
            }
        }
        return index;
    }
    window.onscroll = function () {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
           //滚动条滚动过的长度
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
           //浏览器显示窗口的高度
        var pageHeight = oLi[getMinHeight(oLi)].offsetHeight;
        //获取文档中最短的数据，当滚轮滑动到列表最短那一列的底部时候
        //  scrollTop+clientHeight 表示已经浏览过的页面
        //就开始加载另一页的数据，
        if (scrollHeight + clientHeight > pageHeight) {
            getData();
        }
    };
})();