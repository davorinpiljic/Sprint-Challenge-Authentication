const db = require("../database/dbConfig.js");
const request = require("supertest");
const auth = require("../server.js");
// prettier-ignore
describe("/register and /login", () => {
  describe("register", () => {
    it("", async () => {
      const user = {
        username: "user1",
        password: "passcode"
      }
      const something = await request(auth).post('/api/auth/register').send(user)
      console.log(something)
    });
  });
});
