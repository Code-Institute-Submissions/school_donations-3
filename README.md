# School Donations Dashboard

## Overview

### What is this dashboard for?

The goal of this project was to expand my skill set and tools for creating a meaningful, interactive data visualization.
To do this I used a data set from DonorsChoose.org to build a data visualization that represents school donations
broken down by different attributes over a time-line. You can view the dashboard at [**project2-schooldonations.herokuapp.com**](https://project2-schooldonations.herokuapp.com/).

### What does it do?

This project is intended to display data in a visually effective manner using responsive data visualizations.
It also includes a Dashboard tutorial which provides a step-by-step walk through for users.

### How does it work?

This projects uses the Python Flask Framework for building a server that interacts with Mongo DB and renders the HTML page that
contains charts. Using 3rd party CSS and JavaScript (__see **Tech Used**__), I created **graph.js** which contains the
logic and data binding for dashboard elements. I inject data from my Python class into this file. The data will then be
filtered using crossfilter.js before being bound to the charts using a combinations of D3.js and DC.js. I also use
Queue.js, in case I need to read from additional data sources/APIs at a later date.

## Features

### Existing Features

1. Responsive data visualizations with two way data binding.
2. Visually effective presentation layer.
3. User step-by-step walk-through tour.
4. Fully responsive layout with mobile design.
5. Integration tests.

## Tech Used

### Some Tech Used Includes

- [Flask](http://flask.pocoo.org/)
    - A Python based micro-framework, **Flask** was used to serve data from to server to my web based interface.
- [Mongo DB](https://www.mongodb.com/)
    - A NoSQL Database, **Mongo DB** was used to convert and present my data in JSON format.
- [D3.js](https://d3js.org/)
    - A JavaScript based visualization engine, **D3.js** renders interactive charts and graphs based on data.
- [Dc.js](https://dc-js.github.io/dc.js/)
    - A JavaScript based wrapper library for D3.js, **Dc.js** make plotting charts a lot easier.
- [Crossfilter.js](http://square.github.io/crossfilter/)
    - A JavaScript based data manipulation library, **Crossfilter.js** enables two way data binding.
- [Queue.js](https://github.com/d3/d3-queue)
    - **Queue.js** is asynchronous helper library for JavaScript.
- [Intro.js](http://introjs.com/)
    - **Intro.js** is a JavaScript library that allows you to attach tooltips to divs, creating a step-by-step user guide.
- [Bootstrap](http://getbootstrap.com/)
    - **Bootstrap** is the most popular framework for developing responsive layouts.

## Responsive Web Design

I used a variety of methods to ensure the responsiveness of my dashboard. These included:
- **Mobile First Design**
    - **Mobile First Design** is a fundamental part of designing for a multi screen world. I build this dashboard with mobile space, functionality and utility as first priority.

- [**Bootstrap**](http://getbootstrap.com/)
    - I used the **Bootstrap** Framework to create tried and trusted sleek, responsive elements. For example, Bootstrap makes it simple to implement a stylish collapsible navbar and responsive columns:
        </br></br>**_Uncollapsed navabr and columns in single row_**</br>
        ![Uncollapsed Navbar](/screenshots/Project2-bootstrap-fullnav.png?raw=true "Uncollapsed Navbar")
        </br></br>**_Collapsed navbar and columns seperated into multiple rows_**</br>
        ![Collapsed Navbar](/screenshots/Project2-bootstrap-collapsenav.png?raw=true "Collapsed Navbar")

- **Flexbox**
    - I used **Flexbox** display for simple yet powerful design layouts that ensure responsiveness. **Flexbox** can come in very handy when you need to devise seemingly straight-forward designs (which easily become tricky using more traditional methods) with just a few lines of code:
        </br></br>**_Three divs vertically displayed in a single row_**</br>
        ![Vertical Flex Display](/screenshots/Project2-flexbox-verticaldisplay.png?raw=true "Vertical Flex Display")

- **Media Queries**
    - I spent a lot of time writing and re-writing **Media Queries** to optimize the responsiveness of my dashboard based on screen size. It can be a meticulous and tiring process, but is more than worth it to have that perfect resize. Margins, heights, font sizes and display properties were all troublesome upon resize and required **Media Queries** to ensure the dashboard maintained its flow at all sizes. There were certain graphs that just would not fit comfortably on a smaller screen, so I simplified the layout by removing such elements with **Media Queries**:
        </br></br>**_Number of Donations Time Chart and Primary Focus Row Chart Visible From 1280px Screen Width and Higher_**</br>
        ![Large Charts](/screenshots/Project2-mediaqueries-1280px.png?raw=true "Large Charts")
        </br></br>**_Number of Donations Time Chart and Primary Focus Row Chart Removed Upon Resize_**</br>
        ![Large Charts Removed](/screenshots/Project2-mediaqueries-small.png?raw=true "Large Charts Removed")

### Responsive Web Design Testing

I used a variety of methods to test the responsiveness of my dashboard. These included:

- [Firefox Responsive Design Mode](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode)
    - This was an essential tool to testing the responsiveness of my dashboard, **Firefox Responsive Design Mode** makes it fast and effortless to switch between screen sizes and devices.
        </br></br>**_Firefox Responsive Design Mode simulating an Apple iPhone 5s_**</br>
        ![Firefox RDM](/screenshots/Project2-firefox-RDM.png?raw=true "FirefoxRDM")

- **Testing In Different Environments**
    - There is no simulator that could replace simply testing my dashboard in as many environments as possible. Using as many different browsers and devices as I could get my hands on was key to weening out design flaws. **Testing in Different Environments** was a integral part of guaranteeing my dashboard functions correctly for every User.

## Contributing

### Getting the Code Up and Running
1. Firstly you will need to clone this repository by running the
```git clone https://github.com/meganduffy/school_donations.git``` command.
2. After you've done that you'll need to make sure that you have [**Mongo DB**](https://www.mongodb.com/) installed and
the mongoDB shell activated by running the command **mongod** in your Terminal/Command Prompt.
3. Leave the prompt running as it is and open another Terminal/Command Prompt.
4. Copy your csv data set file to the same location as the directory opened in the second terminal window.
5. Enter the following command: ```mongoimport -d donorsUSA -c projects --type csv --file <file name> --headerline```
There are over 87,000 records in the file, so it will take a few minutes to upload the data. You will see a progress
indicator in the terminal letting you know how much data has approximately been uploaded.
6. Open Mongo Management Studio to see the uploaded data. It’s now in JSON format.
7. In order to run the app locally enter the following values into **school_donations.py**: ```MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'donorsUSA'
COLLECTION_NAME = 'projects'```
Within the **donor_projects()** function enter the following values: ```connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
   collection = connection[DBS_NAME][COLLECTION_NAME]```
8. Run **school_donations.py** in your IDE and - __volia!__ - the app should appear in your browser.
    - Give the app a few minutes for the data to load.
    - Make sure you have **mongod** running; otherwise you'll get no data back.
    - Turn off caching in your chrome developer tools. This prevents the confusion and frustration of seeing out of date cached versions of your dashboard when developing.

### Integration Tests
- Within the project I have included a Test Suite to verify the local database connection. **Ensure mongod is running before running these tests** or they will fail automatically as no data will be present.
- My experience with testing up until now has mainly been with Unit Testing - checking functions and classes execute correctly. Unfortunately, with this project I was not in a position to create many Python functions or classes and thus have been unable to show you the full extent of my testing abilities.