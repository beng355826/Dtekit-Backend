const encrypt = require("../utils/encryptPassword");
const isIdValid = require("../utils/isIdValid");
const encryptPasswordRGX = /^\$2[aby]\$[0-9]{2}\$[./0-9A-Za-z]{53}$/;
const ObjectIdRGX = /^[0-9a-fA-F]{24}$/;
const request = require("supertest");
const app = require("../app");
const mongodDb = require("../mongodb/mongodb.utils");
const seedUsers = require("../mongodb/seedTest");
const testUsers = require("../mongodb/testData");

beforeAll(async () => {
  await mongodDb.connect();
  await mongodDb.dropCollection("users");
  await seedUsers(testUsers);
});
afterAll(async () => {
  return await mongodDb.disconnect();
});

describe("encrypt password", () => {
  it("takes a string of any length and returns an encrypted password", async () => {
    const encrypted = await encrypt("password");
    expect(encryptPasswordRGX.test(encrypted)).toBe(true);
  });
});

describe("check id is valid", () => {
  it("takes email id - runs server check and returns true if valid", async () => {
    const users = await request(app).get("/api/users");
    const id = users.body[1]._id;

    const result = await isIdValid(id);
    expect(result).toEqual(true);
  });

  it("should return the correct error when the id is not the correct format", async () => {

    const result = await isIdValid("not correct format");
   
    expect(result).toEqual({
      "msg": "id not valid",
    });
  });

  it('should should return the correct error when the id is the correct format but not found', async () => {
    const result = await isIdValid("6539aab4c9b2c44aaf5a2529");
    expect(result).toEqual({status : 404});

  });
});
