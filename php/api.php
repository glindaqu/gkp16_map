<?php

require_once "database.php";

class API {

    private const IP = "localhost";
    private const USER = "root";
    private const PASSWORD = "";
    private const DATABASE = "leafletmap";

    private static function InitializeDB(): Database {
        return new Database(self::IP, self::USER, self::PASSWORD, self::DATABASE);
    }

    public static function DumpJSON(): void {
        $db = self::InitializeDB();
        $json = $db->query("SELECT * FROM addresses;");
        file_put_contents("addresses_dump.json", json_encode($json));
        self::DownloadFile("addresses_dump.json");
    }

    public static function UpdateRowById($row, $id) {
        self::InitializeDB()->query("UPDATE addresses SET 
            actualName = '{$row['actualName']}',
            medicalDivision = {$row['medicalDivision']},
            peopleCount = {$row['peopleCount']},
            latitude = {$row['latitude']},
            longitude = {$row['longitude']}
            WHERE id = $id"
        );
    }

    public static function GetRowById($id): array {
        return self::InitializeDB()->query("SELECT * FROM addresses WHERE id=$id LIMIT 1")[0];
    }

    public static function CheckUser($login, $password): bool {
        $db = self::InitializeDB();
        return count($db->query("SELECT * FROM users WHERE login = '$login' AND password = '$password';"));
    }

    public static function GetAllAdresses(): array {
        $db = self::InitializeDB();
        return $db->query("SELECT * FROM addresses;");
    }

    public static function InsertAddressesFromJson(): void {
        if (!file_exists("../data/withCoords.json")) return;
        $db = self::InitializeDB();
        $query = "INSERT INTO addresses(actualName, medicalDivision, longitude, latitude, peopleCount) VALUES ";
        foreach (json_decode(file_get_contents("../data/withCoords.json"), true) as $key=>$value) {
            $name = trim($value['name']);
            $md = explode(' ', trim($value['medDivision']))[0];
            $lon = explode(' ', $value['position'])[1];
            $lan = explode(' ', $value['position'])[0];
            $pc = $value['peopleCount'];
            $query .= "('$name', $md, $lon, $lan, $pc),";
        }
        $db->query(substr($query, 0, -1));
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