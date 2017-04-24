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
        self.assertEqual(address, 'localhost', "Connection address is not localhost")
        self.assertEqual(port, 27017, "Connection post is not 27017")

    def test_mongo_find(self):
        """
        Test that data is being returned from our local Mongo DB
        """
        connection = mongo_connect()
        db = connection['donorsUSA']['projects']
        projects = db.find().count()
        self.assertGreater(projects, 1000, "Insufficient data is being returned")


if __name__ == '__main__':
    unittest.main()
