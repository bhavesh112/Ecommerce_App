const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { app } = require("./../app");
const request = require("supertest");

let mongo;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();

  const mongoUri = mongo.getUri();
  process.env.JWT_SECRET = "asdfghjkl";
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// afterAll(async () => {
//   await mongo.stop();
//   await mongoose.connection.close();
// });
global.signin = async () => {
  const email = "test@test.com";
  const password = "password";
  const name = "test";
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      name,
      password,
    })
    .expect(201);

  return response.body.token;
};
