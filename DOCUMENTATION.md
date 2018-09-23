## Documentation

### Error messages
If a request fails, the error message will have the following format:
```json
{
  "errors": [
    {
      "type": "",
      "message": "",
      "parameter_name": ""
    }
  ],
  "url": "",
  "method": ""
}
```

### Schemas/Models
There are the Club and User schemas. See the /models folder for more
information.

### Password
The password is stored in the DB using the bcrypt hash.

### Routes
All the routes have validations in the params and in the body. I used the library JOI
to make the validations.

#### 404
If a route is not found, an error message appears

#### GET /api/clubs/
Returns all the clubs in the database

#### POST /api/clubs/ (receives `name` and `size` as parameters)
Add a new club

#### (BONUS) GET /api/clubs/popular/
Returns the clubs ordered starting from the club with the biggest size.

#### /api/rankings
The routes inside `/api/rankings`, ideally, should receive a header
with the session id of the user making the request, since it returns the rankings
of that user. I added a middleware that does that, but for simplicity, the middlware
always return the user `Jennifer`.

##### GET /api/rankings
Return the rankings of the user making the request

##### POST /api/rankings (receives `id` of a Club; and `position`, which is the new position for the given Club)
Changes the order of a club in the ranking of the user. The `id` can be a club that already exists
in the ranking or it can be a club that is not in the ranking.

#### /api/user/:id
Returns the data of a user.
Since it asked to think about the security concerns, anyone can access this route, but only
the name and the rankings of the user are returned.
Another solution would be to add a middlware in order to verify if the user making
the request has the "id" that is provided in the params. With this solution, all the fields
could be returned in the json, since it would not be a public route.


### Some decisions made based on the fact that more than one person is working on the project
#### Carets (^) are removed from package.json
The package versions in package.json do not have the caret. I removed them
because it enforces that everyone working on the project has the exact same
version of the package. Also, we cannot trust that the developer of the package
is doing Semantic Versioning in the right way.

#### ESLint
Eslint is used in this project. It follows AirBnb's styleguide (available at [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)) with
some modifications. See `.eslintrc` to see the differences.

#### Commits
Commits follow the following styleguide:
```
%{scope}: %{type} %{description}
```
where `type` can be `add, remove, refactor, bump, move, release, update, fix`.

Gitcop is used to enforce the style. Gitcop comments on pull requests
when some commit is not following the guide. You can see
an example here: [https://github.com/LeoNero/PennLabsChallenge/pull/1](https://github.com/LeoNero/PennLabsChallenge/pull/1)


### Other decisions
- Ramda: Bluebird is a library that allows you to write functional code in JS
- Bluebird: Bluebird is a library that provides Promise. It is faster than the native
Promise and has other cool features, such `Promise.map` and `Promise.props`.
