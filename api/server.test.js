const request = require("supertest");

describe("TS1: SERVER TESTING", () => {
  it("TC1: SERVER ENV = TESTING", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});
