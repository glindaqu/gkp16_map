<?php

require_once "database.php";

class API {

    private const IP = "localhost";
    private const USER = "root";
    private const PASSWORD = "";
    private const DATABASE = "leafletmap";

    public static function DumpJSON(): void {
        $db = new Database(self::IP, self::USER, self::PASSWORD, self::DATABASE);
        $json = $db->query("SELECT * FROM addresses;");
        file_put_contents("addresses_dump.json", $json);
        self::DownloadFile("addresses_dump.json");
    }

    public static function CheckUser($login, $password): bool {
        $db = new Database(self::IP, self::USER, self::PASSWORD, self::DATABASE);
        return count($db->query("SELECT * FROM users WHERE login = '$login' AND password = '$password';"));
    }

    public function GetAllAdresses(): array {

    }

    private static function DownloadFile($file): void {
        if (!file_exists($file)) { 
            die('file not found');
        } else {
            header("Cache-Control: public");
            header("Content-Description: File Transfer");
            header("Content-Disposition: attachment; filename=$file");
            header("Content-Type: application/json");
            header("Content-Transfer-Encoding: binary");
            while (ob_get_level()) ob_end_clean();
            readfile($file);
        }
    }
}