## 针对移动端的前端工作流(6)—Ajax请求的正确姿势

在`src/js/index.js`中index.js中示例了处理一个ajax请求的正确姿势，其中有5点需要注意的地方，请看下面的demo

``` js

/**
 * 点击按钮发送ajax请求
 * 1. 考虑ajax请求失败的情况
 * 2. 考虑ajax请求成功，但是状态不是200的情况
 * 3. 考虑ajax请求成功，状态是200，但是没有数据的情况
 * 4. 考虑ajax重复请求的情况
 * 5. 考虑ajax请求接口时间长的交互效果
 */

var submit = function () {

    var me = $(this);

	// 判断是否是重复点击
    if (me.hasClass('disabled')) {

        return;

    }
    me.addClass('disabled');

	// 发送的数据
    var sendData = {
        time: 3
    };

    $.ajax({
            url: 'http://wiki.xyzphp.com/t.php',
            type: 'POST',
            data: sendData,
            beforeSend: function () {
            	// 发送ajax请求前的loading
                lnv.pageloading();
            }
        })
        // 服务器请求成功
        .done(function (res) {

			// 处理返回的数据，因为有的时候返回的数据可能是字符串，而非json格式
            res = typeof(res) === 'string' ? JSON.parse(res) : res;

			// 如果返回的数据状态是200
            if (res.status == 200) {

				// 如果返回的数据data为空
                if (res.data.length === 0) {

                    lnv.alert({
                        title: '提示',
                        content: '没有数据',
                        alertBtnText: '确定',
                        alertHandler: function () {
                            alert('点击了确定');
                        }
                    });

                }
                else {

                    // 如果返回的数据data不为空

                }

            }
            // 如果返回的数据状态不是200
            else {

                alert('error');

            }
        })
        // 服务器请求失败
        .fail(function (jqXHR, textStatus, errorThrown) {

            alert('error');

        })
        .always(function () {

			// 无论成功还是失败，删掉loading效果
            lnv.destroyloading();
			// 删除重复点击的标示
            me.removeClass('disabled');

        });
};


```