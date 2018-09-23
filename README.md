### Penn Labs Challenge

### How to install the project
First, run:
```
yarn install
```

### How to run the project
Then, there are two commands available to run the project:
```
yarn start:dev
```
run the project with `NODE_ENV` set to `development`; and

```
yarn start:prod
```
run the project with `NODE_ENV` set to `production`,

By default, the server runs on port 8080 and the mongo uri has value `mongodb://localhost/penn-club-review`.
However, it is possible to change these values by changing the environment variable. For example,
if you want to run the server on port 3000, you can run the following command:
```
env PORT=3000 yarn start:dev
```

### Node and Mongo version
The node version used is 10.8.0, and the MongoDB version used is 4.0.2.

### Default user and clubs
By default, when you are in development (`yarn start:dev`), a script creates a default user
(called Jennifer) and six default clubs. You'll see a message that these user and clubs are
being created right after the server starts to run. Therefore, just start making requests after you see another
message saying that they have been created.

It is also important to see that the user and the clubs are deleted from the database everytime
you restart the project!

### More information
Information about the project and some decisions is available at [DOCUMENTATION.md](https://github.com/LeoNero/PennLabsChallenge/DOCUMENTATION.md)