# Server-side sessions via httpOnly cookies

Learners authenticate with username and password. After login, the server maintains a session and the browser sends an httpOnly cookie — not a JWT in localStorage.

Sessions are process-local (in memory). They do not survive Fly scale-to-zero; after the Machine sleeps, the Learner signs in again (acceptable — password managers handle it). Logout invalidates the in-memory session while the process is up.

Stateless token auth was rejected as a worse XSS story without real upside on a single Machine.
