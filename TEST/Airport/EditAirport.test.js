import request from "supertest";
import app from "../../app";

describe("PUT /v1/api/airports", () => {
  let airport, accessTokenAdmin;

  const name = "Yogyakarta International Airport update";
  const code = "YIA update";
  const city = "Yogyakarta update";
  const country = "Indonesia update";
  const terminal = "Terminal AA update";

  beforeEach(async () => {
    accessTokenAdmin = await request(app)
      .post("/v1/api/login")
      .set("Content-Type", "application/json")
      .send({
        email: "admin@gmail.com",
        password: "123456",
      });

    airport = await request(app)
      .post("/v1/api/airports")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${accessTokenAdmin.body.accessToken}`)
      .send({
        name,
        code,
        city,
        country,
        terminal,
      });

    return airport, accessTokenAdmin;
  });

  it("should response with 200 as status code", async () => {
    return request(app)
      .put("/v1/api/airports/edit/" + airport.body.id)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${accessTokenAdmin.body.accessToken}`)
      .send({ name, code, city, country, terminal })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({});
      });
  });
});
