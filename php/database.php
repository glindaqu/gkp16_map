<?php

class Database {

    private $ip = "";
    private $user = "";
    private $password = "";
    private $dbName = "";

    private $connection = null;

    public function __construct($ip, $user, $password, $dbName) {
        $this->ip = $ip;
        $this->user = $user;
        $this->password = $password;
        $this->dbName = $dbName;

        $this->createConnection();
    }

    public function __destruct() {
        $this->connection->close();
    }

    public function query($query): array {
        assert(!strstr(strtolower($query), "delete"));
        $res = [];
        $qr = $this->connection->query($query);
        if (strstr(strtolower($query), "insert") || strstr(strtolower($query), "update")) return [];
        while ($item = $qr->fetch_assoc()) $res[] = $item;
        return $res;
    }

    private function createConnection(): void {
        $this->connection = new mysqli($this->ip, $this->user, $this->password, $this->dbName);
    }

    private function makeTable(): void {
        assert($this->connection != null);
        assert(!$this->connection->query("DESCRIBE addresses;"));

        $this->connection-query(
            "CREATE TABLE addresses(
                id INT
                    PRIMARY KEY
                    NOT NULL
                    AUTO_INCREMENT,
                actualName VARCHAR(200)
                    NOT NULL
        	        DEFAULT \"undefined\"
        	        UNIQUE,
                peopleCount INT
                    NOT NULL,
                medicalDivision INT(1)
        	        NOT NULL,
                longitude FLOAT(12, 9)
        	        NOT NULL,
                latitude FLOAT(12, 9)
        	        NOT NULL
            );"
        );
    }
}