/*
 * @Author: kevin
 * @Date:   2015-11-13 11:46:23
 * @Last Modified by:   MiaoQingyu
 * @Last Modified time: 2016-09-19 20:22:01
 */

var Project = (function () {

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

        if (me.hasClass('disabled')) {

            return;

        }
        me.addClass('disabled');

        var sendData = {
            time: 3
        };

        $.ajax({
                url: 'http://wiki.xyzphp.com/t.php',
                type: 'POST',
                data: sendData,
                beforeSend: function () {
                    // lnv.pageloading();
                    lnv.iconloading('#submit_btn');
                }
            })
            .done(function (res) {

                res = typeof(res) === 'string' ? JSON.parse(res) : res;

                if (res.status == 200) {

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

                        // do something

                    }

                }
                else {

                    alert('error');

                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {

                alert('error');

            })
            .always(function () {

                // lnv.destroyloading();
                lnv.destroyloading('#submit_btn');

                me.removeClass('disabled');

            });
    };


    var bindEvent = function () {

        $('#submit_btn').on('tap', submit);

    };

    var init = function () {

        bindEvent();

    };

    return {
        init: init
    };


})();

/**
 *
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
 * 　　　　┃　　　┃    神兽保佑,代码无bug
 * 　　　　┃　　　┃
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　 ┣┓
 * 　　　　┃　　　　 ┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 *
 */
