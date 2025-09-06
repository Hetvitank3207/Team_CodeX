<?php
header("Content-Type: application/json");

$file = __DIR__ . "/donors.json";

$data = json_decode(file_get_contents($file), true) ?? [];

$name      = $_POST['name'] ?? '';
$phone     = $_POST['phone'] ?? '';
$email     = $_POST['email'] ?? '';
$bloodType = $_POST['blood_type'] ?? '';
$location  = $_POST['location'] ?? '';
$lat       = $_POST['lat'] ?? '';
$lng       = $_POST['lng'] ?? '';
$radius    = $_POST['radius'] ?? '';

if (!$name || !$phone || !$email || !$bloodType || !$location || !$lat || !$lng || !$radius) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

$newDonor = [
    "id"        => uniqid(),
    "name"      => $name,
    "phone"     => $phone,
    "email"     => $email,
    "blood_type"=> $bloodType,
    "location"  => $location,
    "latitude"  => (float)$lat,
    "longitude" => (float)$lng,
    "radius"    => (int)$radius,
    "created_at"=> date("Y-m-d H:i:s")
];

$data[] = $newDonor;

if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(["status" => "success", "message" => "Donor registered successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to save donor."]);
}
?>
