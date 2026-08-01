# SQLite on a Fly volume for durable state

Aprender runs for a small set of manually provisioned Learners with tiny write volume. Durable Learner credentials, Mastery history, and Exercise records live in SQLite on a single Fly Machine's volume, co-located with the app — not managed Postgres.

We accept single-machine limits (no multi-instance / multi-region without a later migration) in exchange for simpler ops and lower cost.
