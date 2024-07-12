<?php

class StringUtils {
    static function GetValueLengthByKey($arr, $key = 'Street') {
        return strlen($arr['Street']." ".$arr['Prefix']." "." ".$arr['HouseNumber']);
    }
}