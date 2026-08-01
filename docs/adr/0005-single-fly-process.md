# One Fly app serves UI and API

The Vite-built SPA and the backend API run in a single Fly Machine / process, same origin. SQLite lives on that Machine's volume.

A separate static app + API app was rejected: it complicates cookies/CORS, doubles scale-to-zero surface, and buys nothing while the database must stay on one Machine anyway.
