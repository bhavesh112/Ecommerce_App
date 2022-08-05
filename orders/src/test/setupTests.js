const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let mongo;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  process.env.JWT_SECRET = "testsecret";
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.createToken = async () =>
  await jwt.sign(
    {
      user: {
        id: mongoose.Types.ObjectId(),
        role: "admin",
      },
    },
    process.env.JWT_SECRET
  );
