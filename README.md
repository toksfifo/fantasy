Joga Bonito
=======

:octocat: &nbsp;**Live Demo**: http://jogabonito.herokuapp.com

This project is intended to be a football (soccer) fantasy league. It will be a website that allows users to join and participate in leagues that span the duration of the English Premier League season.

## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [Github Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g grunt-cli
```

### Cloning The GitHub Repository
You can use Git to directly clone this repository:
```
$ git clone https://github.com/toksfifo/fantasy.git jogabonito
```
This will clone the latest version of this repository to a **jogabonito** folder.

## Quick Install
Once you've downloaded the code and installed all the prerequisites, you're just a few steps away from starting running the application.

The first thing you should do is install the Node.js dependencies. The code comes with a package.json file that contains the list of modules you need to start the application.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower installcommand to install all the front-end modules needed for the application

## Running The Application
After the install process is over, you'll be able to run the application using Grunt, just run grunt default task:

```
$ grunt
```

The application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)
                            
That's it!
