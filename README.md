# Survey

## This is a small sample application to demonstrate how a Node.js mobile app can work.

### How to run:
* `npm i` to install dependencies
* `npm start` to run the web server
* The app can then be accessed at `localhost:8080`

### Tools used:
* Node.js with express for the web server
* Gulp for building the client app and initiating Express
* React for the client app, with a Flux framework
* Less CSS preprocessor used for stylesheets

### How it works:

The application is written in ES6 for use with Node.js.
It is separated into a client app, served at `/`, and a server api, served at `/api`.
An Express web server is initiated by gulp.
The client app is written in React with a Flux framework, and served statically
by Express. Babel is used to transpile ES6 to ES5 code, using webpack.
Gulp processes Less code into CSS stylesheets for the client app.

For use in development, a webpack development server is used for the client app, 
which is then proxied by the Express server (see the gulpfile for details).
