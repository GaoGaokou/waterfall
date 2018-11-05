
function ajaxFun(callBack, method, url, data, flag) {
    var xhl = null;
    if (window.XMLHttpRequest) {
        xhl = new XMLHttpRequest();//创建ajax对象
    } else {
        xhl = new ActiveXObject('Microsoft.XMLHttp');
    }
    method = method.toUpperCase();
    if (method == 'GET') {
        var date = new Date(),
            timer = date.getTime();//get请求会从缓存中获取数据，为了避免同一个URL从缓存中获取，
        //可以为URL添加时时间戳保证URL每次都不同
        xhl.open(method, url + '?' + data + '&timer=' + timer, flag);
        xhl.send();

    } else if (method == 'POST') {
        xhl.open(method, url, flag);
        xhl.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');//post数据文本内容的编码格式
        // xhl.send("username=aimee&age=18");//发送出去的数据
        xhl.send(data);//发送出去的数据

    }

    xhl.onreadystatechange = function () {
        //每次状态的变化都会触发onreadystatechange()函数
        if (xhl.readyState == 4) {// 响应回来
            if (xhl.status == 200) {
                //将服务器返回的信息responseText
                callBack(xhl.responseText);//渲染服务器返回的数据，将其显示到页面中，写成回掉调函数的形式方便被扩展调用
            } else {
                console.log('error');
            }
        }
    }
}


            //JSON格式
            //   var data=[
            //       {},
            //       {},
            //       {},
            //   ]
            // function showList(data) {
            //     var str = '';
            //     data.forEach(function (ele, index) {
            //         str += '<li>' + ele.title + '-' + ele.date + '</li>'
            //     })
            //     ulIndex.innerHtml = str;
            // }
            // function showPerson(data){
            //     coonsole.log(data);
            // }


