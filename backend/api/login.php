<?php
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"),true);

$username = $data = ['username'] ?? '';
$password = $data = ['password'] ?? '';

if($username === "admin" && $password === "admin123") {
    echo json_encode([
        "success" => true,
        "token" => "fake-jwt-token-123"
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Neispravan username ili password"
    ]);
}

?>