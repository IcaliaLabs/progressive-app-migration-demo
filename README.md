# Progressively Migrate an App Demo

We've all been there, where we need to migrate an old app into a new app. But, being such a big app,
and the client wanting to see results as soon as possible, it is quite prohibitive to migrate all
the old functionality at once.

So, we'll have to somehow make screens from the old app co-exist within the new app... but.. how
should we do it?

It shouldn't matter if the old app is done with React or whatever UI technology/framework, or even
if the new app is an Ember app or a React+Redux+etc app.


## The technology stack:

* A Rails app acting as the "old" app.
* An Ember.js single-page app acting as the "new" app.


## The Goal:

* Make the old app screen work within the new app in harmony.
* Make certain parts of the old app interact with components of the new app.

## How we did it:

* Use an iframe in the new app to load a particular screen from the old app - that was easy.
* Use [krakenjs/post-robot](https://github.com/krakenjs/post-robot) to establish messaging between
the new app and the old app:
  * The new app's searchbar communicates with the old app's screen by sending messages whenever the
    field changes. The old app's screen catches the search terms and re-loads via turbolinks the screen
    rendering the 'results' - actually just a paragraph rendering the search terms.
  * The old app's UI communicates with the new app's search bar by sending messages whenever the
    user clicks on the saved search links to update the search bar.

## Instructions:

Download and run `docker-compose up -d && docker-compose logs -f` (You should use Docker!)

Be patient, tho, as the new app dependencies takes a little while to download before starting.

Go to [localhost:4200](http://localhost:4200) to see the app running... You might want to visit the
[Old Screen](http://localhost:4200/old-screen) to see the most interesting part of the app working :)
