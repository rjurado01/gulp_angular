# Gulp Angular

Angular skeleton with Gulp as project builder/runner task.

## Features:

* Bower.
* Jade.
* Sass.
* Locales.
* Environments management.
* Angular UI Router
* Server and Autoreload.
* Cucumberjs tests integration.
* API mock.

## Installation

First, we need install [NodeJS](https://nodejs.org) and [npm](https://www.npmjs.com/). For Ubuntu:

    sudo apt-get install nodejs
    sudo apt-get install npm
    sudo ln -s /usr/bin/nodejs /usr/bin/node

Second, clone the repository:

    git clone https://github.com/rjurado01/gulp_angular.git
    cd gulp_angular

Third, install npm packages (I prefer locally installation):

    npm install

Finally, download libraries and run gulp:

    node_modules/.bin/bower
    node_modules/.bin/gulp

Now, project has been generated and you can visit this url:

    http://localhost:8080

## Environments

**Development**

This is the default environment. Only run:

    node_modules/.bin/gulp
    
 You can find generated files in:

    builds/development
    
**Production**

Minimice templates, javascript and css. Only run:

    ENV=production node_modules/.bin/gulp
    
You can find generated files in:

    builds/production
    
## Cucumber tests

First, ensure that project is running:

    node_modules/.bin/gulp

Then install selenium drivers:

    node_modules/.bin/selenium-standalone install

Finally execute cucumberjs tests:

    node_modules/.bin/gulp cucumber
    
Execute feature file:

    node_modules/.bin/gulp cucumber --file features/login.feature

Execute scenary:

    node_modules/.bin/gulp cucumber --file features/login.feature:6
