<?php
require_once "../config/db.php";

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET": 
        if(!empty($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } else {
            $stmt = $pdo->query("SELECT * FROM users");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    case "POST":
       $data = json_decode(file_get_contents("php://input"), true);
       $stmt = $pdo->prepare("INSERT INTO users (name, username, email, city, website) VALUES (?,?,?,?,?)");
       $stmt->execute([$data['name'], $data['username'], $data['email'], $data['city'], $data['city'], $data['website']]);
       echo json_encode(['message' => "User added!"]);
       break; 
}