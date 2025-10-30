<?php
header("Content-Type: application/json");

$file = __DIR__ . "/bloodlink_data.json"; // same file

// Load JSON data
if (file_exists($file)) {
    $data = json_decode(file_get_contents($file), true);
} else {
    $data = ["donors" => [], "patients" => []];
}

// Collect input
$bloodType = strtoupper($_POST['blood_type'] ?? '');
$location  = trim($_POST['location'] ?? '');
$lat       = floatval($_POST['lat'] ?? 0);
$lng       = floatval($_POST['lng'] ?? 0);
$radius    = floatval($_POST['radius'] ?? 0);

if (!$bloodType || !$location || !$radius) {
    echo json_encode(["status" => "error", "message" => "All fields are required.", "matches" => []]);
    exit;
}

// Save patient request
$newPatient = [
    "blood_type" => $bloodType,
    "location"   => $location,
    "lat"        => $lat,
    "lng"        => $lng,
    "radius"     => $radius,
    "time"       => date("Y-m-d H:i:s")
];
$data["patients"][] = $newPatient;
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

// Haversine distance helper
function getDistance($lat1, $lon1, $lat2, $lon2) {
    $R = 6371;
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);
    $a = sin($dLat/2) * sin($dLat/2) +
         cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
         sin($dLon/2) * sin($dLon/2);
    $c = 2 * atan2(sqrt($a), sqrt(1-$a));
    return $R * $c;
}

// Find matching donors
$matches = [];
foreach ($data["donors"] as $donor) {
    if (strtoupper($donor["blood_type"]) !== $bloodType) continue;

    $matched = false;
    $distanceInfo = null;

    if (is_numeric($lat) && is_numeric($lng) && is_numeric($donor["lat"]) && is_numeric($donor["lng"])) {
        $distance = getDistance($lat, $lng, floatval($donor["lat"]), floatval($donor["lng"]));
        if ($distance <= $radius) {
            $matched = true;
            $distanceInfo = round($distance, 2) . " km";
        }
    } else {
        // fallback: text match on location
        if (stripos($donor["location"], $location) !== false || stripos($location, $donor["location"]) !== false) {
            $matched = true;
        }
    }

    if ($matched) {
        $matches[] = [
            "name"      => $donor["name"],
            "phone"     => $donor["phone"],
            "email"     => $donor["email"],
            "bloodType" => $donor["blood_type"],
            "location"  => $donor["location"],
            "distance"  => $distanceInfo
        ];
    }
}

echo json_encode(["status" => "success", "matches" => $matches]);
?>
