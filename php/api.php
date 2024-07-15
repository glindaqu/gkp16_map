<?php

require_once "database.php";

class API
{

    private const IP = "localhost";
    private const USER = "root";
    private const PASSWORD = "";
    private const DATABASE = "leafletmap";

    public const SERVER_IP = "leafletmap:81";

    private static function InitializeDB(): Database
    {
        return new Database(self::IP, self::USER, self::PASSWORD, self::DATABASE);
    }

    public static function DumpJSON(): void
    {
        $db = self::InitializeDB();
        $json = $db->query("SELECT * FROM addresses ORDER BY MedicalDivision;");
        echo file_put_contents("addresses_dump.json", json_encode($json));
        self::DownloadFile("addresses_dump.json");
    }

    public static function GetHousesCountByMD($md): int
    {
        return self::InitializeDB()->query("SELECT COUNT(*) FROM addresses WHERE medicalDivision = " . $md)[0]["COUNT(*)"];
    }

    public static function UpdateRowById($row, $id)
    {
        self::InitializeDB()->query(
            "UPDATE addresses SET 
            Street = '{$row['Street']}',
            Prefix = '{$row['Prefix']}',
            HouseNumber = '{$row['HouseNumber']}',
            MedicalDivision = {$row['MedicalDivision']},
            Region = {$row['Region']},
            FlatCount = {$row['FlatCount']},
            Latitude = {$row['Latitude']},
            Longitude = {$row['Longitude']}
            WHERE id = $id"
        );
    }

    public static function GetRowById($id): array
    {
        return self::InitializeDB()->query("SELECT * FROM addresses WHERE id=$id LIMIT 1")[0];
    }

    public static function CheckUser($login, $password): bool
    {
        $db = self::InitializeDB();
        return count($db->query("SELECT * FROM users WHERE login = '$login' AND password = '$password';"));
    }

    /**
     * Summary of GetAllAdresses
     * @param mixed $filters
     * @return array
     * 
     * ad - address [desc or '' (null-string)]
     */
    public static function GetAllAdresses($filters = null): array
    {
        $db = self::InitializeDB();
        if ($filters == null)
            return $db->query("SELECT * FROM addresses ORDER BY MedicalDivision;");
        return $db->query("SELECT * FROM addresses ORDER BY Street ".$filters['ad'].";");
    }

    public static function InsertAddressesFromJson(): void
    {
        if (!file_exists("../../data/withCoords.json"))
            die("file not found");

        $db = self::InitializeDB();
        $query = "INSERT INTO addresses( Street, Prefix,  MedicalDivision ,  Region ,  HouseNumber ,  FlatCount ,  Longitude , Latitude ) VALUES ";
        foreach (json_decode(file_get_contents("http://" . self::SERVER_IP . "/data/withCoords.json"), true) as $value) {
            $street = $value["Street"];
            $prefix = $value["Prefix"];
            $md  = $value["MedicalDivision"];
            $reg = $value["Region"];
            $hn = $value["HouseNumber"];
            $fc = $value["FlatCount"];
            $lng = $value["Longitude"];
            $lat = $value["Latitude"];
            $query .= "('$street', '$prefix', $md, $reg, '$hn', $fc, $lng, $lat),";
        }
        $db->query(substr($query, 0, -1));
    }

    public static function CreateTableStruct(): void
    {
        $db = self::InitializeDB();
        $db->makeTable();
        self::InsertAddressesFromJson();
    }

    private static function DownloadFile($file): void
    {
        if (!file_exists($file)) {
            die('file not found');
        } else {
            header("Cache-Control: public");
            header("Content-Description: File Transfer");
            header("Content-Disposition: attachment; filename=$file");
            header("Content-Type: application/json");
            header("Content-Transfer-Encoding: binary");
            while (ob_get_level())
                ob_end_clean();
            readfile($file);
        }
    }
}