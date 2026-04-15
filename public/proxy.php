<?php
// proxy.php
// Place this file in your public/ directory so Vite copies it to dist/ during build.

// CORS Headers - Adjust the Allow-Origin in production to your actual IONOS domain
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ==========================================
// SECURE CONFIGURATION
// Replace with your actual Gemini API Key
// ==========================================
$API_KEY = getenv('GEMINI_API_KEY') ?: "YOUR_GEMINI_API_KEY_HERE";
$API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $API_KEY;

// Read the incoming JSON payload from the React frontend
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Basic validation
if (!$data || !isset($data['contents'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request body. 'contents' array is required."]);
    exit();
}

// Initialize cURL to forward the request to Google's API
$ch = curl_init($API_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

// Execute the request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Handle cURL errors
if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "cURL Error: " . $curlError]);
    exit();
}

// Return the exact response from Google back to the React app
http_response_code($httpCode);
echo $response;
?>
