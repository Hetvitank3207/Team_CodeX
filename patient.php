<?php
header("Content-Type: application/json");

$file = __DIR__ . "/donors.txt";

$bloodType = $_POST['blood_type'] ?? '';
$location  = trim($_POST['location'] ?? '');
$lat       = $_POST['lat'] ?? '';
$lng       = $_POST['lng'] ?? '';
$radius    = $_POST['radius'] ?? '';

if (!$bloodType || !$location || !$radius) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required.",
        "matches" => []
    ]);
    exit;
}

// Normalize blood type input
$requestBloodType = strtoupper($bloodType);

// Calculate distance using Haversine formula
function getDistance($lat1, $lon1, $lat2, $lon2) {
    $R = 6371; // Radius of Earth in km
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);
    $a = sin($dLat/2) * sin($dLat/2) +
         cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
         sin($dLon/2) * sin($dLon/2);
    $c = 2 * atan2(sqrt($a), sqrt(1-$a));
    return $R * $c;
}

$matches = [];

if (file_exists($file)) {
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        $donor = json_decode($line, true);
        if (!$donor) continue;

        // Check exact blood type match
        if (strtoupper($donor['blood_type']) !== $requestBloodType) {
            continue;
        }

        $matched = false;
        $distanceInfo = null;

        // Use coordinates to calculate distance if available
        if (is_numeric($lat) && is_numeric($lng) &&
            isset($donor['latitude']) && isset($donor['longitude']) &&
            is_numeric($donor['latitude']) && is_numeric($donor['longitude'])) {

            $distance = getDistance(floatval($lat), floatval($lng), floatval($donor['latitude']), floatval($donor['longitude']));
            if ($distance <= floatval($radius)) {
                $matched = true;
                $distanceInfo = round($distance, 2) . " km";
            }
        } else {
            // No coordinates: fallback to flexible string match on location texts
            if (stripos($donor['location'], $location) !== false || stripos($location, $donor['location']) !== false) {
                $matched = true;
            }
        }

        if ($matched) {
            $matches[] = [
                "name"      => $donor['name'],
                "phone"     => $donor['phone'],
                "email"     => $donor['email'],
                "bloodType" => $donor['blood_type'],
                "location"  => $donor['location'],
                "distance"  => $distanceInfo
            ];
        }
    }
}

echo json_encode([
    "status" => "success",
    "matches" => $matches
]);
?>
