<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../config/db.php";


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Provera validnosti podataka
if (!$data || !isset($data["username"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "message" => "Pogrešan format podataka"]);
    exit;
}

$username = trim($data["username"]);
$password = trim($data["password"]);

// Hardkodovani admin nalozi
$adminUsername = "admin";
$adminPassword = "1234";

if ($username === $adminUsername && $password === $adminPassword) {
    echo json_encode(["success" => true, "message" => "Uspešan login"]);
    exit;
} else {
    echo json_encode(["success" => false, "message" => "Neispravan username ili password"]);
    exit;
}
