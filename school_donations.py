import os
from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'ds145649.mlab.com'
MONGODB_PORT = 45649
DBS_NAME = os.getenv('heroku_2z1m9rfs')
MONGO_URI = os.getenv('MONGODB_URI')
COLLECTION_NAME = 'projects'
FIELDS = {'funding_status': True, 'school_state': True, 'resource_type': True, 'poverty_level': True,
          'date_posted': True, 'total_donations': True, '_id': False, 'school_city': True,
          'school_metro': True, 'school_district': True, 'school_county': True, 'primary_focus_area': True,
          'primary_focus_subject': True, 'grade_level': True}


@app.route("/")
def index():
    return render_template("base.html")


@app.route("/donorsUS/projects")
def donor_projects():
    connection = MongoClient(MONGO_URI)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=20000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects


if __name__ == "__main__":
    app.run(debug=True)
