/*
 * @Author: kevin-miaodaf
 * @Date:   2016-05-30 11:16:16
 * @Last Modified by:   kevin
 * @Last Modified time: 2016-09-04 01:04:04
 */

'use strict';

var lnv = lnv || {};

var lnv = (function() {

    /**
     * 检查手机号码是否有效
     * @param  {string} userphone 手机号码
     * @return {boolean}        有效就返回true
     */
    function checkPhone(userphone) {
        var myreg = /^(1+\d{10})$/;
        if (myreg.test(userphone)) {
            return true;
        }
        return false;
    }

    /**
     * 获取网址参数
     * @param {string} name 网址
     * @return {null | string} 没有结果返回null,有结果返回字符串
     */
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    return {
        checkPhone: checkPhone,
        getQueryString: getQueryString
    }

})();
