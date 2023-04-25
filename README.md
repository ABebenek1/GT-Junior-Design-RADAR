# GT-Junior-Design-RADAR
This is the GitHub repository for Georgia Tech Spring 2023 junior design team 2313, working on the RADAR project with Emory University Radiology Residency program. The vision and goal of this project is to help the resident users keep track of their historical and current performance in the residency program, and to help the administrators and advisors gain a holistic view of the performance of the residency cohort.

# Release Notes

## Version 1.0

Welcome to version 1.0 of the Radiology Analytical DAshboard for Residents (RADAR)! In our first release of the webpage, we have created a dashboard for you, the residents of Emory Hospital’s radiology department, to help you track your performance in the radiology residency. 

### Features

* Administrator and resident dashboard
  * The separate dashboard allows users with different roles to perform functionalities appropriate to their respective roles
  
* Resident Dashboard
  * Bar graph
    * Gives us a view on the cardinality count on the number of imagining diagnostic tests that they have performed across the four categories: US, MRI, CT, X-Ray
  * Pie chart
    * Resident users may view RPR feedback as given by the advisors
  * Scatter chart
    * Resident users can obtain a view of the number of scans across certain dates
  * Upload scans per date excel sheet
    * Resident users can view the number of scans on each day from an inputted CSV file

* Administrator Dashboard
  * Resident search bar
    * Administrators can search for residents based on username/first name/last name
  * Viewing resident statistics
    * By clicking view next to a resident's name, administrators can view that resident's statistics
  * Leaving a comment
    * By clicking comment, administrators can leave a comment to that specific resident
  * Delete resident
    * An administrator can delete a resident by selecting the delete button

### Bug Fixes
* Frontend sign up is connected with backend database so that sign-in is only achieveable through valid credentials in the database
* Resident information is queried from the backend to frontend for graphical display, previously was hardcoded images

### Bugs
* Date range selection is not implemented in the backend
* Signing up as a new user doesn't guarantee the users information will be stored in the database
* View/Comment/Delete functions on admin dashboard are not linked to resident dashboard and will not show up on the resident dashboard
* The first time logging in as an administrator does not display any data, after logging out and logging back in the data is then displayed

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
