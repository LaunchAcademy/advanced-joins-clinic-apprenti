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
2. Build the two-way associations to connect users and projects: specifically, to show users for a given project, we'll want `Project#assignments`, `Assignment#user`, and `Project#users`.
3. In `Project#users`, show with a `for` loop AND with `Promise.all`
3. Update the project show endpoint to add nested associated users.

## Stretch Goals: Self Joins

1. Add a migration to add a `managements` table joining users to users.
2. Import the migration and seed a few management relationships.
```
psql advanced_joins_development
\i server/db/V1__add_manager_id_to_users.sql
UPDATE users SET manager_id = 3 WHERE id = 1;
UPDATE users SET manager_id = 3 WHERE id = 2;
```

3. Update the model to relate the two: `User#manager` and `User#employees`.
4. Update the API endpoint to add the manager for each employee.
```
for(let i = 0; i < project.users.length; i++) {
  let currentUser = project.users[i]
  currentUser.manager = await currentUser.manager()
}
```
5. Add the manager's name to the page.