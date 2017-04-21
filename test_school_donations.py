import pymongo
import unittest


def mongo_connect():
    """
    Set up local connection to Mongo DB.
    See README for instructions.
    """
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
        connection = mongo_connect()
        address, port = connection.address
        self.assertEqual(address, 'localhost')
        self.assertEqual(port, 27017)

    def test_mongo_find(self):
        """
        Test that data can be returned from our local Mongo DB
        """
        connection = mongo_connect()
        db = connection['donorsUSA']['projects']
        projects = db.find_one()['grade_level']
        self.assertEqual(projects, 'Grades 6-8')


if __name__ == '__main__':
    unittest.main()
