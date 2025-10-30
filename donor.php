<?php
header("Content-Type: application/json");

$file = __DIR__ . "/bloodlink_data.json"; // rename to your JSON filename

// Load existing data
if (file_exists($file)) {
    $data = json_decode(file_get_contents($file), true);
} else {
    $data = ["donors" => [], "patients" => []];
}

// Gather input
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

// Prepare donor data
$newDonor = [
    "name"       => $name,
    "phone"      => $phone,
    "email"      => $email,
    "blood_type" => strtoupper($bloodType),
    "location"   => $location,
    "lat"        => $lat,
    "lng"        => $lng,
    "radius"     => $radius,
    "time"       => date("Y-m-d H:i:s")
];

// Append donor to the "donors" array
$data["donors"][] = $newDonor;

// Save back to file
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

echo json_encode(["status" => "success", "message" => "Donor registered successfully."]);
?>
