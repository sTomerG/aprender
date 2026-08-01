# Fly Machines scale to zero when idle

The Fly app is configured to stop the Machine when idle to keep cost near zero for a small personal deployment.

Durable Learner data (credentials, Mastery history, Exercise records) lives on the SQLite volume and survives sleep. In-memory sessions do not — re-login after wake is expected. Cold start latency on first request after idle is accepted.
