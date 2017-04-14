# School Donations Dashboard

## Overview

### What is this dashboard for?

The goal of this project was to expand my skill set and tools for creating a meaningful interactive data visualization.
To do this I used a data set from DonorsChoose.org to build a data visualization that represents school donations
broken down by different attributes over a time line.

### What does it do?

This project is intended to display data in a visually effective manner using responsive data visualizations.
It also includes a Dashboard tutorial which provides a step-by-step walk through for users.

### How does it work?

This projects uses Python Flask for building a server that interacts with Mongo DB and renders the html page that
contains charts. Using 3rd party CSS and JavaScript (__see **Tech Used**__), I created **graph.js** which contains the
logic and data binding for dashboard elements. I inject data from my python class into this file. The data will then be
filtered using crossfilter.js before being bound to the charts using a combinations of D3.js and DC.js. I also use
Queue.js, in case I need to read from additional datasources/apis's at a later date.

## Features

### Existing Features

1. Responsive data visualizations with two way data binding.
2. Visually effective presentation layer.
3. User step-by-step walk-through tour.

### Features Left to Implement

1. Fully responsive layout with mobile design.
2. Integration tests.

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
    - Turn off caching in your chrome developer tools. This prevents confusion and frustration of seeing out of date cached versions of your dashboard when developing.