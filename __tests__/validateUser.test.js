const request = require("supertest");
const app = require("../app");
const mongodDb = require("../db-cloud/mongodb.utils");
const seedUsers = require("../db-cloud/seedTest");
const testUsers = require("../db-cloud/testData");
const encryptPasswordRGX = /^\$2[aby]\$[0-9]{2}\$[./0-9A-Za-z]{53}$/;
const ObjectIdRGX = /^[0-9a-fA-F]{24}$/;

const newUserOne = {
  email: "angel@angel.com",
  password: "password1",
  accountStatus: "inactive",
  rememberMe: false,
  sessionId: false

};
const newUserTwo = {
  email: "devil@devil.com",
  password: "password2",
  accountStatus: "inactive",
  rememberMe: false,
  sessionId: false
};

beforeAll(async () => {
  await mongodDb.connect();
  await mongodDb.dropCollection("users");
  await seedUsers(testUsers);
});
afterAll(async () => {
  return await mongodDb.disconnect();
});

describe("PATCH /api/validate/detectUser", () => {
  test("should cross reference the email with the whitelisted emails and send an email to address using smtb returning the email address as confirmation", async () => {
    const createUser1 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserOne);

    const createUser2 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserTwo);

    const { body } = await request(app)
      .patch("/api/validate/detectUser")
      .expect(201)
      .send({
        email: "angel@angel.com",
      });
    expect(body.requestSuccessful).toEqual(true);
  });

  test("should send 400 error if email not whitelisted", () => {
    return request(app).patch("/api/validate/detectUser").expect(400).send({
      email: "rando@rando.com",
    });
  });

  test("request should update the account status to the one time passcode", async () => {
    const createUser1 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserOne);

    const createUser2 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserTwo);

    const { body } = await request(app)
      .patch("/api/validate/detectUser")
      .expect(201)
      .send({
        email: "angel@angel.com",
      });
    expect(body.userObject.accountStatus.toString().length).toEqual(8);
  });
});

describe("PATCH /api/validate/authoriseUser", () => {
  test("should recognise the email address and otp, then set the accountStatus to active", async () => {
    const createUser1 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserOne);
    const createUser2 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserTwo);

    const detectUser = await request(app)
      .patch("/api/validate/detectUser")
      .expect(201)
      .send({
        email: "angel@angel.com",
      });

    const oneTimePasscode = detectUser._body.userObject.accountStatus;
    const ObjectId = detectUser._body.userObject._id;

  
    const { body } = await request(app)
      .patch("/api/validate/authoriseUser")
      .expect(201)
      .send({
        otp: oneTimePasscode,
        password: "password1",
      });

  
    expect(body.accountStatus).toEqual("active");
    // expect(body._id).toEqual(ObjectId);
  });

  test("should return 404 when wrong password is entered", async () => {
    const createUser1 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserOne);
    const createUser2 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserTwo);

    const detectUser = await request(app)
      .patch("/api/validate/detectUser")
      .expect(201)
      .send({
        email: "angel@angel.com",
      });

    const oneTimePasscode = detectUser._body.userObject.accountStatus;
    const ObjectId = detectUser._body.userObject._id;

   
    const { body } = await request(app)
      .patch("/api/validate/authoriseUser")
      .expect(403)
      .send({
        otp: oneTimePasscode,
        password: "forgotmypasswordlol",
      });

      
    expect(body.msg).toEqual("403 - incorrect credentials");
    // expect(body._id).toEqual(ObjectId);
  });

  test("should return 404 when wrong otp is entered", async () => {
    const createUser1 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserOne);
    const createUser2 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserTwo);

    const detectUser = await request(app)
      .patch("/api/validate/detectUser")
      .expect(201)
      .send({
        email: "angel@angel.com",
      });

    const ObjectId = detectUser._body.userObject._id;

   
    const { body } = await request(app)
      .patch("/api/validate/authoriseUser")
      .expect(403)
      .send({
        otp: '000000',
        password: "password1",
      });
 
    expect(body.msg).toEqual("403 - incorrect credentials");
  
  });

  test('should enable persistent cookies to be sent to the browser for session management if user checks "remember me" box', async () => {
    
    const createUser1 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserOne);
    const createUser2 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserTwo);

    const detectUser = await request(app)
      .patch("/api/validate/detectUser")
      .expect(201)
      .send({
        email: "angel@angel.com",
      });

    const oneTimePasscode = detectUser._body.userObject.accountStatus;
    const ObjectId = detectUser._body.userObject._id;

    const response = await request(app)
      .patch("/api/validate/authoriseUser")
      .expect(201)
      .send({
        otp: oneTimePasscode,
        password: "password1",
        rememberMe: true
      });

      expect(response.body.rememberMe).toEqual(true);
      expect(response.headers['set-cookie'][0]).toMatch(/rememberMe=true/);


  });


  test('should enable temporary cookies to be sent to the browser for session management if user does not check "remember me"', async () => {
    
    const createUser1 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserOne);
    const createUser2 = await request(app)
      .post("/api/users")
      .expect(201)
      .send(newUserTwo);

    const detectUser = await request(app)
      .patch("/api/validate/detectUser")
      .expect(201)
      .send({
        email: "angel@angel.com",
      });

    const oneTimePasscode = detectUser._body.userObject.accountStatus;
    const ObjectId = detectUser._body.userObject._id;

    const response = await request(app)
      .patch("/api/validate/authoriseUser")
      .expect(201)
      .send({
        otp: oneTimePasscode,
        password: "password1",
        rememberMe: false
      });
      expect(response.body.rememberMe).toEqual(false);
      expect(response.headers['set-cookie'][0]).toMatch(/rememberMe=false/);
      expect(response.headers['set-cookie'][1]).toMatch(/Max-Age=3600/);
  });

});
