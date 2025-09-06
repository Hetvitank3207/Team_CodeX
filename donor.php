<?php
header("Content-Type: application/json");

$file = __DIR__ . "/donors.txt";
if (!file_exists($file)) {
    file_put_contents($file, json_encode([], JSON_PRETTY_PRINT));
}

$name      = trim($_POST['name'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$email     = trim($_POST['email'] ?? '');
$bloodType = $_POST['blood_type'] ?? '';
$location  = trim($_POST['location'] ?? '');
$lat       = $_POST['lat'] ?? '';
$lng       = $_POST['lng'] ?? '';
$radius    = $_POST['radius'] ?? '';

if (!$name || !$phone || !$email || !$bloodType || !$location || !$radius) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

// Reject invalid blood type selection from frontend dropdown
if ($bloodType === "" || strtolower($bloodType) === "select type") {
    echo json_encode(["status" => "error", "message" => "Please select a valid blood type."]);
    exit;
}

// Validate latitude and longitude as float or null
$latitude = (is_numeric($lat)) ? floatval($lat) : null;
$longitude = (is_numeric($lng)) ? floatval($lng) : null;

// Prepare donor record
$donor = [
    "id"         => uniqid(),
    "name"       => $name,
    "phone"      => $phone,
    "email"      => $email,
    "blood_type" => strtoupper($bloodType),
    "location"   => $location,
    "latitude"   => $latitude,
    "longitude"  => $longitude,
    "created_at" => date("Y-m-d H:i:s")
];

// Append donor record as JSON-encoded line to file
file_put_contents($file, json_encode($donor) . PHP_EOL, FILE_APPEND);

echo json_encode(["status" => "success", "message" => "Donor registered successfully."]);
?>
