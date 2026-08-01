# Learners are provisioned via an operator CLI

There is no public registration and no in-app admin UI. New Learners (username + password) are created by running a small operator script on the Fly Machine (e.g. via `fly ssh`), writing into SQLite.

Deploy-time password seeds were rejected to avoid baking credentials into release config. An admin UI was rejected as product surface we do not need for a handful of known people.
