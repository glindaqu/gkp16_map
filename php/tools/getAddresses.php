<?php

require_once "../api.php";

print_r(json_encode(API::GetAllAdresses(), true));