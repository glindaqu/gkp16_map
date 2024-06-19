<?php

class StringUtils {
    static function GetValueLengthByKey($arr, $key = 'name') {
        return strlen($arr[$key]);
    }
}