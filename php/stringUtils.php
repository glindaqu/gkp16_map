<?php

class StringUtils {
    static function GetValueLengthByKey($arr, $key = 'actualName') {
        return strlen($arr[$key]);
    }
}