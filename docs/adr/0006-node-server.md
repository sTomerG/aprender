# Node serves the SPA and API

The single Fly process is a Node server: it serves the Vite production build and exposes a small JSON API backed by SQLite, with cookie sessions in memory.

Other runtimes (Bun, Deno, Go, Python) were rejected to keep one toolchain with the existing Vite/React app and boring Fly deploy defaults. The specific minimal framework (Hono vs Express, etc.) is left open as an implementation detail.
