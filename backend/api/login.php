<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../config/db.php";

// Requset
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Server method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

$input = file_get_contents("php://input");
$data  = json_decode($input, true);

// Data validation check
if (!$data || !isset($data["username"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "message" => "Incorrect data format"]);
    exit;
}

$username = trim($data["username"]);
$password = trim($data["password"]);

// Hardcoded admin account
$adminUsername = "admin";
$adminPassword = "1234";

if ($username === $adminUsername && $password === $adminPassword) {
    echo json_encode(["success" => true, "message" => "Success login"]);
    exit;
} else {
    echo json_encode(["success" => false, "message" => "Defective username or password"]);
    exit;
}
