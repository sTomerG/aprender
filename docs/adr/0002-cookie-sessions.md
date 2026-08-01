# Server-side sessions via httpOnly cookies

Learners authenticate with username and password. After login, the server maintains a session and the browser sends an httpOnly cookie — not a JWT in localStorage.

This fits the single Fly Machine + SQLite setup, keeps session tokens out of JavaScript, and makes logout a server-side invalidation. Stateless token auth was rejected as unnecessary complexity and a worse XSS story for this app.
