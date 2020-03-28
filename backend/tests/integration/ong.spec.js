const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        NAME: "ABCD",
        EMAIL: "email@abcd.org.br",
        WHATSAPP: "1533445566",
        CITY: "Sorocaba",
        UF: "SP"
      });

    expect(response.body).toHaveProperty("CODONG");
    expect(response.body.CODONG).toHaveLength(8);
  });
});
