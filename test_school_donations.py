import pymongo
import unittest


# Set up local Mongo connection
# See Readme for more details
def mongo_connect():
    try:
        conn = pymongo.MongoClient()
        return conn
    except pymongo.errors.ConnectionFailure, e:
        print "Could not connect to MongoDB: %s" % e


class TestMongoConnection(unittest.TestCase):

    def test_mongo_connect(self):
        """
        Test that a local connection to our Mongo DB can be made
        """
        connection = "MongoClient(host=['localhost:27017'], document_class=dict, tz_aware=False, connect=True)"
        self.assertEqual(str(mongo_connect()), connection)

    def test_mongo_find(self):
        """
        Test that data can be returned from our local Mongo DB
        """
        conn = mongo_connect()
        db = conn['donorsUSA']['projects']
        projects = db.find_one()['grade_level']
        self.assertEqual(projects, 'Grades 6-8')


if __name__ == '__main__':
    unittest.main()
