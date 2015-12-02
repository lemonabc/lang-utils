/**
 * 封装常用的方法。如类型判断、类的集成
 */
"use strict";
var HASOWN = Object.prototype.hasOwnProperty,
    guid = (new Date()).getTime(),
    ObjectCreate = Object.create,
    _apply = function(p, r, s, ov) {
        if (ov || !(p in r)) {
            r[p] = s[p];
        }
    };

class Mutil {
    /**
     * 过滤数组
     *
     * @method arr_filter
     * @return {Array} 返回过滤后的数组
     *
     * todo es5已实现，替换array.filter(callback,[ thisObject]);
     * 
     * 
     */
    static arrFilter(arr, fun, ctx) {
        if (arr == null) {
            throw new TypeError();
        }

        if (typeof fun != "function") {
            throw new TypeError();
        }

        var res = [];
        arr.forEach(function(val, idx) {
            if (fun.call(ctx, val, idx)) {
                res.push(val);
            }
        });
        return res;
    }
    static toArray(object) {
        if(!object.length){
            return object
        }
        return Array.prototype.slice.call(object);
    }
    /**
     * 判断值是否在数组中
     * @param  {Anything} item 值
     * @param  {Array}    arr  数组
     * @return {Boolean}       真为在数组
     */
    static inArray(item, arr) {
        if (!arr) return;
        if(arr.indexOf(item)<0){
            return false;
        }
        return true;
    }
    /**
     * 数组去重复
     * @param  {Array} a 数组
     * @return {Array}   去重之后的数组
     */
    static dequeueArray(a) {
        var hash = {},
            results = [],
            i,
            item,
            len,
            hasOwn = HASOWN;

        for (i = 0, len = a.length; i < len; ++i) {
            item = a[i];
            if (!hasOwn.call(hash, item)) {
                hash[item] = 1;
                results.push(item);
            }
        }
        return results;
    }
    /**
     * 混淆两个对象
     *
     * @method mix
     * @param {Object} targetObject 目标对象，新的属性将被覆盖到这个对象
     * @param {Object} sourceObject 来源对象，该对象的属性和方法将覆盖到目标对象
     * @param {Boolean} [isOverride=false] 是否覆盖目标对象已有的原属性和方法
     * @param {Array} [whiteList=[]] 白名单，该名单中的属性和方法不会合并到目标对象
     */
    static mix(r, s, ov, wl) {
        if (!s || !r) return r;
        if (ov === undefined) ov = true;
        var i = 0,
            p, len;

        if (wl && (len = wl.length)) {
            for (; i < len; i++) {
                p = wl[i];
                if (p in s) {
                    _apply(p, r, s, ov);
                }
            }
        } else {
            for (p in s) {
                _apply(p, r, s, ov);
            }
        }
        return r;
    }
    /**
     * 将对象合并到一个新的对象上,并返回
     * @method merge
     * @param {object} name*  要合并的对象
     * @return {object} 返回merge后的新对象
     */
    static merge() {
        var a = arguments,
            o = {},
            i, l = a.length;

        for (i = 0; i < l; i = i + 1) {
            a[i] = (typeof a[i] === 'object') ? a[i] : {};
            this.mix(o, a[i], true);
        }

        return o;
    }
    /**
     * 判断参数是否是function
     * @method isFunction
     * @param {Object} obj 要判断的对象
     * @return {Boolean} 参数是方法，则返回True
     */
    static isFunction(o) {
        return typeof o === 'function';
    }
    /**
     * 判断参数是否是未定义
     * @method isUndefined
     * @param {Object} obj 要判断的对象
     * @return {Boolean} 如果参数未定义，则返回True
     */
    static isUndefined(o) {
        return typeof o === 'undefined';
    }
    /**
     * 判断参数是否是数字
     * @method isNumber
     * @param {Object} obj 要判断的对象
     * @return {Boolean} 参数是数字，则返回True
     */
    static isNumber(o) {
        return typeof o === 'number' && isFinite(o);
    }
    /**
     * 判断参数是否是null对象
     * @method isNull
     * @param {Object} obj 要判断的对象
     * @return {Boolean} 参数是null，则返回True
     */
    static isNull(o) {
        return o === null;
    }
    /**
     * 判断参数是否是字符串
     * @method isString
     * @param {Object} obj 要判断的对象
     * @return {Boolean} 参数是字符串，则返回True
     */
    static isString(o) {
        return typeof o === 'string';
    }
    /**
     * 判断参数是否是对象
     * @method isObject
     * @param {Object} obj 要判断的对象
     * @return {Boolean} 参数是对象，则返回True
     */
    static isBoolean(o) {
        return typeof o === 'boolean';
    }
    static isObject(o, failfn) {
        var t = typeof o;
        return o && (t === 'object' || this.isFunction(o));
    }
    /**
     * 判断参数是否是空对象
     * @method isEmptyObject
     * @param {Object} obj 要判断的对象
     * @return {Boolean} 参数是对象，则返回True
     */
    static isEmptyObject(o) {
        for (var p in o) {
            return false;
        }
        return true;
    }
    /**
     * 已字符串形式为对象赋值
     * @param {Obejct} o    要修改的对象
     * @param {String} path 对象路径
     * @param {Any} val  值
     */
    static setObjValue(o, path, val) {
        //{} a.b.c val
        var i,
            p = path.split('.'),
            leafIdx = p.length - 1,
            ref = o;

        if (p && leafIdx >= 0) {
            for (i = 0; ref != 'undefined' && i < leafIdx; i++) {
                ref[p[i]] = ref[p[i]] || {};
                ref = ref[p[i]];
            }
            if (ref) {
                ref[p[i]] = val;
            } else {
                return 'undefined';
            }
        }

        return o;
    }
    /**
     * 格式化时间
     
        require('pan-utils').util.format(new Date());//2014-04-01
        require('pan-utils').util.format(new Date(), 'yyyy-mm-dd HH:MM:SS');//2014-04-01 12:30:45
     
     * @method formatTime
     * @param  {Date} date 日期对象
     * @param  {String} [format='yyyy-mm-dd'] 格式
     * @return {String}   
     */
    static formatTime(date, format) {
        format = format || 'yyyy-mm-dd';
        return format.replace(/y+/i, date.getFullYear())
            .replace(/m+/, ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1))
            .replace(/d+/, (date.getDate() < 10 ? "0" : "") + date.getDate())
            .replace(/H+/, (date.getHours() < 10 ? "0" : "") + date.getHours())
            .replace(/M+/, (date.getMinutes() < 10 ? "0" : "") + date.getMinutes())
            .replace(/S+/, (date.getSeconds() < 10 ? "0" : "") + date.getSeconds());
    }
    /**
     * 读取对象深层的属性
     * @method  getObjValue
     * @param  {Object} targetObject    要读取的对象
     * @param  {String} path 属性路径
     * @return {Object} 如targetObject不是Object，返回undefined
     */
    static getObjValue(o, path) {
        if (!this.isObject(o)) {
            return undefined;
        }

        var i,
            p = path.split('.'),
            l = p.length;

        for (i = 0; o !== 'undefined' && i < l; i++) {
            o = o[p[i]];
            if(this.isUndefined(o)){
                return o;
            }
        }

        return o;
    }
    /**
     * 生成唯一标志
     * @method guid
     * @param {String} [pre=mutil_] 前缀
     * @return {String} 如 "mutil_10938737462"
     */
    static guid(pre) {
        return (pre || 'mo_') + (++guid);
    }
    /**
     * 获得对象的唯一标志。
     
     //code1:
     var obj = {}
     console.log(require('pan-utils').util.stamp(obj,false,'mid'));//output:motil_123456789
     //obj is {mid:'motil_123456789'} now

     //code2:
     var obj = {id:'1234567'}
     console.log(require('pan-utils').util.stamp(obj));//output:1234567

     //code3:
     var obj = {}
     console.log(require('pan-utils').util.stamp(obj), true);//output:null

     * @method stamp
     * @param {Object} obj
     * @param {Boolean} [readOnly=false]如果该对象没有唯一标志，且readOnly不为True，则为它打上唯一标志，并返回标志的值
     * @param {String} [id=id] 作为标志的属性，默认为“id"
     * @return {String}唯一标识符
     */
    static stamp(o, readOnly, id) {
        var id = id || 'id',
            uid;
        if (!o) return o;
        uid = o[id];
        if (!uid & !readOnly) {
            uid = this.guid();
            try {
                o[id || 'id'] = uid;
            } catch (e) {
                uid = null;
            }
        }
        return uid;
    }
    /**
     * html转译
     * 
     * @param  {String} string 原始html
     * @return {String}        转译后的字符串
     */
    static replaceHtml(string) {
        var HTML_CHARS = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;',
            '`': '&#x60;'
        };
        return (string + '').replace(/[&<>"'\/']/g, function(match) {
            return HTML_CHARS[match]
        });
    }
    /**
     * 获取本机IP地址
     * @return {[type]} [description]
     */
    static getLocalIp() {
        var os = require('os');
        var nes = os.networkInterfaces();
        var ips = [];
        for (var ne in nes) {
            ne = nes[ne]
            for (var i = 0; i < ne.length; i++) {
                if (/^(\d+\.){3}\d+$/.test(ne[i].address)) {
                    // if (ne[i].address != '127.0.0.1') {
                        ips.push(ne[i].address)
                    // }
                }
            }
        }
        return ips;
    }
}



module.exports = Mutil;