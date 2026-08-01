# Learners are provisioned via an operator CLI

There is no public registration and no in-app admin UI. New Learners (username + password) are created by running a small operator script on the Fly Machine (e.g. via `fly ssh`), writing into SQLite. Password changes use the same operator CLI path — Learners cannot change or reset passwords in the app.

Deploy-time password seeds were rejected to avoid baking credentials into release config. An admin UI and in-app password change/reset were rejected as product surface we do not need for a handful of known people with password managers.
