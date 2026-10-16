<?php
require_once __DIR__ . '/session.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');

if (!startAppSession()) {
    http_response_code(500);
    echo json_encode(['errorCode' => 'session_start_failed']);
    exit;
}

function sendJson(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (!isset($_SESSION['account'])) {
        sendJson(200, ['authenticated' => false]);
    }

    sendJson(200, [
        'authenticated' => true,
        'account' => $_SESSION['account']
    ]);
}

if ($method === 'POST') {
    $payload = json_decode(file_get_contents('php://input'), true);
    if (!is_array($payload) || !isset($payload['username'], $payload['password']) || !is_string($payload['username']) || !is_string($payload['password'])) {
        sendJson(400, ['errorCode' => 'invalid_request']);
    }

    $username = strtolower(trim($payload['username']));
    $password = $payload['password'];
    $accounts = [
        'admin' => ['password' => '1234', 'role' => 'Admin', 'userId' => 9],
        'irakasle' => ['password' => '1234', 'role' => 'Teacher', 'userId' => 10],
        'ikasle' => ['password' => '1234', 'role' => 'Student', 'userId' => 8],
        'inventario' => ['password' => '1234', 'role' => 'Inventory', 'userId' => 6]
    ];

    if (!isset($accounts[$username]) || !hash_equals($accounts[$username]['password'], $password)) {
        sendJson(401, ['errorCode' => 'invalid_credentials']);
    }

    if (!session_regenerate_id(true)) {
        error_log('Could not regenerate the session ID after authentication.');
        sendJson(500, ['errorCode' => 'session_start_failed']);
    }

    $_SESSION['account'] = [
        'username' => $username,
        'role' => $accounts[$username]['role'],
        'userId' => $accounts[$username]['userId']
    ];

    sendJson(200, [
        'authenticated' => true,
        'account' => $_SESSION['account']
    ]);
}

if ($method === 'DELETE') {
    $_SESSION = [];
    $cookie = session_get_cookie_params();
    if (!setcookie(session_name(), '', [
        'expires' => time() - 42000,
        'path' => $cookie['path'],
        'domain' => $cookie['domain'],
        'secure' => $cookie['secure'],
        'httponly' => $cookie['httponly'],
        'samesite' => $cookie['samesite']
    ])) {
        error_log('Could not expire the session cookie during logout.');
        sendJson(500, ['errorCode' => 'session_logout_failed']);
    }
    if (!session_destroy()) {
        error_log('Could not destroy the session during logout.');
        sendJson(500, ['errorCode' => 'session_logout_failed']);
    }
    sendJson(200, ['authenticated' => false]);
}

header('Allow: GET, POST, DELETE');
sendJson(405, ['errorCode' => 'method_not_allowed']);
