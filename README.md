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
