# GT-Junior-Design-RADAR
This is the GitHub repository for Georgia Tech Spring 2023 junior design team 2313, working on the RADAR project with Emory University Radiology Residency program. The vision and goal of this project is to help the resident users keep track of their historical and current performance in the residency program, and to help the administrators and advisors gain a holistic view of the performance of the residency cohort.

# Release Notes

### Requirements to run the application:
* Node.js version: 18.14.0
* npm version: 9.3.1

### To start this application:
* git clone [project link]
* cd into projet and do **npm install**
* add ip address to mongoDB
* start server in one terminal using **node server.js**
* start application in another terminal using **npm start**  

## Version 0.4.0

### Features
* Admin Dashboard Backend mostly finished
* Admin Dashboard Frontend mostly finished

### Bug Fixes
* Server post requests aren't working

### Known Issues
* Forgot Password Link is not functional
* Data received from client needs to be stored in the database

## Version 0.3.0

### Features
* Resident Dashboard Backend mostly finished
* Resident Dashboard Frontend mostly finished
* User Database linked to dashboard backend
* Admin Dashboard Backend started

### Bug Fixes
* Several pages updated to make them more responsive to changes

### Known Issues
* Data received very recently from client; need to parse it and make sense of it
* Need to link finished backend elements to unfinished frontend elements

## Version 0.2.0

### Features
* Resident Dashboard
* Admin Dashboard
* Display graph
* added graph types

### Bug Fixes
* Fixed: requires routing to dashboard

### Known Issues
* Database not integrated
* Lack of required data from client
* Nodejs network issues

## Version 0.1.0

### Features
* User/Admin Login Page
* User/Admin Registration Page

### Known Issues
* Requires routing to dashboard
* Login/registration page requires update to fit client expectations
* Unknown hosting location

# Install Guide

## Pre-requisites
* Have an intermediate understanding of javascript and react
* Know how to run commands from your computer's command prompt

## Dependent Libraries
* Node.js
* Express.js
* Rechart.js
* Ant design

## Download Instructions
Install latest version of Node.js and NPM at the following link: https://nodejs.org/en/download 

## Installation of Actual App
1. Open a command prompt
2. Run the following command: git clone https://github.com/ABebenek1/GT-Junior-Design-RADAR.git
    * This will craete a project directory

## Run Instructions
1. Open two command prompts
2. In the first command prompt change directory (cd) into the project directory. You can do this one layer at a time or all at once (ie. cd Documents\…\GT-Junior-Design-RADAR).
3. In the first command prompt, run the following command: npm install
    * This command downloads the dependency required by the application
4. In the second command prompt change directory into the backend folder of the project directory.
5. In the second command prompt, run the following command: npm install
    * This command downloads the dependency required by the server
6. In the second command prompt, run the following command: node server.js
    * This starts up the server for the database
7. In the first command prompt, run the following command: npm start
    * This boots up the application
    
## Troubleshooting
Once logged into the application as an admin you may not see all the resident data in the admin dashboard. If this happens logout then log back in with the admin credentials and the data should appear.
