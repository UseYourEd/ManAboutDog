<?php
// contact.php
// Place this file in your public/ directory so Vite copies it to dist/ during build.

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

// Read the incoming JSON payload
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags(trim($data['name'])));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$service = isset($data['service']) ? htmlspecialchars(strip_tags(trim($data['service']))) : 'Not specified';
$message = htmlspecialchars(strip_tags(trim($data['message'])));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email format"]);
    exit();
}

// ==========================================
// EMAIL CONFIGURATION
// Replace with your actual email address
// ==========================================
$to = "hello@manaboutdog.com"; // Change this to where you want to receive emails
$subject = "New Contact Request: $name - $service";

$email_content = "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Service Interested In: $service\n\n";
$email_content .= "Message:\n$message\n";

$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";

// Send the email
if (mail($to, $subject, $email_content, $headers)) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Message sent successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to send email. Please check server configuration."]);
}
?>
