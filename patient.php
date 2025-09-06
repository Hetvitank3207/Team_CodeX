<?php
header("Content-Type: application/json");

$file = __DIR__ . "/donors.json";
$data = json_decode(file_get_contents($file), true) ?? [];

$bloodType = $_POST['blood_type'] ?? '';
$location  = $_POST['location'] ?? '';
$lat       = $_POST['lat'] ?? '';
$lng       = $_POST['lng'] ?? '';
$radius    = $_POST['radius'] ?? '';

if (!$bloodType || !$location || !$lat || !$lng || !$radius) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields required.",
        "matches" => []
    ]);
    exit;
}

// Haversine formula
function getDistance($lat1, $lon1, $lat2, $lon2) {
    $R = 6371; // km
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);
    $a = sin($dLat/2) * sin($dLat/2) +
         cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
         sin($dLon/2) * sin($dLon/2);
    $c = 2 * atan2(sqrt($a), sqrt(1-$a));
    return $R * $c;
}

$matches = [];
foreach ($data as $donor) {
    // ✅ Case-insensitive blood type match
    if (strcasecmp($donor['blood_type'], $bloodType) === 0) {
        $distance = getDistance($lat, $lng, $donor['latitude'], $donor['longitude']);
        
        // ✅ Only check patient's radius, ignore donor radius
        if ($distance <= $radius) {
            $matches[] = [
                "name"      => $donor['name'],
                "phone"     => $donor['phone'],
                "email"     => $donor['email'],
                "bloodType" => $donor['blood_type'],
                "location"  => $donor['location'],
                "distance"  => round($distance, 2)
            ];
        }
    }
}

echo json_encode(["status" => "success", "matches" => $matches]);
?>
