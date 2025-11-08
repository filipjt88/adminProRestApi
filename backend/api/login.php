<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"),true);

$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if(empty($username) || empty($password)) {
    echo json_encode(['success' => false, "message" => "Nedostaju vam podaci!"]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
$stmt->execute([$username]);
$admin = $stmt->fetch(PDO::FETCH_ASSOC);

if($admin && password_verify($password, $admin["password"])) {
    session_start();
    $_SESSION["admin"] = $admin["username"];
    echo json_encode(["success" => true, "message" => "Uspesno ste se logovali!"]);
} else {
    echo json_encode(["success" => false, "message" => "Neispravan username ili password!"]);
}

?>