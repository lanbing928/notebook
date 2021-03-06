/**
 * 函数节流
 * @param  {callBack} fun      callBack
 * @param  {Number} delay    延迟执行时间
 * @param  {Number} duration 固定多少时间必须执行一次
 * @return {callBack}
 */
function throttle(fun, delay, duration) {
    var timer,
        startTime = new Date();
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
        clearTimeout(timer);
        if (curTime - startTime >= duration) {
            fun.apply(context, args);
            startTime = curTime;
        } else {
            timer = setTimeout(fun, delay);
        }
    };
}

/**
 * 加载图片
 * @param  {string}   url      图片url
 * @param  {Function} callback callBack
 */
function loadImage(url, callback) {
    var img = new Image(); //创建一个Image对象，实现图片的预下载
    img.src = url;

    if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img);
        return; // 直接返回，不用再处理onload事件
    }
    img.onload = function () { //图片下载完毕时异步调用callback函数。
        callback.call(img);//将回调函数的this替换为Image对象
    }
}

/**
 * 去除字符串首尾处的空白字符
 * @param  {string} str 字符串
 * @return {string}
 */
function trim(str){
    return typeof(str) == "string" ? str.replace(/^\s*|\s*$/g, "") : str;
}

/**
 * cookie工具
 * @param  {string} name    键
 * @param  {string} value   值
 * @param  {object} options 选项 {expires: "", domain: "", path: ""}
 * @return {string}         获取cookie返回值 | 设置不返回
 */
function cookie(name, value, options) {
    if (typeof value === "undefined") {
        var n, v,
            cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            // 依赖trim函数
            n = trim(cookies[i].substr(0, cookies[i].indexOf("=")));
            v = cookies[i].substr(cookies[i].indexOf("=") + 1);
            if (n === name){
                return unescape(v);
            }
        }
    } else {
        options = options || {};
        if (!value) {
            value = "";
            options.expires = -365;
        } else {
            value = escape(value);
        }
        if (options.expires) {
            var d = new Date();
            d.setDate(d.getDate() + options.expires);
            value += "; expires=" + d.toUTCString();
        }
        if (options.domain) {
            value += "; domain=" + options.domain;
        }
        if (options.path) {
            value += "; path=" + options.path;
        }
        document.cookie = name + "=" + value;
    }
}

/**
 * 检查元素是否位于当前视窗
 * (可用于lazyload, infinite scroll等常见功能)
 * @param  {object}  el 元素对象
 * @return {Boolean}
 */
function isInViewport(el) {
    var rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document. documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document. documentElement.clientHeight);
}

/**
 * 用HTML条件注释来判断IE
 * @return {Boolean} 符合条件的返回true
 */
function isIE() {
    var b = document.createElement('b');
    b.innerHTML = '<!--[if IE]><i></i><![endif]-->';
    return b.getElementsByTagName('i').length === 1;
}

/**
 * 下载文件
 * @param { string} url url
 */
function downloadFile(url) {
    var downloadBox = document.createElement("iframe");
    downloadBox.src = url;
    downloadBox.style.display = "none";
    document.body.appendChild(downloadBox);
}

/**
1             => number
'1'           => string
[]            => array
{}            => object
window        => window
document      => document
location      => location
null          => null
NaN           => nan
document.body => element
 * 判断数据类型
 * @param obj {*} 任何数据
 * @returns {string}
 */
function getType(obj) {
    var udf = 'undefined';
    if (typeof obj === udf) {
        return udf;
    } else if (typeof window !== udf && obj === window) {
        return 'window';
    } else if (typeof global !== udf && obj === global) {
        return 'global';
    } else if (typeof document !== udf && obj === document) {
        return 'document';
    } else if (obj === null) {
        return 'null';
    }
    var ret = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    if (isNaN(obj) && ret === 'number') {
        return 'nan';
    } else if (/element/.test(ret)) {
        return 'element';
    }
    return ret;
}

/**
 * 金钱格式化
 */
function numberFormat(s) {
    s = s.toString();
    if (/[^0-9\.]/.test(s)) return "0";
    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
    s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    return s.replace(/^\./, "0.")
}

/**
 * iframe自适应高度
 * @param  {string} id iframeid
 */
function changeFrameHeight(id) {
    var ifm = document.getElementById(id);
    ifm.height = document.documentElement.clientHeight;
}

/**
 * 特殊字符转换为HTML实体 
 * @param  {string} str 编码前的字符串
 * @return {string}     编码后的字符串
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * 获取光标的位置
 * @param  {Object} el 输入框元素
 * @return {Number}    返回的位置
 */
function getSelectionIndex(el) {
    if (el.selectionStart === undefined) {// ie8-
        el.focus();
        var range = document.selection.createRange();
        range.moveStart("character", -el.value.length);
        return range.text.length;
    }
    return el.selectionStart;
}

/**
 * 设置光标的位置
 * @param  {Object} el 输入框元素
 * @param {Number} index 设置的位置
 */
function setSelectionIndex(el, index) {
    if (el.selectionStart === undefined) {// ie8-
        var range = el.createTextRange();
        range.move("character", index);
        range.select();
    } else {
        el.selectionStart = index;
        el.selectionEnd = index;
    }
    el.focus();
}

/**
 * 前台调试用
 */
function v() {
    var debug = false;
    var collapsed = false;
    if (!debug) return;
    if (collapsed) {
        console.groupCollapsed(arguments[0]);
    } else {
        console.group(arguments[0]);
    }
    for (var i in arguments) {
        if(i == 0) continue;
        console.log(arguments[i]);
    }
    console.groupEnd();
}


/*************************************************/

function getClass(classname, obj) {
    var obj = obj || document;
    var arr = [];
    if (obj.getElementsByClassName) {
        return obj.getElementsByClassName(classname)
    } else {
        var alls = obj.getElementsByTagName("*");
        for (var i = 0; i < alls.length; i++) {
            if (checkclass(alls[i].className, classname)) {
                arr.push(alls[i])
            }
        }
        return arr;
    }
}

function checkclass(startclass, endclass) {
    var arr = startclass.split(" ");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == endclass) {
            return true;
        }
    }
    return false;
}

function getText(obj, val) {
    if (document.all) {
        if (val) {
            obj.innerText = val;
        } else {
            return obj.innerText;
        }
    } else {
        if (val) {
            obj.textContent = val;
        } else {
            return obj.textContent;
        }
    }
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, null)[attr];
    }
}

function getChilds(obj) {
    var childs = obj.childNodes;
    var arr = [];
    for (var i = 0; i < childs.length; i++) {
        if (childs[i].nodeType == 3) {
            continue;
        } else {
            arr.push(childs[i])
        }
    }
    return arr;
}

function getFirst(obj) {
    var first = obj.firstChild;
    if (first == null) {
        return false;
    }
    while (first.nodeType == 3) {
        first = first.nextSibling;
        if (first == null) {
            return false;
        }
    }
    return first;
}

function getLast(obj) {
    var last = obj.lastChild;
    if (last == null) {
        return false;
    }
    while (last.nodeType == 3) {
        last = last.previousSibling;
        if (last == null) {
            return false;
        }
    }
    return last;
}

function getNext(obj) {
    var next = obj.nextSibling;
    if (next == null) {
        return false;
    }
    while (next.nodeType == 3) {
        next = next.nextSibling;
        if (next == null) {
            return false;
        }
    }
    return next;
}

function getUp(obj) {
    var up = obj.previousSibling;
    if (up == null) {
        return false;
    }
    while (up.nodeType == 3) {
        up = up.previousSibling;
        if (up == null) {
            return false;
        }
    }
    return up;
}

function insertAfter(parent, obj, newobj) {
    if (!getNext(obj)) {
        parent.appendChild(newobj)
    } else {
        var nexts = getNext(obj);
        parent.insertBefore(newobj, nexts);
    }
}

function addEvent(obj, ev, fn) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + ev, function() {
            fn.call(obj);
        });
    } else {
        obj.addEventListener(ev, fn, false);
    }
}

function mouseScroll(obj, upfn, downfn) {
    if (obj.attachEvent) {
        obj.attachEvent("onmousewheel", scrollFn); //IE?? opera
    } else if (obj.addEventListener) {
        obj.addEventListener("mousewheel", scrollFn, false); //chrome,safari
        obj.addEventListener("DOMMouseScroll", scrollFn, false); //firefox
    }

    function scrollFn(e) {
        var ev = e || window.event;
        var num = ev.detail || ev.wheelDelta;
        if (num == 120 || num == -3) {
            if (upfn) {
                upfn.call(obj)
            }
        } else if (num == -120 || num == 3) {
            if (downfn) {
                downfn.call(obj)
            }

        }
        if (ev.preventDefault) ev.preventDefault();
        else ev.returnValue = false;
    }
}

function delEvent(obj, ev, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(ev, fn, false)
    } else {
        obj.detachEvent("on" + ev, fn)
    }
}

function contains(parent, child) {
    if (parent.contains) {
        return parent.contains(child) && parent != child;
    } else {
        return (parent.compareDocumentPosition(child) === 20);
    }
}

function checkHover(e, target) {
    if (getEvent(e).type == "mouseover") {
        return !contains(target, getEvent(e).relatedTarget || getEvent(e).fromElement) && !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target)
    } else {
        return !contains(target, getEvent(e).relatedTarget || getEvent(e).toElement) && !((getEvent(e).relatedTarget || getEvent(e).toElement) === target)
    }
}

function getEvent(e) {
    return e || window.event;
}

function hover(obj, overfun, outfun) {
    if (overfun) {
        obj.onmouseover = function(e) {
            if (checkHover(e, obj)) {
                overfun.call(obj);
            }
        }
    }
    if (outfun) {
        obj.onmouseout = function(e) {
            if (checkHover(e, obj)) {
                outfun.call(obj);
            }
        }
    }
}
