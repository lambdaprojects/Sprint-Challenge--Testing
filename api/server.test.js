const request = require("supertest");
const server = require("./server");

describe("TS1: SERVER TESTING", () => {
  it("TC1: SERVER ENV = TESTING", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("TC2: GET REQUEST STATUS 200", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });

  it("TC3: GET RESPONSE TYPE - APPLICATION/JSON", async () => {
    const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });

  it("TC4: GET RESPONSE MESSAGE - APPLICATION/JSON", async () => {
    const res = await request(server).get("/");
    expect(res.body.message).toBe("The api is up!");
  });
});
