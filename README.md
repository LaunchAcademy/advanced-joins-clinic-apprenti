## Getting Started

```sh
yarn install
createdb advanced_joins_development
yarn run dev
```

And in a second terminal:

```sh
yarn run dev:client
```

## Provided Code

A schema has been provided with the following tables:

- `users`: `id`, `first_name` (required string), `last_name` (required string), `email` (optional string)
- `projects`: `id`, `name` (required string), `description` (optional string)
- `assignments`: join table: `id`, `user_id`, and `project_id`

Models for all 3 with constructors, and a Project#findById method, have been provided.

A React frontend with a Project Show page has been provided. The show page is built out to show the project details, as well as any users assigned to the project.

## Goals: Many to Many

1. Talk about many-to-many joins and join tables, with an ER diagram included.
https://jamboard.google.com/d/1Koqzrysf_aNLbWQFZkTwRDdsz8gJ0Le_sjFMfHUq8BQ/edit?usp=sharing
2. Talk about how many-to-many relationships are built on one-to-many relationships, and we can set up those relationships both ways, but for our goals today, we'll only go in one direction: from Projects to Assignments, then to Users, then straight through.
3. Add `Project#assignments` relationship.
4. Add `Assignment#user` relationship.
5. Add `Project#users` relationship. In `Project#users`, show with a `for` loop AND with `Promise.all`.
7. Update the project show endpoint to add nested associated users.
8. Show both the endpoint, and then the React page!

## Stretch Goals: Self Joins

1. Add a migration to add a `manager_id` foreign key column to the `users` table.
```
ALTER TABLE users ADD manager_id INTEGER REFERENCES users(id);
```
2. Import the migration and seed a few management relationships.
```
psql advanced_joins_development
\i server/db/V1__add_manager_id_to_users.sql
UPDATE users SET manager_id = 3 WHERE id = 1;
UPDATE users SET manager_id = 3 WHERE id = 2;
```

3. Update the model to relate the two: `User#manager`. Explain how we could add `User#employees` too, but that's not what we nede right now
4. Update the API endpoint to add the manager for each employee -- nested! Talk about why we use a `for` loop here: we're not looking for an array of Promises that can all resolve at once, but instead, looping through and nesting data as we go.
```
for(let i = 0; i < project.users.length; i++) {
  let currentUser = project.users[i]
  currentUser.manager = await currentUser.manager()
}
```
5. Add the manager's name to the page in the React frontend.