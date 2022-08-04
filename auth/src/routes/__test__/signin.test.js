const request = require("supertest");
const { app } = require("./../../app");

it(`returns a 400 with an invalid email`, async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "testsadasd",
      password: "password",
    })
    .expect(400);
});
it(`returns a 400 with an invalid password`, async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "testsadasd",
      password: "p",
    })
    .expect(400);
});

it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "bahvehs",
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "aslkdfjalskdfj",
    })
    .expect(400);
});

it("returns a token when correct password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "bahvehs",
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.body.token).toBeDefined();
});
