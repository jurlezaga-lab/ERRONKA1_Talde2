<?php
function startAppSession(): bool
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return true;
    }

    session_name('txurdinaga_session');
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_trans_sid', '0');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Lax'
    ]);

    if (!session_start()) {
        error_log('Could not start the application session.');
        return false;
    }

    return true;
}

function requireAppRole(array $allowedRoles): void
{
    if (!isset($_SESSION['account'])) {
        http_response_code(401);
        echo json_encode(['errorCode' => 'authentication_required']);
        exit;
    }

    if (!in_array($_SESSION['account']['role'] ?? null, $allowedRoles, true)) {
        http_response_code(403);
        echo json_encode(['errorCode' => 'insufficient_permissions']);
        exit;
    }
}
