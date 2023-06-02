import { MongoClient } from 'mongodb';
import env from '#utils/env.js';

let _connection;
let _db;
const dbOptions = {
  maxPoolSize: 10,
  retryWrites: true,
  writeConcern: 'majority',
  useNewUrlParser: true
};

let dbName;
switch (env.NODE_ENV) {
  case 'prod':
    dbName = env.PROD_DATABASE_NAME;
    break;
  case 'dev':
    dbName = env.DEV_DATABASE_NAME;
    break;
  default:
    dbName = env.TEST_DATABASE_NAME;
    break;
}
let dbUrl = env.DATABASE_URL;

export const closeConnection = () => {
  _connection.close();
};

/**
 * @returns Promise<Db> mongo Db instance
 */
export const getConnection = async () => {
  if (_db) {
    return _db;
  }
  console.log(`Connecting to url ${dbUrl} and database '${dbName}'`);

  const mongoClient = new MongoClient(dbUrl, dbOptions);
  _connection = await mongoClient.connect();
  _db = _connection.db(dbName);
  return _db;
};
