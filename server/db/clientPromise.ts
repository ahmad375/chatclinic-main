import { MongoClient } from 'mongodb'

var client: MongoClient
var clientPromise: Promise<MongoClient>

client = new MongoClient(process.env.MONGODB_URL!)
clientPromise = client.connect()

export { clientPromise }
