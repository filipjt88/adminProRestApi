<?php
// Database
require_once "../config/db.php";

$method = $_SERVER["REQUEST_METHOD"];

// All methods
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
        break;

    case "POST":
       $data = json_decode(file_get_contents("php://input"), true);
       $stmt = $pdo->prepare("INSERT INTO users (name, username, email, city, website) VALUES (?,?,?,?,?)");
       $stmt->execute([$data['name'], $data['username'], $data['email'], $data['city'], $data['website']]);
       echo json_encode(['message' => "User added!"]);
       break; 

    case "PUT":
        $data = json_decode(file_get_contents("php://input"),true);
        $stmt = $pdo->prepare("UPDATE users SET name=?, username=?, email=?, city=?, website=? WHERE id = ?");
        $stmt->execute([$data['name'], $data['username'], $data['email'], $data['city'], $data['website'], $data['id']]);
        echo json_encode(['message' => "User updated"]);
        break;
    
    case "DELETE": 
        $data = json_decode(file_get_contents("php://input"),true);
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(['message' => "User deleted"]);
        break;
    
    default:
        echo json_encode(['message' => "Not a good request!"]);
        break;
}

?>