const request = require("supertest");
const app = require("../app");
const mongodDb = require("../db-cloud/mongodb.utils");
const seedUsers = require("../db-cloud/seedTest");
const testUsers = require("../db-cloud/testData");

const encryptPasswordRGX = /^\$2[aby]\$[0-9]{2}\$[./0-9A-Za-z]{53}$/;
const ObjectIdRGX = /^[0-9a-fA-F]{24}$/;

beforeAll(async () => {
  await mongodDb.connect();
  await mongodDb.dropCollection("users");
  await seedUsers(testUsers);
});
afterAll(async () => {
  return await mongodDb.disconnect();
});

describe("Get Endpoints (GET /api/)", () => {
  test("Get /", async () => {
    const response = await request(app).get("/api/").expect(200);
    expect(response.body.status).toEqual("api working");
  });
});

describe("Get All users - (GET /api/users)", () => {
  it("returns all user objects.", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        for (let i = 0; i < body.length; i++) {
          expect(body[i].email).toEqual(testUsers[i].email);
         // expect(Object.keys(body[i])).toHaveLength(4);
        }
      });
  });

  it("error 404 - endpoint spelt incorrectly", () => {
    return request(app).get("/api/user").expect(404);
  });
});

describe("Create User - (POST /api/users)", () => {
  const newUser = 
  {
    email: "nigel@nigel.com",
    password: "password",
    accountStatus: "inactive"
  };

  it("creates and returns a new user provided the correctly formatted request body has been sent and also returns an encypted password", () => {
    return request(app)
      .post("/api/users")
      .expect(201)
      .send(newUser)
      .then(({ body }) => {
        expect(body).toHaveProperty("email");
        expect(body).toHaveProperty("password");
        expect(body).toHaveProperty("accountStatus");
      //  expect(Object.keys(body)).toHaveLength(4);
        expect(encryptPasswordRGX.test(body.password)).toEqual(true);
      });
  });

  it("Error - 400 - when a required field is missing", () => {
    const incorrectUser = {
      password: "password",
    };

    return request(app)
      .post("/api/users")
      .expect(400)
      .send(incorrectUser)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "400 - needs an email and password to create user"});
      });
  });
});

describe("Get user by Id - (GET /api/user/:id)", () => {
  it("returns the specified user according to the objectId", async () => {
    const users = await request(app).get("/api/users");
    const id = users.body[1]._id;

    const response = await request(app).get(`/api/users/${id}`).expect(200);
    expect(response._body.email).toEqual("lynny@lynny.com");
  //  expect(Object.keys(response._body)).toHaveLength(4);
    expect(encryptPasswordRGX.test(response._body.password)).toEqual(true);
  });

  it("error 400 - when incorrect format of id is entered.", async () => {
    const response = await request(app)
      .get(`/api/users/incorrectFormat`)
      .expect(400);

    expect(response._body).toEqual({ msg: "id not valid" });
  });

  it("error 404 - when correct format of id is entered but the Id does not exist", async () => {
    const response = await request(app)
      .get(`/api/users/65397a560e0c0951e197d75c`)
      .expect(404);

    expect(response._body).toEqual({ msg: "resource not found" });
  });
});

describe("Update user by id - (PATCH /api/user/:id)", () => {
  it("should return the updated user object when a new value is provided", async () => {
    const update = {
      email: "lynnylynnylynny@lynny.com",
    };

    const users = await request(app).get("/api/users");
    const id = users.body[1]._id;

    const response = await request(app)
      .patch(`/api/users/${id}`)
      .expect(201)
      .send(update);

    expect(response._body).toHaveProperty("email", "lynnylynnylynny@lynny.com");
    expect(response._body).toHaveProperty("_id", id);
    expect(encryptPasswordRGX.test(response._body.password)).toEqual(true);
  });

  it("if password is updated, should return new encrypted password", async () => {
    const update = {
      password: "newpassword",
    };

    const users = await request(app).get("/api/users");
    const id = users.body[1]._id;
    const originalPassword = users.body[1].password;

    const response = await request(app)
      .patch(`/api/users/${id}`)
      .expect(201)
      .send(update);

    expect(response._body.password).not.toBe(originalPassword);
    expect(encryptPasswordRGX.test(response._body.password)).toEqual(true);
  });

  it("error - 400 - should not let user update user object with an email that is already registered", async () => {
    const update = {
      email: "godfrey@godfrey.com",
    };

    const users = await request(app).get("/api/users");
    const id = users.body[1]._id;

    const response = await request(app)
      .patch(`/api/users/${id}`)
      .expect(400)
      .send(update);
    expect(response.body).toEqual({ msg: "email already registered" });
  });

  it("error - 400 - when incorrect id format is presented", async () => {
    const update = {
      email: "newEmail.com",
    };
    const response = await request(app)
      .patch(`/api/users/incorrectformat`)
      .expect(400)
      .send(update);
    expect(response.body).toEqual({ msg: "id not valid" });
  });

  it("error - 404 - correct format but id not found", async () => {
    const update = {
      email: "newEmail.com",
    };
    const response = await request(app)
      .patch(`/api/users/65396328ad9f7357598cfce0`)
      .expect(404)
      .send(update);
    expect(response.body).toEqual({ msg: "resource not found" });
  });
});

describe("Delete user by Id - (DELETE /api/users/id)", () => {
  it("Deletes the specified object and returns a 204", async () => {
    const users = await request(app).get("/api/users");
    const id = users.body[2]._id;

    const deleted = await request(app).delete(`/api/users/${id}`).expect(204);

    const check = await request(app).get("/api/users");

    expect(check._body[2].email).not.toEqual("phil@phil.com");
  });

  it("error - 400 - when incorrect id format is presented", async () => {
    const response = await request(app)
      .patch(`/api/users/incorrectformat`)
      .expect(400)
    expect(response.body).toEqual({ msg: "id not valid" });
  });

  it("error - 404 - correct format but id not found", async () => {
    const response = await request(app)
      .patch(`/api/users/65396328ad9f7357598cfce0`)
      .expect(404)
    expect(response.body).toEqual({ msg: "resource not found" });
  });
});

