<?php
// Ctrl+k1 收缩代码为1级

/* foreach 陷阱 */
{
    $arr = array('a', 'b', 'c');
    foreach ($arr as &$v) {
    }
    foreach ($arr as $v) {
        echo $v;
    }
    /*
    结果为abb
    解决方法: 
    ① 第二次foreach循环，别用$v了
    ② 第二次foreach循环之前，unset($v)
    $v的引用在 foreach 循环之后仍会保留。建议使用unset()将其销毁
    ③ 第二次循环也用&
     */
}

/* 接受PUT DELETE等请求参数 */
{
    // x-www-form-urlencoded的方式发送, 不是form-data的方式
    parse_str(file_get_contents('php://input'), $arr);
    var_dump($arr);
}

/* 彻底防止SQL注入 */
{
    /*
    使用PDO预处理的方式操作数据库

    预处理语句可以带来两大好处：

    * 提高运行效率
    * 防止SQL注入

    使用方法:

    1. 设置属性PDO::ATTR_EMULATE_PREPARES为false(默认为true)
    2. PHP5.3.6以上将设置字符集写在dsn中(`new PDO('mysql:host=127.0.0.1;dbname=test;charset=utf8', 'root', 'root');`)
    3. 同样需要执行`set names utf8`

    > 参考 http://zhangxugg-163-com.iteye.com/blog/1835721
    */
}

/* 关于PHP短标记<?= */
{
    // > http://php.net/manual/en/language.basic-syntax.phptags.php
    // 自 PHP 5.4.0 起，短格式的 echo 标记 <?= 总会被识别并且合法，而不管 short_open_tag 的设置是什么。
}

/* 通过table>tr>th|td 下载Excel格式的文件 */
{
    header("Content-Disposition:filename=filename.xls");
    header("Content-type:application/vnd.ms-excel");
    // 输出table
}

/* array_column() 的第二个参数的数据类型也要对应, 如下就是错误的 */
{
    $arr = [[1 => 'a'], [1 => 'b'], [1 => 'c']];
    var_dump(array_column($arr, '1'));
}

/* 当在第二页搜索的时候, 结果不足2页就会显示空, */
{
    // 解决:判断点击了搜索按钮就把页码置为1, 判断是否是点击了搜索按钮: isset($_GET['submit'])
}

/* 批量编辑多条数据时的 数据分类技巧 (数字为id) */
{
    $a = [1, 2, 3];// 原始数据(id)
    $b = [1, 3, 4];// 改变后的数据

    // 分别计算出新增的, 更新的和删除的

    // 应该新增的
    var_dump(array_diff($b, $a));// 4

    // 应该更新的
    var_dump(array_intersect($b, $a));// 1,3

    // 应该删除的
    var_dump(array_diff($a, $b));// 2
}
